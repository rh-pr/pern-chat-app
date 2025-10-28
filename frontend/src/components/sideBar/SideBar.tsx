import { useContext, useState } from "react";
import { DesignContext } from "../../context/DesignContext";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import NewChatBtn from "./NewChatBtn";
import SearchList from "./SearchList";
import useUsers from "../../hooks/chat/useUsers";
import  useConversationsStore  from "../../stores/useConversationsStore";
import ProfileButton from "./ProfileButton";


function SideBar() {
  const design = useContext(DesignContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { openUserList } = useUsers();
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)

  return (
    <div className={`scrollbar-hide w-11/12 md:w-3/12 relative md:border-r-2 p-4 ${activeConversationId ? 'hidden md:flex' : 'flex pl-6 md:pl-3'} flex-col gap-4 z-10 ${design?.thema ?  `md:border-[#31402f]` : `md:border-[#658261]`}`}>
      <h1 className={`font-bold text-3xl text-[#614318] `} style={{textShadow: `#614318 1px 0 2px`}}>Chats</h1>
      <NewChatBtn />
      <SearchInput  setQuery={setSearchQuery}/>
      { openUserList ? 
        <SearchList  query={searchQuery} /> : 
        <Conversations  query={searchQuery}/>
      }
      <ProfileButton />
    </div>
  )
}

export default SideBar