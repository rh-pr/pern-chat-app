import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";

function SideBar() {
  const design = useContext(DesignContext);

  return (
    <div className={`w-3/12 border-r-2 ${design?.thema ?  `border-[#31402f]` : `border-[#658261]`}`}>

    </div>
  )
}

export default SideBar