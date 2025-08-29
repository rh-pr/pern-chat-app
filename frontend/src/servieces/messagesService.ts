import api from '../api/axios';
import { MessageType } from '../types/main';

export const getMessages = async (chatId: string): Promise<MessageType[]> => {
    try {
        
        const res = await api.get(`/messages/getMessages?chatId=${chatId}`);
        if (res) {
            return res.data;
        }
        return [];

    } catch (err) {
        console.error('Error by retrieving messages: ', err);
        return [];
    }
}

export const sendMessage = async (message: FormData): Promise<MessageType | null>  => {
    try {
        console.log('messages are: ', message);
        
        const res = await api.post(`messages/sendMessage`, message, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } );
        return res.data;
    
     
    } catch (err) {
        console.error('Error sending message: ', err);
        return null; 
    }
}



