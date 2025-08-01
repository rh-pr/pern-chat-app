import { useCallback, useEffect, useRef } from "react";

import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import { getMessages, sendMessage } from '../../servieces/messagesService';
import useAuthStore from "../../stores/useAuthStore";

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
    const currentUser = useAuthStore((state) => state.currentUser);


	const endConversation = useRef<HTMLParagraphElement | null>(null);



    const removeFile = useCallback((fileName: string, type: string) => {
      if (type === 'files') {
        filteredFiles(fileName);
       } else {
          filteredImages(fileName);
       }
    },[filteredFiles, filteredImages])

    const send = useCallback( async (msg: string, files: File[] | null, images: File[] | null) => {
    //    if (!currentUser || !files || !images || files?.length <= 0 || images?.length <= 0) return;
        if (!currentUser ) return;

        const newMsg = {
            id: '',
            body: msg,
            senderId: currentUser.id,
            conversationId: activeConversationId,
            files: files || [],
            images: images || [],

            createdAt: '',
        }

        const res = await sendMessage(newMsg);
        console.log('res', res)

        if (res) {
            updateMessages(newMsg);
            deletedFiles();
            deletedImages();
        }
       
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
        send,
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
