import axios from "axios";
import { API_URL } from "../config.json";
import { User } from "../types";

export async function getMe(token: string): Promise<User> {
    try {
        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const user = response.data;
        return user;
    } catch (error) {
        throw new Error('Unable to get user :/');
    }
}

export async function deleteMe(token: string) {
    try {
        const response = await axios.delete(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const message = response.data;
        return message;
    } catch (error) {
        throw new Error('Unable to delete user :/');
    }
}

export async function updateMe(token: string, field: string, value: string) {
    try {

        const response = await axios.patch(`${API_URL}/users/me`, {
            [field]: value,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const user = response.data;
        return user;
    } catch (error) {
        throw new Error('Unable to update user :/');
    }
}