import { ReactNode } from "react";
import { DesignContextProvider } from './DesignContext';
import { ChatContextProvider } from "./ChatContext";


export const AppContextProvider = ({children}: {children: ReactNode}) => {
    return <DesignContextProvider>
        <ChatContextProvider>
            {children}
        </ChatContextProvider>
    </DesignContextProvider>
}