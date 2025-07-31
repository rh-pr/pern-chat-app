import { useEffect } from "react";
import useConversationsStore from '../../stores/useConversationsStore';

import { getConversations } from "../../servieces/conversationsServiese";
import useAuthStore from "../../stores/useAuthStore";


const useConversations = () => {
    const conversations = useConversationsStore((state) => state.conversations);
    const setConversations = useConversationsStore((state) => state.setConversations);
    const currentUser = useAuthStore(state => state.currentUser);


    const filteredConversations = (query: string) => {
        return conversations.filter((conv) =>
            conv.participants.some(user => user.fullName.toLowerCase().includes(query.toLowerCase()))
          );
    }

    useEffect(() => {
       const fetchConverations = async() => {
            const data = await getConversations(currentUser.id);
            if(data) {
                setConversations(data);
            }
            }
            fetchConverations();
        }, [currentUser]);

    return {
        conversations,
        filteredConversations, 
    };
};

export default useConversations;
