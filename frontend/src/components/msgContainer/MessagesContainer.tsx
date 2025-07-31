
import useConversation from "../../hooks/chat/useConversation"
import Header from "./Header"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

function MessaageContainer() {

  const { conversation } = useConversation();
    return (
      <div className={ `w-11/12 md:w-9/12 md:pb-3 h-full  ${conversation ? 'flex pl-6 md:pl-0' : 'hidden md:flex' } flex flex-col relative`}>
        <Header />
        <Messages />
        <div className="z-10"><MessageInput /></div>
      </div>
    )
  }
  
  export default MessaageContainer