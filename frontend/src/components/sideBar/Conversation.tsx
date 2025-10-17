import { useContext, useEffect, useState } from "react"
import { DesignContext } from "../../context/DesignContext"
import { ConversationsType, LastMessageType, UnreadedMsgType} from "../../types/main";
import useConversations from "../../hooks/chat/useConversations";
import  useConversationsStore  from "../../stores/useConversationsStore";

import useConversation from "../../hooks/chat/useConversation";
import useMessagesStore from "../../stores/useMessagesStore";

function Conversation({data}: {data: ConversationsType}) {
    const design = useContext(DesignContext);
    const { setCurrentConversation } = useConversations();
    const { user,isOnline } = useConversation(data);

   //  const [isUnreadedMsg, setIsUnreadedMsg] = useState<boolean>(false);

    const activeConversationId = useConversationsStore((state) => state.activeConversationId);
    const lastMessages = useMessagesStore((state) => state.lastMessages);

    const unreadedMsgs = useMessagesStore((state) => state.unreadedMsgs);

    const [lastLocalMsg, setLastLocalMsg] = useState<LastMessageType | null>(null);
    
    const [isUnreadedMsg, setIsUnreadedMsg] = useState<number>(0);

    useEffect(() => {
      const unreaded = unreadedMsgs.find((el: UnreadedMsgType) => el.convId === data.id);
      setIsUnreadedMsg(unreaded?.count || 0);

    }, [lastMessages, unreadedMsgs, data]);

    useEffect(() => {
      const msg = lastMessages?.find((msg: LastMessageType) => msg.convId === data.id);
      if (msg) {  setLastLocalMsg(msg); }
    },[lastMessages, data])

    
   if (!data || !data.participants || data.participants.length === 0 || !user) {
      return null; 
   }

  return (
    <div className={` w-full relative min-h-18 overflow-x-hidden flex items-center gap-4 px-2 rounded-[15px] cursor-pointer hover:hue-rotate-20 hover:shadow-lg  duration-[0.1s] `}
         style={{
            backgroundColor: design?.thema ? design?.colors.buttonColor : design?.colors.buttonColor,
            boxShadow: `${activeConversationId === data.id ? `inset 1px 1px 16px 1px ${design?.colors?.textColor}` : `0px 2px 4px ${design?.thema ?  'rgb(114, 156, 23)' : 'rgb(136, 178, 44)'}`}`,}}
        onClick={() => {setCurrentConversation(data.id, data.participants)}}>

        {isOnline && <div className="w-3 h-3 bg-green-700 rounded-full absolute left-9 top-4"></div>}
        {isUnreadedMsg  > 0 && <div className="w-[20px] h-[20px] bg-green-600 rounded-full absolute right-9 top-4 text-center text-white font-bold text-sm">{isUnreadedMsg}</div>}
        
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
                  <span>{lastLocalMsg?.msg}</span>
            </p>  
       </div>
    </div>
  )
}

export default Conversation
