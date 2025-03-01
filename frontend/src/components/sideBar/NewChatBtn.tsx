import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"


function NewChatBtn() {
    const design = useContext(DesignContext);

  return (
    <div className='px-2 py-2  rounded-lg font-bold cursor-pointer absolute right-2 '
        style={{color: design?.colors.msgHeader,
                backgroundColor: design?.colors.buttonColor
        }}>
        New Chat
    </div>
  )
}

export default NewChatBtn
