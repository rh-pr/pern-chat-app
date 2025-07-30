import { useEffect } from "react";
import useConversationsStore from '../../stores/useConversationsStore';

import data from '../../dummy/dummy.json';


const useConversations = () => {
    const conversations = useConversationsStore((state) => state.conversations);
    const setConversations = useConversationsStore((state) => state.setConversations);
    

    const getConversations = () => {
        const formatted = data.conversations.map(conv => ({
            ...conv,
            createdAt: new Date(conv.createdAt),
            updatedAt: new Date(conv.updatedAt),
        }));

        setConversations(formatted);

        console.log('conversation ', formatted)
    };

    const filteredConversations = () => {
        // return conversations.filter((conv) =>
        //     conv.fullName.toLowerCase().includes(query.toLowerCase())
        //   );
        return conversations;
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
