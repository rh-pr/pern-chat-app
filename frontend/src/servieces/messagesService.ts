// import api from '../api/axios';

import { MessageType } from '../types/main';
import { getDummyMessages } from '../utils/dummy';


export const getMessages = async (convertId: string): Promise<MessageType[]> => {
    try {
        const stored = localStorage.getItem(`${convertId}`);
        if (stored) {
            return JSON.parse(stored) as MessageType[];
        } else {
            // const res = await api.get(`/getMessages?conversationId=${convertId}`);
            // localStorage.setItem(`${convertId}`, JSON.stringify( res.data))
            // return res.data;
            const data = getDummyMessages(convertId);
            localStorage.setItem(`${convertId}`, JSON.stringify(data));
            return data;
        }

    } catch (err) {
        console.error('Error by retrieving messages: ', err);
        return [];
    }
}

export const sendMessage = async (message: MessageType): Promise<MessageType | null>  => {
    try {
        // const res = await api.post('/sendMessage', message);
        // return res.data;
        
        //todo: delete
        message.createdAt =  (new Date()).toString();
        message.id = 'some_id'
        
        return message; 
    } catch (err) {
        console.error('Error sending message: ', err);
        return null; // Re-throw the error for further handling
    }
}



