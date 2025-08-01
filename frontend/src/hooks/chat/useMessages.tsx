import { useCallback, useEffect } from "react";
import { useFilesSrore} from '../../stores/useConversationStore';

import useMessagesStore from "../../stores/useMessagesStore";
import useConversationStore from "../../stores/useConversationsStore";
import { getMessages } from '../../servieces/messagesService';

const useConversation = () => {
    const messages = useMessagesStore((state) => state.messages);
    const setMessages = useMessagesStore((state) => state.setMessages);
    const updateMessages = useMessagesStore((state) => state.updateMessages);
    
    const files = useMessagesStore((state) => state.files);
    const updateFiles = useFilesSrore((state) => state.updateFiles);
    const filteredFiles = useFilesSrore((state) => state.filteredFile);
    const deletedFiles = useFilesSrore((state) => state.deleteFiles);

    const images = useMessagesStore((state) => state.images);
    const updateImages = useFilesSrore((state) => state.updateImages);
    const filteredImages = useFilesSrore((state) => state.filteredImages);
    const deletedImages = useFilesSrore((state) => state.deleteImages);

    const activeConversationId = useConversationStore((state) => state.activeConversationId);

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
        const fetchMessages  = async () => { 
            if (!activeConversationId) return;

            const data = await getMessages(activeConversationId);
            if(data) {
                setMessages(data);
            }
        }
        fetchMessages ();

    }, [activeConversationId]);

    return {
        messages,
        updateMessages,
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
