import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"


function Conversation({data}: {data:any}) {
    const design = useContext(DesignContext);
  return (
    <div className="w-full h-18 flex items-center gap-4 px-2 rounded-[15px] cursor-pointer hover:hue-rotate-20 hover:shadow-lg  duration-[0.1s] " 
         style={{backgroundColor: design?.thema ? design?.colors.buttonColor : design?.colors.buttonColor}}>
        <img src={data.profilePic} alt="avatar" className="w-10 h-10" />
       <div className="h-full py-2">
            <h1 className="font-black" style={{color:design?.colors.msgHeader}}> {data.fullName}</h1>
            <p className="hidden lg:flex" style={{color: design?.colors.textColor}}>Last messages text</p>
       </div>
    </div>
  )
}

export default Conversation
