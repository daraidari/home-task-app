
export interface Article {
    id: string
    link: string
    title: string
    year: number
    citations: number
    access: boolean
}

export interface Response {
    id: string
    choices: {
        message: {
            role: string
            content: string
        }
    }[]
    [key: string]: unknown
}

export enum SenderType {
    User = 'user',
    Bot = 'bot'
}