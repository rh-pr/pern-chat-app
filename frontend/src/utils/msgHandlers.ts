import { KeyboardEvent, FormEvent } from "react";
import { DesignContextType, MessageType, UnreadedMsgType, UserType } from '../types/main';
import { updateMessageStatus } from "../servieces/messagesService";

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

export const filteredUnreadedMsg =  (data: MessageType[], user: UserType | null, chat: string) => {
    let unreaded: UnreadedMsgType[] = [];
    if (data.length < 1 || !user || chat.trim().length == 0) return [];
    
    data.map(async (el: MessageType) => {
        switch(el.status) {
            case 'RECIEVED':
                if (el.conversationId === chat) {
                    el.status = 'READED';
                    await updateMessageStatus({id: el.id, status: 'READED'});
                } else {
                     unreaded = addOrIncrease(unreaded, el.id);
                }
                break;
            case 'SENDED':
            case 'FAILED':
               if (el.conversationId === chat) {
                    el.status = 'READED';
                    await updateMessageStatus({id: el.id, status: 'READED'});
                }
                if (el.senderId !== user.id) {
                    el.status = 'RECEIVED';
                    await updateMessageStatus({id: el.id, status: 'RECEIVED'});
                    unreaded = addOrIncrease(unreaded, el.id)
                }
                break;            
        }
    });

    return unreaded;
}

const  addOrIncrease = (arr: UnreadedMsgType[], id: string) => {
  const index = arr.findIndex(obj => obj.convId === id);

   if (index !== -1) {
    return arr.map((obj, i) =>
      i === index ? { ...obj, count: obj.count + 1 } : obj
    );
  }

  return [...arr, { convId: id, count: 1 }];
}




