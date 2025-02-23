
import Header from "./Header"
import MessageInput from "./MessageInput"

function MessaageContainer() {
    return (
      <div className="w-9/12 flex flex-col relative">
        <Header />
        <div className="z-10"><MessageInput /></div>
      </div>
    )
  }
  
  export default MessaageContainer