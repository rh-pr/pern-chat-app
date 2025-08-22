import { useEffect, useRef } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import { getMessages } from "../../servieces/messagesService";

const useConversationScroll = () => {
    const endConversation = useRef<HTMLParagraphElement | null>(null);

    const setMessages = useMessagesStore((state) => state.setMessages);
    const messages = useMessagesStore((state) => state.messages);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId);


    useEffect(() => {
        const fetchMessages  = async () => { 
            if (!activeConversationId) return;

            const data = await getMessages(activeConversationId);

            if(data) {
                setMessages(data);
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