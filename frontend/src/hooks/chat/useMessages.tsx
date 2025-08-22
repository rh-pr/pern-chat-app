import { useCallback, useRef, useState } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import {  sendMessage } from '../../servieces/messagesService';
import useAuthStore from "../../stores/useAuthStore";
import { EmojiClickData } from 'emoji-picker-react'
import { updateLocalConversation } from "../../utils/localStorage";

const useConversation = () => {
    const messages = useMessagesStore((state) => state.messages);
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

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    
    const [msgText, setMsgText] = useState<string>('');
    const [openEmoji, setOpenEmoji] = useState<boolean>(false)
    const [openFileMenu, setOpenFileMenu] = useState<boolean>(false);
    


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

        if (res) {
            updateMessages(newMsg);
            deletedFiles();
            deletedImages();
            updateLocalConversation(activeConversationId, newMsg);
        }
       
    },[]);


    const handleMsgText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value)
    }, []);

    const handleEmoji = useCallback( (e: EmojiClickData) => {
        setMsgText(prevText => prevText + e.emoji);

        if( textAreaRef.current ) {
            textAreaRef.current.focus();
        } 

        setOpenEmoji(false);
    }, []);

    
    const handleForm = (e:React.FormEvent) => {
        e.preventDefault();
        send(msgText, files, images);
        setMsgText('');
    }

    
    const handleKey = (
        e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    
        if (e.key === 'Enter') {
            e.preventDefault();
            if (msgText.trim()) {
                send(msgText, files, images);
                setMsgText('');
                
            }
        }
    }


    const handleOpenFileMenu = useCallback(() => {
        setOpenFileMenu(true);
      }, []);
  

    return {
        msgText,
        setOpenEmoji,
        textAreaRef,
        setOpenFileMenu,
        handleForm,
        handleKey,
        handleOpenFileMenu,
        handleEmoji,
        handleMsgText,
        openFileMenu,
        openEmoji,
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
