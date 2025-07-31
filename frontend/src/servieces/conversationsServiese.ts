// import api from '../api/axios';

import { users, conversations } from '../dummy/dummy.json';
import { ConversationsType } from '../types/main';

//todo: delte this method, use real api
const getDummyConversations = (currentUserID: string) : ConversationsType []=> {
    return conversations.filter(conv => conv.participants.some(user => user.id === currentUserID))
                        .map(conv => {
                            const otherUser = conv.participants.find(user => user.id !== currentUserID);
                            return otherUser !== undefined ? {
                                    ...conv,
                                    participants: [otherUser]
                            } : {
                                ...conv
                            };
                         });
   }   

export const getConversations = async (currentUserId: string) => {
    try {
        // const res = await api.get(`/getConversation?userId=${currentUserId}`);
        // return res.data;
        const data = getDummyConversations(currentUserId);
        console.log(data);
        return data;
        
    } catch (err) {
        console.error('Error by retrieving user: ', err);
        return [];
    }
}