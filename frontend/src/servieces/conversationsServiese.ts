// import api from '../api/axios';

import { users, conversations } from '../dummy/dummy.json';
import { ConversationsType, UserType } from '../types/main';

//todo: delte this method, use real api
const getDummyConversations = (currentUserId: string) : ConversationsType []=> {
    return conversations.filter(conv => conv.participants.some(user => user.id === currentUserId))
                        .map(conv => {
                            const otherUser = conv.participants.find(user => user.id !== currentUserId);
                            return otherUser !== undefined ? {
                                    ...conv,
                                    participants: [otherUser]
                            } : {
                                ...conv
                            };
                         });
   }   

// const getDummyConversations = (currentUser: UserType) : ConversationsType []=> {
//     return conversations.filter(conv => currentUser.converationsIds?.includes(conv.id))
//                         .map(conv => {
//                             const otherUser = conv.participants.find(user => user.id !== currentUser.id);
//                             return otherUser !== undefined ? {
//                                     ...conv,
//                                     participants: [otherUser]
//                             } : {
//                                 ...conv
//                             };
//                          });
//    }   




export const getUserConversations = async (currentUserId: string) => {
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


//todo: use real api
export const createConversation = async (currentUserId: string, otherUserId: string) => {
    try {
        // const res = await api.create(`/createConversation?userId=${currentUserId}&otherUserId=${otherUserId}`);
        // return res.data;
        const newConversation: ConversationsType = {
            id: `${currentUserId}-${otherUserId}`,
            participants: users.filter(user => user.id === otherUserId),
            lastMessage: null,
        }

        return newConversation
    } catch (err) {
        console.error('Error by creating conversation: ', err);
        return null;
    }
}