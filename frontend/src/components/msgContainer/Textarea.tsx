import { useContext, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { DesignContext } from '../../context/DesignContext';
import { TextareaProps } from '../../types/main';



function Textarea({msgText, setMsgText, textAreaRef}: TextareaProps) {

    const design = useContext(DesignContext);

    const textAreaStyle = {
        backgroundColor: design?.colors.inputColor || 'white', 
        borderColor: design?.colors.buttonColor || 'green', 
        color: design?.colors.bgColor || 'black',
        scrollbarWidth: 'none' as 'none' | 'thin' | 'auto',
    };

    const handleMsgText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value)
    } 

    const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (msgText.trim()) {
            ///changes
                e.preventDefault();
                setMsgText('');
            }
        }
    }

  return (
    <TextareaAutosize
                    minRows={1}
                    maxRows={3}
					className=' text-md rounded-lg block w-full p-2.5 px-10 pl-16  font-medium'
                    onChange={handleMsgText}
                    onKeyDown={(e) =>handleKey(e)}
                    style={textAreaStyle}
					placeholder='Send a message'
                    value={msgText}
                    ref={textAreaRef}
				/>
  )
}

export default Textarea
