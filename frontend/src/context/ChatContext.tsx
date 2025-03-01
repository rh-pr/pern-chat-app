import {createContext, ReactNode,useState } from "react";
import { ChatContextType, MessageType } from "../types/main";

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({children}: {children: ReactNode}) => {
    const [conversation, setConversation] = useState<MessageType[] | null>(null);


    return (
        <ChatContext.Provider value={{
            conversation, 
            setConversation
        }}>
            {children}
        </ChatContext.Provider>
    )
}