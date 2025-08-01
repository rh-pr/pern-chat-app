// import api from '../api/axios';

import { ConversationsType } from '../types/main';
import { getDummyConversations } from '../utils/dummy';
import { users } from '../dummy/dummy.json';

//todo: delte this method, use real api


export const getUserConversations = async (currentUserId: string): Promise<ConversationsType[]> => {
    try {
        // const res = await api.get(`/getConversation?userId=${currentUserId}`);
        // return res.data;
        const data = getDummyConversations(currentUserId);
        data.sort((a, b) => 
            new Date(b.lastMessage?.createdAt || 0).getTime() - new Date(a.lastMessage?.createdAt || 0).getTime()
        );
        return data;
        
    } catch (err) {
        console.error('Error by retrieving user: ', err);
        return [];
    }
}


//todo: use real api
export const createConversation = async (currentUserId: string, otherUserId: string): Promise<ConversationsType | null> => {
    try {
        // const res = await api.create(`/createConversation?userId=${currentUserId}&otherUserId=${otherUserId}`);
        // return res.data;
        const newConversation: ConversationsType = {
            id: `${currentUserId}-${otherUserId}`,
            participants: users.filter(user => user.id === otherUserId),
            lastMessage: null,
        }

        return newConversation;
    } catch (err) {
        console.error('Error by creating conversation: ', err);
        return null;
    }
}