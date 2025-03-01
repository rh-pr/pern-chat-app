import { useContext } from "react";
import useUsers from "../../hooks/useUsers"
import { UserType } from "../../types/main";
import User from "./User";
import { DesignContext } from "../../context/DesignContext";

function SearchList() {
  const { users } = useUsers();
  const design = useContext(DesignContext);

  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  };

  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-2 rounded-[15px]" 
         >
        {users.map(( user: UserType) => <User data={user} />)}
    </div>
  )
}

export default SearchList
