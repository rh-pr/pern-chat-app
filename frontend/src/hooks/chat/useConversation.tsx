import { useEffect, useState } from "react";
import useSocketStore from "../../stores/useSocketSore";
import useMessagesStore from "../../stores/useMessagesStore";
import { ConversationsType, UserType } from "../../types/main";
import useAuthStore from "../../stores/useAuthStore";


const useConversation = (data: ConversationsType) => {
    const currentUser = useAuthStore((state) => state.currentUser)
    const [user, setUser] = useState<UserType | null>(null);
    const [lastMessage, setLastMessage] = useState<string>('');
    const [isOnline, setIsOnline] = useState<boolean>(false)

    const  onlineUsers  = useSocketStore((state) => state.onlineUsers);

     const messages = useMessagesStore(state => state.messages);


    useEffect(() => {
      const msg =  messages?.filter(msg => msg.conversationId === data.id)
                            .slice() 
                            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[messages.length - 1]?.body || '';
      setLastMessage(msg);    
    }, [messages, data?.id ]);


    useEffect(() => {
      if (data && data.participants) {
        const filteredUser = data.participants.filter(part => part.id !== currentUser?.id);
        setUser(filteredUser[0]);
        setIsOnline(onlineUsers.includes(filteredUser[0].id));
        if (data.messages?.length) {
          setLastMessage(data.messages[0].body)
        }
      }
    },[data, onlineUsers]); 

    return {
        user,
        lastMessage,
        isOnline
    }
}

export default useConversation;