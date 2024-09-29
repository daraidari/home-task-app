import {chatRequest, source} from './enums/prompts'
import {successResponse, emptyResponse, requestFailed} from './enums/messages'
import {Response} from './interfaces'

const openai = import.meta.env.VITE_OPEN_AI_URL as string
const key = import.meta.env.VITE_API_KEY as string

export const getResponse = async (message: string) => {
    try {
        const response = await fetch(openai, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{role: "user", content: `${chatRequest} ${message}`}],
            })
        });

        if (!response.ok) {
            throw new Error()
        }

        const data = await response.json() as Response
        const content = data.choices[0].message.content

        if (content.includes(source)) {
            const articles = await getArticles(content)
            return {message: articles.length ? successResponse : emptyResponse, data: articles}
        } else {
            throw new Error('RequestFailed')
        }
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === 'RequestFailed') {
                throw new Error(requestFailed)
            } else {
                throw new Error('Something went wrong, please check your connection or try again later')
            }
        }
    }
}

export const getArticles = async (url: string) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error()
        }

        const data = await response.json() as {results: Article[]}

        return data.results.map((article) => ({
            id: article.id,
            link: article.doi,
            title: article.title,
            year: article.publication_year,
            citations: article.cited_by_count,
            access: article.open_access.is_oa,
        }))
    } catch {
        throw new Error()
    }
}

interface Article {
    id: string
    doi: string
    title: string
    publication_year: number
    cited_by_count: number
    open_access: {is_oa: boolean}
    [key: string]: unknown
}