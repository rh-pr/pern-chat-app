import { useRef, useEffect } from "react";
import useMessages from "./useMessages";

const useEmojiPicker = () => {

    const smileRef = useRef<HTMLDivElement | null>(null);

    const {setOpenEmoji} = useMessages();

    //todo: handle emoji

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('epr-emoji-img')) {
                // handleEmoji();
                return;
            }
        
            if (smileRef.current && !smileRef.current.contains(target)) {
                setOpenEmoji(false);
            }

        } 

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    },[]);

    return {
        smileRef
    }

}

export default useEmojiPicker;