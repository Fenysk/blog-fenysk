export interface Article {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    author: object;
}

export interface User {
    id: number;
    role: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}