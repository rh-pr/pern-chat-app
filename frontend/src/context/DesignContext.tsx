import { createContext, ReactNode, useEffect, useState } from "react";
import { DesignContextType, Colors } from "../types/main";
import { getThemaColors } from "../utils/design";


export const DesignContext = createContext<DesignContextType | null>(null);

export const DesignContextProvider = ({ children }: {children: ReactNode}) => {
    const [thema, setThema] = useState(true);
    const [colors, setColors] = useState<Colors>(getThemaColors(thema));
    
    useEffect(() => {
      setColors(getThemaColors(thema));
    }, [thema]);
    
    return (
        <DesignContext.Provider value={{
            thema,
            setThema,
            colors, 
            setColors
        }}>
            { children }
        </DesignContext.Provider>
    )
}