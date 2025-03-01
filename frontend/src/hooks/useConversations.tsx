import { useEffect } from "react";
import useConversationsStore from '../stores/useConversationsStore';

import { conversationa } from "../dummy/dummyData";


const useConversations = () => {
    const conversations = useConversationsStore((state) => state.conversations);

    const setConversations = useConversationsStore((state) => state.setConversations);
    const updateConversations = useConversationsStore((state) => state.updateConversations);
    
   

    const getConversations = () => {
        setConversations(conversationa); 
    };

    const filteredConversations = (query: string) => {
        return conversations.filter((conv) =>
            conv.fullName.toLowerCase().includes(query.toLowerCase())
          );
    }
  

    useEffect(() => {
        getConversations();
    }, []);

    return {
        conversations,
        filteredConversations, 
        getConversations,
    };
};

export default useConversations;
