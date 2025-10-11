
import { createContext, ReactNode, useEffect, useState } from "react";
import { DesignContextType, Colors } from "../types/main";
import { getThemaColors } from "../utils/design";


export const DesignContext = createContext<DesignContextType | null>(null);

export const DesignContextProvider = ({ children }: {children: ReactNode}) => {
    const [thema, setThema] = useState(false);
    const [colors, setColors] = useState<Colors>(getThemaColors(thema));
    const [sound, setSound] = useState(false);
    
    useEffect(() => {
      setColors(getThemaColors(thema));
    }, [thema]);
    
    return (
        <DesignContext.Provider value={{
            thema,
            setThema,
            colors, 
            setColors,
            sound,
            setSound
        }}>
            { children }
        </DesignContext.Provider>
    )
}