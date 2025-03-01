import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { CircleFadingPlus } from 'lucide-react';

function User({data}: {data:any}) {
  const design = useContext(DesignContext);
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  };
  return (
    <div className="w-full h-14 flex items-center gap-4 px-2 rounded-[15px] cursor-pointer  hover:shadow-lg  duration-[0.1s] " 
        style={{
            backgroundColor: `rgba(${hexToRgb(design?.colors.buttonColor || "#000000")}, 0.7)`,
            borderBottom: `2px solid ${design?.colors.bgColor }`
          }}>
        <img src={data.profilePic} alt="avatar" className="w-10 h-10" />
        <h1 className="font-black" style={{color:design?.colors.msgHeader}}> {data.fullName}</h1>
        <CircleFadingPlus className="absolute right-8" style={{color:design?.colors.msgHeader}} />
    </div>

  )
}

export default User
