import { Search } from "lucide-react";

import { ChangeEvent, useContext } from "react";
import { DesignContext } from "../../context/DesignContext";

function SearchInput({setQuery}: {setQuery: (query: string) => void}) {
  const design = useContext(DesignContext);

  return (
    <div className="search-container w-full relative">
        <input 
          type="text"
          className={`w-full h-8 md:h-10 rounded-[15px] border-2 px-2 font-medium  `} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          style={{backgroundColor: design?.colors.inputColor, 
                  borderColor: design?.colors.bgColor,
                  color: design?.colors.bgColor}}
        />
        <button className="absolute right-2 top-1" style={{color: design?.colors.bgColor}}><Search className='w-6 h-6 md:w-8 md:h-8' /></button>
      </div> 
  )
}

export default SearchInput
