import { ConversationsType, MessageType } from "../types/main";

export const updateLocalConversation = (convId: string, item: MessageType) => {
    try {
        const stored = localStorage.getItem(convId);
        const data: MessageType[] = stored ? JSON.parse(stored) as MessageType[] : [];

        const updatedData = [...data, item];

        localStorage.setItem(convId, JSON.stringify(updatedData));
    } catch (error) {
        console.error(`Failed to update local conversation ${convId}:`, error);
        
        localStorage.setItem(convId, JSON.stringify([item]));
    }
};

export const updateLocalConversations = (newConv: ConversationsType) => {
    try {
        const stored  = localStorage.getItem('conversations');
        const data =  stored ? JSON.parse(stored) : [];

        const updatedData = [...data, newConv];

        localStorage.setItem('conversations', JSON.stringify(updatedData));

    } catch {
        console.log('Failed to update local conversations');
        localStorage.setItem('conversations', JSON.stringify([newConv]));

    }
}