import api from '../api/axios';
import { MessageType } from '../types/main';

export const getMessages = async (chatId: string): Promise<MessageType[]> => {
    try {
        
        const res = await api.get(`/messages/getMessages?chatId=${chatId}`);
        if (res) {
            return res.data;
        }
        return [];

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by retrieving messages:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return [];
    }
}

export const sendMessage = async (message: FormData): Promise<MessageType | null>  => {
    try {
          
        const res = await api.post(`messages/sendMessage`, message, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } );
        return res.data;
    
     
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sending messages:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}

export const updateMessageStatus = async ({id, status}: {id: string, status: string}) => {
    try {
        
        const res = await api.post(`messages/updateMsgStatus`, {id, status} );
        return res.data;
    
     
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sending messages:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}

export const getUnreadedMessages = async (userId: string) => {
    try {
        
        const res = await api.get(`messages/unreadedMessages?userId=${userId}`);
        return res.data;
    
     
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sending messages:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}