import { UserType } from '../types/main';
import api from '../api/axios';

//todo: use real api


export const getUsers = async (currentUserId: string): Promise<UserType[]> => {
    try {
        
        const res = await api.get(`/users?userId=${currentUserId}`);
        return res.data;
        
    } catch (err) {
        console.error('Error by retrieving users: ', err);
        return [];
    }
}