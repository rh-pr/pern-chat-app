import { useEffect } from "react";
import useConversationStore from '../stores/useConversationStore';

import { DUMMY_MESSAGES } from "../dummy/dummyData";


const useConversation = () => {
    const conversation = useConversationStore((state) => state.conversation);
    const setConversation = useConversationStore((state) => state.setConversation);
    const updateConversation = useConversationStore((state) => state.updateConversation);

    const files = useConversationStore((state) => state.files);
    const images = useConversationStore((state) => state.images);

    const updateFiles = useConversationStore((state) => state.updateFiles);
    const filteredFiles = useConversationStore((state) => state.filteredFile);
    const deletedFiles = useConversationStore((state) => state.deleteFiles);

    const updateImages = useConversationStore((state) => state.updateImages);
    const filteredImages = useConversationStore((state) => state.filteredImages);
    const deletedImages = useConversationStore((state) => state.deleteImages);


    const getConversation = () => {
        setConversation(DUMMY_MESSAGES); 
    };

    const sendMsg = (msg: string) => {
        const newMsg = {
            id: 111,
            fromMe: true,
            body: msg,
        }
        updateConversation(newMsg);
    }

    useEffect(() => {
        getConversation();
    }, []);

    return {
        conversation, 
        getConversation,
        sendMsg,
        files,
        images,
        updateFiles,
        filteredFiles,
        deletedFiles,
        updateImages,
        filteredImages,
        deletedImages
    };
};

export default useConversation;
