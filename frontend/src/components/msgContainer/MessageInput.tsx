import { Send, Mic, Paperclip, SmilePlus, Loader } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useContext, FormEvent,  useMemo,  } from "react";
import { DesignContext } from "../../context/DesignContext";
import {  getTextAreaStyle } from '../../utils/msgHandlers';
import useMessages from '../../hooks/chat/useMessages';
import UploadMenu from "./UploadMenu";
import FilesContainer from "./FilesContainer";
import Audio from './Audio';
import useMessagesStore from "../../stores/useMessagesStore";
import useEmojiPicker from "../../hooks/chat/useEmojiPicker";
import useVoiceMsg from "../../hooks/chat/audio/useVoiceMsg";
import useVoiceMsgStore from "../../stores/useVoiceMsgStore";
import useConversationsStore from "../../stores/useConversationsStore";


const MessageInput = () => {
    const design = useContext(DesignContext);
    const buttonStyle = useMemo( () => ( {color: design?.colors.buttonColor}),[design]);

    const files = useMessagesStore((state) => state.files);
    const images = useMessagesStore((state) => state.images);

    const activateVoiceMsg = useVoiceMsgStore((state) => state.activateVoiceMsg);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId)


    const {smileRef} = useEmojiPicker();

    const { startRecord } = useVoiceMsg(activeConversationId);

    const {
        loading,
        msgText,
        textAreaRef,
        setOpenEmoji,
        setOpenFileMenu,
        handleForm,
        handleKey,
        handleOpenFileMenu,
        handleEmoji,
        handleMsgText,
        openFileMenu,
        openEmoji,
    } = useMessages();



	return (
		<form className='px-4 mb-3  absolute bottom-2 w-full' 
              onSubmit={(e: FormEvent) =>  handleForm(e)}>

            {files && <FilesContainer type="files" files={files} />}
            {images && <FilesContainer type="images" files={images}/>}
 
            {openFileMenu && <UploadMenu setOpenFileMenu={setOpenFileMenu} />} 

			<div className='w-full relative box-border '>

               {!activateVoiceMsg &&  <div  className='absolute inset-y-0 start-0 flex items-end pb-2 gap-2 pl-2 pr-3'> 
                    <Paperclip 
                        onClick={handleOpenFileMenu}
                        className='w-5 h-5 ' 
                        style={buttonStyle}/> 

                    <div className="relative">
                        <EmojiPicker 
                            onEmojiClick={handleEmoji}
                            open={openEmoji}  
                            style={{backgroundColor: design?.colors.inputColor, 
                                    border: `2px solid green`, 
                                    maxWidth: '30vw', 
                                    minWidth:'10vh'}}/>

                        <div  ref = {smileRef}>
                            <SmilePlus 
                                onClick={() =>  setOpenEmoji(!openEmoji)} 
                                className='emoji w-5 h-5 ' style={buttonStyle} />
                        </div>
                    </div>
				</div>}
				
                {!activateVoiceMsg && <TextareaAutosize
                    disabled={activateVoiceMsg}
                    minRows={1}
                    maxRows={3}
                    className=' text-md rounded-lg block w-full p-2.5 px-10 pl-16  font-medium'
                    onChange={handleMsgText}
                    onKeyDown={(e) => handleKey(e)}
                    style={getTextAreaStyle(design)}
                    placeholder='Send a message'
                    value={msgText}
                    ref={textAreaRef}
                />}

                {activateVoiceMsg && <Audio  />}

				<div className='absolute inset-y-0 end-0 flex items-end pb-2 pr-3'>
					{msgText.trim().length > 0 || (files && files?.length > 0) || (images && images?.length > 0) || activateVoiceMsg ? 
                        <button type="submit" disabled={loading}>
                            {loading ? <Loader  className='w-6 h-6 ' style={buttonStyle} /> : <Send className='w-6 h-6 ' style={buttonStyle}/>} </button>:  
                       <div onClick={ startRecord}>  
                            <Mic className='w-6 h-6 ' style={{color: design?.colors.buttonColor}}/> </div>}
				</div>
			</div>
		</form>
	);
};

export default MessageInput;