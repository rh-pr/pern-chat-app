import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { CircleFadingPlus } from 'lucide-react';
import { UserType } from "../../types/main";


function User({data}: {data: UserType}) {
  const design = useContext(DesignContext);

  return (
    <div  className="w-full h-14 flex items-center gap-4 px-2  cursor-pointer  hover:shadow-lg  duration-[0.1s] " 
        style={{// backgroundColor: `rgba(${hexToRgb(design?.colors.buttonColor || "#000000")}, 0.7)`,
            borderBottom: `2px solid ${design?.colors.bgColor }`
          }}>
        <img src={data.profilePic} alt="avatar" className="w-10 h-10" />
        <h1 
            className="font-black" 
            style={{color: design?.thema ? design?.colors.msgHeader : design?.colors.bgColor}}> 
            {data.fullName}
        </h1>
        <CircleFadingPlus className="absolute right-8"  
          style={{color: design?.thema ? design?.colors.msgHeader : design?.colors.bgColor}} />
    </div>

  )
}

export default User
