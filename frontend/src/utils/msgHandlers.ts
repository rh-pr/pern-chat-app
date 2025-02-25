import { KeyboardEvent, FormEvent } from "react";

export const getButtonStyle = (design) => {
    return {color: design?.colors.buttonColor}
}

export const getTextAreaStyle = (design) => {
    return  {
        backgroundColor: design?.colors.inputColor || 'white', 
        borderColor: design?.colors.buttonColor || 'green', 
        color: design?.colors.bgColor || 'black',
        scrollbarWidth: 'none' as 'none' | 'thin' | 'auto',
    };
}

export  const submitForm = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>, setMsgText: (text:string) => void) => {
    e.preventDefault();
    setMsgText('');
}


export const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>, msgText: string, setMsgText: (text:string) => void) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (msgText.trim()) {
            submitForm(e, setMsgText);
        }
    }
}


