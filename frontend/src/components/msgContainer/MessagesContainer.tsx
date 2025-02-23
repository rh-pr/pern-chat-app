
import Header from "./Header"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

function MessaageContainer() {
    return (
      <div className="w-9/12 flex flex-col relative">
        <Header />
        <Messages />
        <div className="z-10"><MessageInput /></div>
      </div>
    )
  }
  
  export default MessaageContainer