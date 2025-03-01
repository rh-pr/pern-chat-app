import { Send, Mic, Paperclip, SmilePlus } from "lucide-react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useContext, useState, useRef, FormEvent, useCallback, useMemo } from "react";
import { DesignContext } from "../../context/DesignContext";
import { handleForm, handleKey, getTextAreaStyle } from '../../utils/msgHandlers';
import useConversation from "../../hooks/useConversation";


const MessageInput = () => {
    const design = useContext(DesignContext);
    const { sendMsg } = useConversation();

    const [msgText, setMsgText] = useState<string>('');
    const [openEmoji, setOpenEmoji] = useState<boolean>(false)

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

	return (
		<form className='px-4  absolute bottom-2 w-full' 
              onSubmit={(e: FormEvent) => 
                    handleForm(e, msgText, setMsgText, sendMsg)}>
			<div className='w-full relative'>
                <div  className='absolute inset-y-0 start-0 flex items-end pb-2 gap-2 pl-2 pr-3'> 
                    <Paperclip className='w-5 h-5 ' style={buttonStyle}/> 
                    <div className="relative">
                        <EmojiPicker 
                            onEmojiClick={handleEmoji}
                            open={openEmoji}  
                            style={{backgroundColor: design?.colors.inputColor, 
                                    border: `2px solid green`, 
                                    maxWidth: '30vw', 
                                    minWidth:'10vh'}}/>
                        <SmilePlus onClick={() => 
                            setOpenEmoji(!openEmoji)} className='w-5 h-5 ' style={buttonStyle}/>
                    </div>
				</div>
				<TextareaAutosize
                    minRows={1}
                    maxRows={3}
					className=' text-md rounded-lg block w-full p-2.5 px-10 pl-16  font-medium'
                    onChange={handleMsgText}
                    onKeyDown={(e) => handleKey(e, msgText, setMsgText, sendMsg)}
                    style={getTextAreaStyle(design)}
					placeholder='Send a message'
                    value={msgText}
                    ref={textAreaRef}
				/>
				<div className='absolute inset-y-0 end-0 flex items-end pb-2 pr-3'>
					{msgText.trim().length > 0 ? 
                        <button type="submit"><Send className='w-6 h-6 ' style={buttonStyle}/> </button>:  
                        <Mic className='w-6 h-6 ' style={{color: design?.colors.buttonColor}}/>}
				</div>
			</div>
		</form>
	);
};
export default MessageInput;