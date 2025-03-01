import { useEffect } from "react";
import useConversationStore from '../stores/useConversationStore';

import { DUMMY_MESSAGES } from "../dummy/dummyData";


const useConversation = () => {
    const conversation = useConversationStore((state) => state.conversation);
    const setConversation = useConversationStore((state) => state.setConversation);
    const updateConversation = useConversationStore((state) => state.updateConversation);

    const getConversation = () => {
        setConversation(DUMMY_MESSAGES); 
    };

    const sendMsg = (msg: string) => {
        const newMsg = {
            id: 111,
            fromMe: true,
            body: msg,
        }
        updateConversation(newMsg);
    }

    useEffect(() => {
        getConversation();
    }, []);

    return {
        conversation, 
        getConversation,
        sendMsg
    };
};

export default useConversation;
