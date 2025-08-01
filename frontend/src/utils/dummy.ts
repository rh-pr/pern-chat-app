import { messages, users, conversations } from '../dummy/dummy.json';
import { ConversationsType, MessageType, UserType } from '../types/main';

export const getDummyConversations = (currentUserId: string) : ConversationsType [] => {
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

export const getDummyUsers = (currentUserId: string, conversationsIds: string[], usersList?: UserType[]): UserType[] => {
    const res =  (usersList ? usersList : users).filter(user => !conversationsIds.includes(user.id) && user.id !==currentUserId);
     return res;
}

export const getDummyMessages = (convId: string): MessageType[] => {
    return messages.filter(msg => msg.conversationId === convId);
}