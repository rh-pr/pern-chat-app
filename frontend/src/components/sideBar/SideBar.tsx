import { useContext, useState } from "react";
import { DesignContext } from "../../context/DesignContext";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";
import NewChatBtn from "./NewChatBtn";
import SearchList from "./SearchList";
import useUsers from "../../hooks/chat/useUsers";
import useConversation from "../../hooks/chat/useConversation";


function SideBar() {
  const design = useContext(DesignContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { openUserList } = useUsers();

  const { conversation } = useConversation();

  return (
    <div className={`scrollbar-hide w-11/12 md:w-3/12 relative md:border-r-2 p-4 ${conversation ? 'hidden md:flex' : 'flex pl-6 md:pl-3'} flex-col gap-4 z-10 ${design?.thema ?  `md:border-[#31402f]` : `md:border-[#658261]`}`}>
      <h1 className={`font-bold text-3xl text-[#614318] `} style={{textShadow: `#614318 1px 0 2px`}}>Chats</h1>
      <NewChatBtn />
      <SearchInput  setQuery={setSearchQuery}/>
      {/* <Conversations query={searchQuery} /> */}
      {openUserList ? <SearchList  query={searchQuery} /> : <Conversations  query={searchQuery}/>}
      <LogOutBtn />
      {/* {openUserList && <SearchList />} */}
    </div>
  )
}

export default SideBar