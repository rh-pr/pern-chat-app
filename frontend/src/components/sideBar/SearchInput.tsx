import { Search } from "lucide-react";

import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";

function SearchInput() {
  const design = useContext(DesignContext);

  return (
    <div className="search-container w-full ">
        <input 
          type="text"
          className={`w-full h-8 md:h-10 rounded-lg border-2 px-2 font-medium `} 
          style={{backgroundColor: design?.colors.inputColor, borderColor: design?.colors.bgColor, color: design?.colors.bgColor}}
        />
        <button><Search className='w-4 h-4 md:w-6 md:h-6 outline-none' /></button>
      </div>
  )
}

export default SearchInput
