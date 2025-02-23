import { Send, Mic, Paperclip, SmilePlus } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import { useContext, useState } from "react";
import { DesignContext } from "../../context/DesignContext";

const MessageInput = () => {
    const design = useContext(DesignContext);
    const [msgText, setMsgText] = useState<string>('');

    const handleMsgText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value)
    } 

	return (
		<form className='px-4 mb-3 absolute bottom-2 w-full'>
			<div className='w-full relative'>
                <div  className='absolute inset-y-0 start-0 flex items-end pb-2 gap-2 pl-2 pr-3'> 
                    <Paperclip className='w-5 h-5 ' style={{color: design?.colors.buttonColor}}/> 
                    <SmilePlus className='w-5 h-5 ' style={{color: design?.colors.buttonColor}}/>
				</div>

				<TextareaAutosize
                    minRows={1}
                    maxRows={3}
					className=' text-md rounded-lg block w-full p-2.5 px-10 pl-16  font-medium'
                    onChange={handleMsgText}
                    style={{backgroundColor: design?.colors.inputColor, 
                            borderColor: design?.colors.buttonColor, 
                            color: design?.colors.bgColor,
                            scrollbarWidth: 'none'}}
					placeholder='Send a message'
				/>
				<div className='absolute inset-y-0 end-0 flex items-end pb-2 pr-3'>
					{msgText.trim().length > 0 ? 
                        <button type="submit"><Send className='w-6 h-6 ' style={{color: design?.colors.buttonColor}}/> </button>:  
                        <Mic className='w-6 h-6 ' style={{color: design?.colors.buttonColor}}/>}
				</div>
			</div>
		</form>
	);
};
export default MessageInput;