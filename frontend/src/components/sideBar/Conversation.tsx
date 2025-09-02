import { useContext, useEffect, useState } from "react"
import { DesignContext } from "../../context/DesignContext"
import { ConversationsType, UserType } from "../../types/main";
import useConversations from "../../hooks/chat/useConversations";
import  useConversationsStore  from "../../stores/useConversationsStore";
import useAuthStore from "../../stores/useAuthStore";
import useSocketStore from "../../stores/useSocketSore";

function Conversation({data}: {data: ConversationsType}) {
    const design = useContext(DesignContext);
    const { setCurrentConversation } = useConversations();
    const currentUser = useAuthStore((state) => state.currentUser)
    const activeConversationId = useConversationsStore((state) => state.activeConversationId);
    const [user, setUser] = useState<UserType | null>(null);
    const [lastMessage, setLastMessage] = useState<string>('');
    const [isOnline, setIsOnline] = useState<boolean>(false)

    const { onlineUsers } = useSocketStore();



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

     if (!data || !data.participants || data.participants.length === 0 || !user) {
        return null; 
    }

  return (
    <div className="w-full relative min-h-18 overflow-x-hidden flex items-center gap-4 px-2 rounded-[15px] cursor-pointer hover:hue-rotate-20 hover:shadow-lg  duration-[0.1s] " 
         style={{
            backgroundColor: design?.thema ? design?.colors.buttonColor : design?.colors.buttonColor,
            boxShadow: `${activeConversationId === data.id ? `inset 1px 1px 16px 1px ${design?.colors?.textColor}` : `0px 2px 4px ${design?.thema ?  'rgb(114, 156, 23)' : 'rgb(136, 178, 44)'}`}`,
            
         }}
         onClick={() => {setCurrentConversation(data.id)}}>
        {isOnline && <div className="w-3 h-3 bg-green-700 rounded-full absolute left-9 top-4"></div>}
        <img src={user.profilePic} 
             alt="avatar" 
             className="w-10 h-10 rounded-full object-cover" />
       <div className="h-full py-2 w-9/12">
            <h1 className="font-black" 
                style={{color:design?.colors.msgHeader}}>
                    {user.fullName}
            </h1>
            <p className=" overflow-hidden text-ellipsis whitespace-nowrap w-full " 
               style={{color: design?.colors.textColor}}>
                    {lastMessage}
            </p>  
       </div>
    </div>
  )
}

export default Conversation
