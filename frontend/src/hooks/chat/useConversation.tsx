import { useCallback, useEffect } from "react";
import {useConversationStore, useFilesSrore} from '../../stores/useConversationStore';

import { DUMMY_MESSAGES } from "../../dummy/dummyData";


const useConversation = () => {
    const conversation = useConversationStore((state) => state.conversation);
    const setConversation = useConversationStore((state) => state.setConversation);
    const updateConversation = useConversationStore((state) => state.updateConversation);

    
    const files = useFilesSrore((state) => state.files);
    const images = useFilesSrore((state) => state.images);

    const updateFiles = useFilesSrore((state) => state.updateFiles);
    const filteredFiles = useFilesSrore((state) => state.filteredFile);
    const deletedFiles = useFilesSrore((state) => state.deleteFiles);

    const updateImages = useFilesSrore((state) => state.updateImages);
    const filteredImages = useFilesSrore((state) => state.filteredImages);
    const deletedImages = useFilesSrore((state) => state.deleteImages);


    const getConversation = () => {
        // const dum = DUMMY_MESSAGES.filter((msg => msg.fromMe === false))
        setConversation(DUMMY_MESSAGES); 
        // setConversation(dum); 
    };

    const removeFile = useCallback((fileName: string, type: string) => {
      if (type === 'files') {
        filteredFiles(fileName);
       } else {
          filteredImages(fileName);
       }
    },[filteredFiles, filteredImages])

    const sendMsg = useCallback( (msg: string, files: File[] | null, images: File[] | null, updateConversation?: any) => {
        const newMsg = {
            id: 111,
            fromMe: true,
            body: msg,
            files: files,
            images: images
        }
        updateConversation(newMsg);
        deletedFiles();
        deletedImages();
    },[updateConversation]);

    useEffect(() => {
        getConversation();
    }, []);

    return {
        conversation, 
        getConversation,
        updateConversation,
        sendMsg,
        files,
        images,
        updateFiles,
        filteredFiles,
        deletedFiles,
        updateImages,
        filteredImages,
        deletedImages,
        removeFile,
    };
};

export default useConversation;
