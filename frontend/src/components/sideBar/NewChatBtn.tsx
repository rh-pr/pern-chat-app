import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import useUsers from "../../hooks/useUsers";


function NewChatBtn() {
    const design = useContext(DesignContext);
    const { toggleOpenList, openUserList } = useUsers();

  return (
    <div className='px-2 py-2  rounded-lg font-bold cursor-pointer absolute right-2 '
        style={{color: design?.colors.msgHeader,
                backgroundColor: design?.colors.buttonColor
        }}
        onClick={() => toggleOpenList()}>
        {openUserList ? 'Back' : 'New Chat'}
    </div>
  )
}

export default NewChatBtn
