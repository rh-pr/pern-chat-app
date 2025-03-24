import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { MessageType } from "../../types/main";
import  FilesList  from "./FilesList";
import ImagesContainer from "./ImagesContainer";

const Message = ({ message }: { message?: MessageType }) => {
  const design = useContext(DesignContext);

  const msgDirection = message?.fromMe;

  const img = msgDirection
		? "https://avatar.iran.liara.run/public/boy?username=johndoe"
		: "https://avatar.iran.liara.run/public/boy?username=janedoe";


  return (
    <div className={`flex ${msgDirection ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-fit py-2  font-medium flex gap-2  ${msgDirection && 'flex-row-reverse'}`}>
            <img src={img} alt="pic" className="w-8 h-8" />
            <div  className={`p-2 flex flex-col ${msgDirection ? 'rounded-t-[12px] rounded-l-[12px]' : ' rounded-b-[12px] rounded-r-[12px]'} `} 
                  style={{backgroundColor: msgDirection ? design?.colors.buttonColor : design?.colors.inputColor, 
                          color: msgDirection ? design?.colors.msgHeader : design?.colors.bgColor}}>
              <p>{message?.body}</p>
            
             
                {message?.files && message.files.length > 0 && <FilesList files={message.files} />}
                {message?.images &&  <div className="max-w-96"> <ImagesContainer images={message.images} /> </div>}
              
            </div>
      </div>
    </div>
  )
};
export default Message;