import { useEffect, useState } from "react";
import useSocketStore from "../../stores/useSocketSore";
import useMessagesStore from "../../stores/useMessagesStore";
import { ConversationsType, MessageType, UserType } from "../../types/main";
import useAuthStore from "../../stores/useAuthStore";


type LastMessageType = {
  convId: string,
  msg: string
}

const useConversation = (data: ConversationsType) => {
    const currentUser = useAuthStore((state) => state.currentUser)
    const [user, setUser] = useState<UserType | null>(null);
    const [lastMessage, setLastMessage] = useState<LastMessageType>({
      convId: '',
      msg: ''
    });
    const [isOnline, setIsOnline] = useState<boolean>(false)

    const  onlineUsers  = useSocketStore((state) => state.onlineUsers);

     const messages = useMessagesStore(state => state.messages);


    useEffect(() => {
        const filteredMessages = messages?.filter((msg: MessageType) => msg.conversationId === data.id)
                                  .slice()
                                  .sort((a:MessageType, b:MessageType) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const lastMsg = filteredMessages && filteredMessages.length > 0 ? filteredMessages[filteredMessages.length - 1] : undefined;
        setLastMessage({
          convId: lastMsg?.conversationId || '',
          msg: lastMsg?.body || ''
        });
      }, [messages, data?.id ]);


    useEffect(() => {
      if (data && data.participants) {
        const filteredUser = data.participants.filter(part => part.id !== currentUser?.id);
        setUser(filteredUser[0]);
        setIsOnline(onlineUsers.includes(filteredUser[0].id));
        if (data.messages?.length) {
          setLastMessage({
            convId: data?.id,
            msg: data.messages[0].body
          })
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