import axios from "axios";
import { API_URL } from "../config.json";
import { Article } from "../types";

export async function getArticles(): Promise<Article[]> {
    try {
        const response = await axios.get(`${API_URL}/article`);
        const articles = response.data as Article[];

        return articles;
    } catch (error) {
        throw new Error('Unable to get articles :/');
    }
}

export async function getLatestArticles(): Promise<Article[]> {
    try {
        const response = await axios.get(`${API_URL}/article/latest`);
        const articles = response.data as Article[];

        return articles;
    } catch (error) {
        throw new Error('Unable to get articles :/');
    }
}

export async function getArticleById(id: number): Promise<Article> {
    try {
        const response = await axios.get(`${API_URL}/article/${id}`);
        const article = response.data as Article;

        return article;
    } catch (error) {
        throw new Error('Unable to get article :/');
    }
}

export async function createArticle(article: object, token: string): Promise<Article> {
    try {
        const response = await axios.post(`${API_URL}/article/create`, article, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const newArticle = response.data as Article;
        return newArticle
    } catch (error) {
        throw new Error('Unable to create article :/');
    }
}