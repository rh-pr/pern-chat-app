import { KeyboardEvent, FormEvent } from "react";
import { DesignContextType } from '../types/main';

export const getButtonStyle = (design: DesignContextType | null) => {
    return {color: design?.colors.buttonColor}
}

export const getTextAreaStyle = (design: DesignContextType | null) => {
    return  {
        backgroundColor: design?.colors.inputColor || 'white', 
        borderColor: design?.colors.buttonColor || 'green', 
        color: design?.colors.bgColor || 'black',
        scrollbarWidth: 'none' as 'none' | 'thin' | 'auto',
    };
}

export const handleForm = (
    e: FormEvent, 
    msgText:string,
    setMsgText: (msgText:string) => void,
    sendMsg: (msgText: string) => void) => {

    e.preventDefault();
    sendMsg(msgText);
    setMsgText('');
}

export const handleKey = (
    e: KeyboardEvent<HTMLTextAreaElement>, 
    msgText: string, 
    setMsgText: (text:string) => void,
    sendMsg: (msgText: string) => void) => {

    if (e.key === 'Enter') {
        e.preventDefault();
        if (msgText.trim()) {
            sendMsg(msgText);
            setMsgText('');
            
        }
    }
}




