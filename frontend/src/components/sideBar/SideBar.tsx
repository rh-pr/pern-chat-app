import { useContext, useState } from "react";
import { DesignContext } from "../../context/DesignContext";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";
import NewChatBtn from "./NewChatBtn";


function SideBar() {
  const design = useContext(DesignContext);
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <div className={`w-3/12 relative border-r-2 p-4 flex flex-col gap-4 z-10 ${design?.thema ?  `border-[#31402f]` : `border-[#658261]`}`}>
      <h1 className={`font-bold text-3xl text-[#614318] `} style={{textShadow: `#614318 1px 0 2px`}}>Chats</h1>
      <NewChatBtn />
      <SearchInput query={searchQuery} setQuery={setSearchQuery}/>
      <Conversations query={searchQuery} />
      <LogOutBtn />
    </div>
  )
}

export default SideBar