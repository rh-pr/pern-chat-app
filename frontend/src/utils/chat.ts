import { DUMMY_MESSAGES, conversationa } from '../dummy/dummyData';
import { MessageType } from '../types/main';

export const getConversation = () => {
    return DUMMY_MESSAGES || null;
}

export const getConversations = () => {
    return conversationa;
}

export const sendMsg = (msg: MessageType) => {
    return msg || null;
}