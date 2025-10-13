import { UserType } from '../types/main';
import api from '../api/axios';

export const getUsers = async (currentUserId: string): Promise<UserType[]> => {
    try {
        
        const res = await api.get(`/users?userId=${currentUserId}`);
        return res.data;
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by retrieving users:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return [];
    }
}