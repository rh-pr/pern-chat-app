import api from '../api/axios';

import { ConversationsType } from '../types/main';


export const getUserConversations = async (currentUserId: string) => {
    try {
        const res = await api.get(`/conversations?userId=${currentUserId}`);
        
        if (res) {
            return res.data;
        }
        return null;
        
    } catch (err) {
        console.error('Error by retrieving user: ', err);
        return null;
    }
}

export const createConversation = async (currentUserId: string, otherUserId: string): Promise<ConversationsType | null> => {
    try {
        const res = await api.get(`/conversations/create?firstParticipant=${currentUserId}&secondParticipant=${otherUserId}`);
        if (res) {
            return {...res.data, lastMessage: null };
        }
        return null;
    } catch (err) {
        console.error('Error by creating conversation: ', err);
        return null;
    }
}