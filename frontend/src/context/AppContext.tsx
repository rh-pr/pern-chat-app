import { ReactNode } from "react";
import { DesignContextProvider } from './DesignContext';


export const AppContextProvider = ({children}: {children: ReactNode}) => {
    return <DesignContextProvider>{children}</DesignContextProvider>
}