import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { Backpack } from "lucide-react";

const Message = ({ message }: { message?: any }) => {
  const design = useContext(DesignContext);
  const msgDirection = message.fromMe;

  const img = msgDirection
		? "https://avatar.iran.liara.run/public/boy?username=johndoe"
		: "https://avatar.iran.liara.run/public/boy?username=janedoe";


  return (
    <div className={`flex ${msgDirection ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-fit py-2  font-medium flex gap-2  ${msgDirection && 'flex-row-reverse'}`}>
            <img src={img} alt="pic" className="w-8 h-8" />
            <div  className={`p-2 flex ${msgDirection ? 'rounded-t-[12px] rounded-l-[12px]' : ' rounded-b-[12px] rounded-r-[12px]'} `} 
                  style={{backgroundColor: msgDirection ? design?.colors.buttonColor : design?.colors.inputColor, 
                          color: msgDirection ? design?.colors.msgHeader : design?.colors.bgColor}}>
              <p>Message to me</p>
            </div>
      </div>
    </div>
  )
};
export default Message;