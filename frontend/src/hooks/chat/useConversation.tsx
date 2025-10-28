import { useEffect, useState } from "react";
import useSocketStore from "../../stores/useSocketSore";
import useMessagesStore from "../../stores/useMessagesStore";
import { ConversationsType, MessageType, UserType, LastMessageType } from "../../types/main";
import useAuthStore from "../../stores/useAuthStore";


const useConversation = (data: ConversationsType) => {
    const currentUser = useAuthStore((state) => state.currentUser)
    const [user, setUser] = useState<UserType | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(false);

    const  onlineUsers  = useSocketStore((state) => state.onlineUsers);
    const messages = useMessagesStore(state => state.messages);
    const setLastMessages = useMessagesStore((state) => state.setLastMessages);

  
    useEffect(() => {
      
      const filteredMessages = messages?.reduce((acc: Record<string, LastMessageType>, msg:MessageType) => {
                  acc['lastMsg'] = {
                      convId: msg.conversationId,
                      msg: msg.body
                  };
                  return acc;
                  }, {})

        console.log('all messages: ', messages);
        console.log('filtered: ', filteredMessages);
        
        
        if (filteredMessages) {
            setLastMessages(filteredMessages.lastMsg);   
        }

      }, [messages, data ]);


    useEffect(() => {
      if (data && data.participants) {
        const filteredUser = data.participants.filter(part => part.id !== currentUser?.id);
        setUser(filteredUser[0]);
        setIsOnline(onlineUsers.includes(filteredUser[0].id));
        if (data.messages?.length) {
         
          setLastMessages({
            convId: data?.id,
            msg: data.messages[0].body
          });
        }
      }
    },[data, onlineUsers]); 

    return {
        user,
        isOnline
    }
}

export default useConversation;