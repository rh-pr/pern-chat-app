import api from '../api/axios';

import { ConversationsType } from '../types/main';


export const getUserConversations = async (currentUserId: string) => {
    try {
        const res = await api.get(`/conversations?userId=${currentUserId}`);
        
        if (res) {
            return res.data;
        }
        return null;
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by retrieving a conversation:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by creating new conversation:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}