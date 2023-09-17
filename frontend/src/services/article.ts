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