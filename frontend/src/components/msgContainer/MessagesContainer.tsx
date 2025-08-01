
import useConversation from "../../hooks/chat/useConversation"
import Header from "./Header"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Message.json";

function MessaageContainer() {

  const { conversation } = useConversation();
    if (conversation) {
      return <div className="flex flex-col justify-center items-center w-[90vw] md:w-[70vw] md:pb-3 h-full">
        <p className="f font-black text-center text-gray-500">Select a conversation to start chatting....</p>
        <div className="w-64 h-64">
          <Lottie animationData={animationData} loop={true} />
        <div></div>
    </div>
      </div>
    }
    return (
      <div className={ `w-11/12 md:w-9/12 md:pb-3 h-full  ${conversation ? 'flex pl-6 md:pl-0' : 'hidden md:flex' } flex flex-col relative`}>
        <Header />
        <Messages />
        <div className="z-10"><MessageInput /></div>
      </div>
    )
  }
  
  export default MessaageContainer