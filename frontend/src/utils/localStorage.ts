import { MessageType } from "../types/main";

export const updateLocalConversation = (convId: string, item: MessageType) => {
    try {
        console.log('i am her')
        const stored = localStorage.getItem(convId);
        const data: MessageType[] = stored ? JSON.parse(stored) as MessageType[] : [];

        const updatedData = [...data, item];

        localStorage.setItem(convId, JSON.stringify(updatedData));
    } catch (error) {
        console.error(`Failed to update local conversation ${convId}:`, error);
        
        localStorage.setItem(convId, JSON.stringify([item]));
    }
};