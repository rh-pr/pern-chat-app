import { useCallback, useEffect, useRef } from "react";

import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import { getMessages } from '../../servieces/messagesService';

const useConversation = () => {
    const messages = useMessagesStore((state) => state.messages);
    const setMessages = useMessagesStore((state) => state.setMessages);
    const updateMessages = useMessagesStore((state) => state.updateMessages);
    
    const files = useMessagesStore((state) => state.files);
    const updateFiles = useMessagesStore((state) => state.updateFiles);
    const filteredFiles = useMessagesStore((state) => state.filteredFile);
    const deletedFiles = useMessagesStore((state) => state.deleteFiles);

    const images = useMessagesStore((state) => state.images);
    const updateImages = useMessagesStore((state) => state.updateImages);
    const filteredImages = useMessagesStore((state) => state.filteredImages);
    const deletedImages = useMessagesStore((state) => state.deleteImages);

    const activeConversationId = useConversationsStore((state) => state.activeConversationId);

	const endConversation = useRef<HTMLParagraphElement | null>(null);


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
    },[]);

    // const handleKey = (
    //     e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         if (msgText.trim()) {
    //             sendMsg(msgText, files, images, updateConversation);
    //             setMsgText('');
                
    //         }
    //     }
    // }


    useEffect(() => {
        const fetchMessages  = async () => { 
            if (!activeConversationId) return;

            const data = await getMessages(activeConversationId);

            // if(data && messages?.length === 0) {
                setMessages(data);
            // }
        }
        fetchMessages ();

    }, [activeConversationId]);

    useEffect(() => {
        if(endConversation.current) {
            endConversation.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
	}, [messages])

    return {
        endConversation,
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
