import { DUMMY_MESSAGES, conversationa } from '../dummy/dummyData';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../types/main';


export const getConversation = () => {
    return DUMMY_MESSAGES || null;
}

export const getConversations = () => {
    return conversationa;
}

export const sendMsg = (msgText: string, files: File[], images: File[], updateConversation: (conversation: MessageType) => void)  => {
    const newMessage = {
        id: 11111,
        fromMe: true,
        body: msgText,
        files: files,
        images: images
    }

     updateConversation(newMessage);
   
    return newMessage || null;
}

// export type MessageType = {
//     id: number,
// 		fromMe: boolean,
// 		body: string,
//     files?: File[] | null,
//     images?: File[] | null
// }
