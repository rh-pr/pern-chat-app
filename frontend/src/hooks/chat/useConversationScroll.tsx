import { useEffect, useRef } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import { getMessages } from "../../servieces/messagesService";
import { filteredUnreadedMsg } from "../../utils/msgHandlers";
import useAuthStore from "../../stores/useAuthStore";

const useConversationScroll = () => {
    const endConversation = useRef<HTMLParagraphElement | null>(null);

    const setMessages = useMessagesStore((state) => state.setMessages);
    const messages = useMessagesStore((state) => state.messages);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId);
    const currentUser = useAuthStore(state => state.currentUser);
    const setUnreadedMsgs = useMessagesStore((state) => state.setUnreadedMsgs);
 
    useEffect(() => {
        const fetchMessages  = async () => { 
            if (!activeConversationId) return;
            
            const data = await getMessages(activeConversationId);

            if(data) {
                setMessages(data);
                const filtered = filteredUnreadedMsg(data, currentUser, activeConversationId);
                setUnreadedMsgs(filtered);
            }
        }
        fetchMessages ();

    }, [activeConversationId]);

    useEffect(() => {
        if(endConversation.current) {
            endConversation.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages])

    return {
        endConversation
    }

}

export default useConversationScroll;