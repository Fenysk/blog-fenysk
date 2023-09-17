import axios from "axios";
import { API_URL } from "../config.json";

export async function login(email: string, password: string): Promise<string> {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        const token = response.data.access_token as string;
        return token;
    } catch (error) {
        throw new Error('Unable to login :/');
    }
}

export async function register(username: string, email: string, password: string): Promise<string> {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            username,
            email,
            password,
        });

        const token = response.data.access_token as string;
        return token;
    } catch (error) {
        throw new Error('Unable to register :/');
    }
}