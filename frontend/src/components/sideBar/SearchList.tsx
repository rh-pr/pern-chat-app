import { useContext } from "react";
import useUsers from "../../hooks/useUsers"
import { UserType } from "../../types/main";
import User from "./User";
import { DesignContext } from "../../context/DesignContext";

function SearchList({query}: {query: string}) {
  const { filteredUser } = useUsers();
  const desing = useContext(DesignContext);
  return (
    <div className="p-2 w-full max-h-full overflow-auto flex flex-col gap-2 rounded-[15px] duration-[1s,15s]"  
         style={{boxShadow: `0px 4px 10px 4px ${desing?.thema ? ' rgb(65, 89, 20)' : 'rgb(94, 123, 39)'}`}}>
        {filteredUser(query).map(( user: UserType) => <User data={user} />)}
    </div>
  )
}

export default SearchList
