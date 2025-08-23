<<<<<<< HEAD
import { ConversationsType, MessageType, UserType } from "../types/main";
=======
import { ConversationsType, MessageType } from "../types/main";
>>>>>>> e7d3dfbfac45affed8e67a50b0d6ef16de9d4aa2

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
<<<<<<< HEAD
}

export const updateLocalUser = (user: UserType | null) => {
    try {
        if (!user) {
            localStorage.removeItem('user')
        } else {
            const stored  = localStorage.getItem('user');
            if (!stored) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }
    } catch {
        console.log('Failed to update local conversations');
        localStorage.setItem('user', JSON.stringify(user));

    }
=======
>>>>>>> e7d3dfbfac45affed8e67a50b0d6ef16de9d4aa2
}