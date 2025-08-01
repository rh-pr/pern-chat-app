// import api from '../api/axios';

import { MessageType } from '../types/main';
import { getDummyMessages } from '../utils/dummy';


export const getMessages = async (convertId: string): Promise<MessageType[]> => {
    try {
        // const res = await api.get(`/getMessages?conversationId=${convertId}`);
        // return res.data;
        const data = getDummyMessages(convertId);
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error by retrieving messages: ', err);
        return [];
    }
}

export const sendMessage = async (message: MessageType): Promise<MessageType | null>  => {
    try {
        // const res = await api.post('/sendMessage', message);
        // return res.data;
        return message; 
    } catch (err) {
        console.error('Error sending message: ', err);
        return null; // Re-throw the error for further handling
    }
}



