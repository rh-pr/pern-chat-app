import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";


function SideBar() {
  const design = useContext(DesignContext);

  return (
    <div className={`w-3/12 border-r-2 p-4 flex flex-col gap-4 z-10 ${design?.thema ?  `border-[#31402f]` : `border-[#658261]`}`}>
      <h1 className={`font-bold text-3xl text-[#614318] `}>Chats</h1>
      <SearchInput />
      <Conversations />
      <LogOutBtn />
    </div>
  )
}

export default SideBar