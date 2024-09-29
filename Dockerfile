FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_API_KEY
ARG VITE_OPEN_AI_URL
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_OPEN_AI_URL=$VITE_OPEN_AI_URL

COPY . .

RUN npm run build

FROM nginx:1.26.2-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]