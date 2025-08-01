import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { CircleFadingPlus } from 'lucide-react';
import { UserType } from "../../types/main";
import useUsers from "../../hooks/chat/useUsers";

function User({data}: {data: UserType}) {

  const design = useContext(DesignContext);
  const { chooseUser } = useUsers();

  return (
    <div  className="relative w-full h-14 flex items-center gap-4 px-2   cursor-pointer  hover:shadow-lg  duration-[0.1s] " 
        style={{// backgroundColor: `rgba(${hexToRgb(design?.colors.buttonColor || "#000000")}, 0.7)`,
            borderBottom: `2px solid ${design?.colors.bgColor }`
          }}
        onClick={() => chooseUser(data.id)}>
        <img src={data.profilePic} alt="avatar" className="w-10 h-10" />
        <h1 
            className="font-black" 
            style={{color: design?.thema ? design?.colors.msgHeader : design?.colors.bgColor}}> 
            {data.fullName}
        </h1>
        <CircleFadingPlus className="absolute right-1"  
          style={{color: design?.thema ? design?.colors.msgHeader : design?.colors.bgColor}} />
    </div>

  )
}

export default User
