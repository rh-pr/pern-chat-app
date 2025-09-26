import { useContext, useEffect } from "react";
import { DesignContext } from "../../context/DesignContext";
import { MessageType } from "../../types/main";
import  FilesList  from "./FilesList";
import ImageList from "./ImageList";
import useAuthStore from "../../stores/useAuthStore";
import useMessagesStore from "../../stores/useMessagesStore";
import AudioMessage from "./AudioMessage";

const Message = ({ message }: { message?: MessageType }) => {

  const design = useContext(DesignContext);
  const currentUser = useAuthStore((state) => state.currentUser);
  const avatarPic = useMessagesStore((state) => state.avatarPic);

  const msgDirection = message?.senderId === currentUser?.id;
  const shakeClass = message?.shouldShake ? 'shake' : '';

  const img = msgDirection
		? currentUser?.profilePic
		: avatarPic

  useEffect(() => {
    console.log('mess: ', shakeClass);
    
    
  },[message?.images, message?.files])

  return (
    <div className={`flex  ${msgDirection ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-fit py-2  font-medium flex gap-2  ${msgDirection && 'flex-row-reverse'}`}>
            <img src={img} alt="pic" className="w-8 h-8" />
            <div  className={`p-2 flex flex-col ${shakeClass} ${msgDirection ? 'rounded-t-[12px] rounded-l-[12px]' : ' rounded-b-[12px] rounded-r-[12px]'} `} 
                  style={{backgroundColor: msgDirection ? design?.colors.buttonColor : design?.colors.inputColor, 
                          color: msgDirection ? design?.colors.msgHeader : design?.colors.bgColor}}>
              <p>{message?.body}</p>
                {message?.files && message.files.length > 0 && <FilesList files={message.files} />}
                {message?.images &&  <div className="max-w-96"> <ImageList images={message.images} /> </div>}
                {message?.audios && <AudioMessage audioSource={message.audios[0]}/>}
              
            </div>
      </div>
    </div>
  )
};
export default Message;