import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { ConversationsType } from "../../types/main";
import useConversations from "../../hooks/chat/useConversations";
import  useConversationsStore  from "../../stores/useConversationsStore";


function Conversation({data}: {data: ConversationsType}) {
    const design = useContext(DesignContext);
    const { setCurrentConversation } = useConversations();
    const activeConversationId = useConversationsStore((state) => state.activeConversationId);

    if (!data || !data.participants || data.participants.length === 0) {
        return null; 
    }
  return (
    <div className="w-full min-h-18 overflow-x-hidden flex items-center gap-4 px-2 rounded-[15px] cursor-pointer hover:hue-rotate-20 hover:shadow-lg  duration-[0.1s] " 
         style={{
            backgroundColor: design?.thema ? design?.colors.buttonColor : design?.colors.buttonColor,
            boxShadow: `${activeConversationId === data.id ? `inset 1px 1px 16px 1px ${design?.colors?.textColor}` : `0px 2px 4px ${design?.thema ?  'rgb(114, 156, 23)' : 'rgb(136, 178, 44)'}`}`,
            
         }}
         onClick={() => {setCurrentConversation(data.id)}}>
        <img src={data.participants[0].profilePic} 
             alt="avatar" 
             className="w-10 h-10" />
       <div className="h-full py-2 w-9/12">
            <h1 className="font-black" 
                style={{color:design?.colors.msgHeader}}>
                    {data.participants[0].fullName}
            </h1>
            <p className=" overflow-hidden text-ellipsis whitespace-nowrap w-full " 
               style={{color: design?.colors.textColor}}>
                    {data.lastMessage?.body}
            </p>  
       </div>
    </div>
  )
}

export default Conversation
