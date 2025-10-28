
import { createContext, ReactNode, useEffect, useState } from "react";
import { DesignContextType, Colors } from "../types/main";
import { getThemaColors } from "../utils/design";
import useAuthStore from "../stores/useAuthStore";
import { getUserSettings } from "../servieces/settingsService";


export const DesignContext = createContext<DesignContextType | null>(null);

export const DesignContextProvider = ({ children }: {children: ReactNode}) => {
    const [thema, setThema] = useState(false);
    const [colors, setColors] = useState<Colors>(getThemaColors(thema));
    const [sound, setSound] = useState(false);


    const currentUser = useAuthStore(state => state.currentUser)
    
    useEffect(() => {
         async function getSettings() {
            if(!currentUser) return;

            const data = await getUserSettings(currentUser.id);

            if (!data) return;

            setThema(data.data.thema);
            setSound(data.data.sound);
            
        }

        getSettings();
    }, [currentUser]);

    
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