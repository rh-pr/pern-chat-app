import { Send, Mic, Paperclip, SmilePlus } from "lucide-react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useContext, useState, useRef, FormEvent, useCallback, useMemo, useEffect } from "react";
import { DesignContext } from "../../context/DesignContext";
import {  getTextAreaStyle } from '../../utils/msgHandlers';
import useConversation from "../../hooks/useConversation";
import UploadMenu from "./UploadMenu";
import FilesContainer from "./FilesContainer";


const MessageInput = () => {
    const design = useContext(DesignContext);
    const { sendMsg} = useConversation();

    const smileRef = useRef<HTMLDivElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    const [msgText, setMsgText] = useState<string>('');
    const [openEmoji, setOpenEmoji] = useState<boolean>(false)
    const [openFileMenu, setOpenFileMenu] = useState<boolean>(false);

    const {files, images, updateConversation, conversation} = useConversation();

    const buttonStyle = useMemo( () => ( {color: design?.colors.buttonColor}),[design]);

    const handleMsgText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value)
    }, []);

    const handleEmoji = useCallback( (e: EmojiClickData) => {
        setMsgText(prevText => prevText + e.emoji);

        if( textAreaRef.current ) {
            textAreaRef.current.focus();
        } 

        setOpenEmoji(false);
    }, []);


    const handleForm = (e:FormEvent) => {
        e.preventDefault();

        sendMsg(msgText, files, images, updateConversation);
        setMsgText('');
    }

    
    const handleKey = (
        e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    
        if (e.key === 'Enter') {
            e.preventDefault();
            if (msgText.trim()) {
                 sendMsg(msgText, files, images, updateConversation);
                setMsgText('');
                
            }
        }
    }


    const handleOpenFileMenu = useCallback(() => {
        console.log('from input before', conversation)

        setOpenFileMenu(true);
        console.log('from input', conversation)
      }, [conversation]);
  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('epr-emoji-img')) {
                console.log("Clicked on an emoji");
                return;
            }
        
            if (smileRef.current && !smileRef.current.contains(target)) {
                setOpenEmoji(false);
            }

        } 

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        }
    },[])

	return (
		<form className='px-4 mb-3  absolute bottom-2 w-full' 
              onSubmit={(e: FormEvent) =>  handleForm(e)}>

            {files && <FilesContainer type="files" files={files} />}
            {images && <FilesContainer type="images" files={images}/>}
                
{/* 
            {openFileMenu &&  
                <UploadMenu setOpenFileMenu={setOpenFileMenu}
                            setFiles={setFiles}
                            setImages={setImages}/>} */}
            
 
            {openFileMenu &&  
                <UploadMenu setOpenFileMenu={setOpenFileMenu} />} 

			<div className='w-full relative box-border '>

                <div  className='absolute inset-y-0 start-0 flex items-end pb-2 gap-2 pl-2 pr-3'> 
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
				</div>
              
				<TextareaAutosize
                    minRows={1}
                    maxRows={3}
					className=' text-md rounded-lg block w-full p-2.5 px-10 pl-16  font-medium'
                    onChange={handleMsgText}
                    onKeyDown={(e) => handleKey(e)}
                    style={getTextAreaStyle(design)}
					placeholder='Send a message'
                    value={msgText}
                    ref={textAreaRef}
				/>
				<div className='absolute inset-y-0 end-0 flex items-end pb-2 pr-3'>
					{msgText.trim().length > 0 || (files && files?.length > 0) || (images && images?.length > 0)? 
                        <button type="submit"><Send className='w-6 h-6 ' style={buttonStyle}/> </button>:  
                        <Mic className='w-6 h-6 ' style={{color: design?.colors.buttonColor}}/>}
				</div>
			</div>
		</form>
	);
};
export default MessageInput;