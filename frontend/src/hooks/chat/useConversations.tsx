import { useEffect } from "react";

import { getUserConversations, createConversation } from "../../servieces/conversationsServiese";

import useConversationsStore from '../../stores/useConversationsStore';
import useAuthStore from "../../stores/useAuthStore";

const useConversations = () => {
    const conversations = useConversationsStore((state) => state.conversations);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId);
    const setConversations = useConversationsStore((state) => state.setConversations);
    const setActiveConversation = useConversationsStore((state) => state.setActiveConversation)
    const setCurrentUserConvList = useConversationsStore((state) => state.setCurrentUserConvList);
    const updateConversations = useConversationsStore((state) => state.updateConversations);
    const updateCurrentUserConvList = useConversationsStore((state) => state.updateCurrentUserConvList);

    const currentUser = useAuthStore(state => state.currentUser);

    const filteredConversations = (query: string) => {
        return conversations.filter((conv) =>
            conv.participants.some(user => user.fullName.toLowerCase().includes(query.toLowerCase()))
          );
    }

    const getRecipent = () => {
        return conversations.find(conv => conv.id === activeConversationId)?.participants[0]
    }

    const addConversation = async (newParticipantId : string) => {

        if (!currentUser) return;
         try {
            const newConversation = await createConversation(currentUser.id, newParticipantId);
            if (newConversation) {
                updateConversations(newConversation);
                updateCurrentUserConvList(newConversation.id);
                setActiveConversation(newConversation.id);
                return true;
            }
        } catch (error) {
            console.error("Failed to create conversation:", error);
            return false;
        }
    }

    const selectConversation = (conversationId: string) => {
        setActiveConversation(conversationId);
    }

    const conversationIdsList = (): string[] => {
        return conversations.map(conv => conv.participants[0].id);               
    }

    const setCurrentConversation = (conversationId: string) => {
        setActiveConversation(conversationId);
    }

    useEffect(() => {
       const fetchConversations  = async() => {
            if (!currentUser) return;
            
            const data = await getUserConversations(currentUser.id);
            if(data && conversations.length === 0) {
                setConversations(data);
            }
        }
        fetchConversations ();
            
    }, []);
    

    useEffect(() => {
        const list = conversationIdsList();
        setCurrentUserConvList(list);
    },[currentUser, conversations]);

    useEffect(() => {
        
    },[])



    return {
        conversations,
        filteredConversations, 
        selectConversation,
        setCurrentConversation,
        addConversation,
        getRecipent,
        setActiveConversation
    };
};

export default useConversations;
