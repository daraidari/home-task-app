### Build and Run the Project with Docker Container

To build and run the project within a Docker container, you can use the provided npm script

```bash
npm run docker:up
```

### Stop Container

To stop and remove the containers, networks, and volumes associated with the project, run

```bash
npm run docker:down
```

### Accessing the Application
After the container has been started, you can access the application in your web browser

```
http://localhost:8000
```