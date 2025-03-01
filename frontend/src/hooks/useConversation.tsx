import { useState } from "react";
import { MessageType } from "../types/main";

import { DUMMY_MESSAGES, conversationa } from '../dummy/dummyData';


const useConversation = () => {
    const [conversation, setConversation] = useState<MessageType[] | null>(null);


    const getConversation = () => {
       const data = DUMMY_MESSAGES || null
       setConversation(data);
    }
    
    const getConversations = () => {
        const data = conversationa || null
        return data
    }
    
    const updateConversation = (msg: MessageType) => {
        if (msg) {
            setConversation((prevConv) => prevConv ? [...prevConv, msg] : [msg]);
        }
    }

    return {
        conversation,
        getConversation,
        getConversations,
        updateConversation
    }
   
}

export default useConversation;