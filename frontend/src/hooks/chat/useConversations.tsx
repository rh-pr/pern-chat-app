import { useEffect } from "react";
import useConversationsStore from '../../stores/useConversationsStore';

import { getUserConversations } from "../../servieces/conversationsServiese";
import useAuthStore from "../../stores/useAuthStore";


const useConversations = () => {
    const conversations = useConversationsStore((state) => state.conversations);
    const setConversations = useConversationsStore((state) => state.setConversations);
    const currentUser = useAuthStore(state => state.currentUser);
    const setActiveConversation = useConversationsStore((state) => state.setActiveConversation)
    const setCurrentUserConvList = useConversationsStore((state) => state.setCurrentUserConvList);

    const filteredConversations = (query: string) => {
        return conversations.filter((conv) =>
            conv.participants.some(user => user.fullName.toLowerCase().includes(query.toLowerCase()))
          );
    }

    const selectConversation = (conversationId: string) => {
        setActiveConversation(conversationId)
    }

    const conversationIdsList = (): string[] => {
        return conversations.map(conv => conv.participants[0].id);               
    }

    useEffect(() => {
       const fetchConverations = async() => {
            const data = await getUserConversations(currentUser.id);
            if(data) {
                setConversations(data);
            }
        }
        fetchConverations();
            
    }, [currentUser]);

    useEffect(() => {
        const list = conversationIdsList(currentUser.id);
        setCurrentUserConvList(list);
    },[currentUser, conversations])



    return {
        conversations,
        filteredConversations, 
        selectConversation,
    };
};

export default useConversations;
