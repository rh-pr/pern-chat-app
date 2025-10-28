import { useCallback, useRef, useState } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useConversationsStore from "../../stores/useConversationsStore";
import {  sendMessage } from '../../servieces/messagesService';
import useAuthStore from "../../stores/useAuthStore";
import { EmojiClickData } from 'emoji-picker-react'

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
    const [loading, setLoading] = useState<boolean>(false);
    const [activateVoiceMsg, setActivateVoiceMsg] = useState<boolean>(false);
    

    const removeFile = useCallback((fileName: string, type: string) => {
      if (type === 'files') {
        filteredFiles(fileName);
       } else {
          filteredImages(fileName);
       }
    },[filteredFiles, filteredImages])

    const send = useCallback( async (msg: string, files: File[] | null, images: File[] | null, stopRecord?:() => Promise<File | null>) => {
       if (!currentUser ) return;
        let audioFile: File[] | [] = [];

        setLoading(true)

        const formData = new FormData();

        if (stopRecord) {
            const data = await stopRecord();
            audioFile = data ? [data] : []
        }

    
        const newMsg = {
            id: '',
            body: msg,
            senderId: currentUser.id,
            conversationId: activeConversationId,
            files: files || [],
            images: images || [],
            audios: audioFile,
            createdAt: '',
        }

        formData.append("body", msg);
        formData.append("senderId", currentUser.id);
        formData.append("conversationId", activeConversationId);

        if (images?.length) {
            images.forEach((img: File) => {
                formData.append('foto', img)
            });
        }

        if (files?.length) {
            files.forEach((file: File) => {
                formData.append('file', file);
            })
        }

         if (audioFile?.length) {
            audioFile.forEach((audio: File) => {
                formData.append('audio', audio);
            });
        }
        

        const res = await sendMessage(formData);

        if (res) {
            setLoading(false)
            updateMessages(newMsg);
            deletedFiles();
            deletedImages();
        }
       
    },[activeConversationId]);

    const handleMsgText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value)
    }, []);

    const handleEmoji = useCallback( (e: EmojiClickData) => {
        setMsgText((prevText: string) => prevText + e.emoji);

        if( textAreaRef.current ) {
            textAreaRef.current.focus();
        } 

        setOpenEmoji(false);
    }, []);

    const handleForm = (e:React.FormEvent, stopRecord?: () => Promise<File | null>) => {
        e.preventDefault();
        send(msgText, files, images, stopRecord);
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
    
    const handleImage = (
        e:  React.ChangeEvent<HTMLInputElement>,
        setErrorMessage: (msg: string) => void ) => {
        const selectedImage = e.target.files?.[0];
        if(!selectedImage) return;
        if (selectedImage.type === "image/png" ||
            selectedImage.type === "image/jpg"  || 
            selectedImage.type === "image/jpeg" ||
            selectedImage.type === "image/webp") {
            updateImages(selectedImage);
            setOpenFileMenu(false);
            return;
            }
        setErrorMessage('png, jpg, jpeg, webp');
        setOpenFileMenu(true);
        return;

    }

    const handleFile = (
        e:  React.ChangeEvent<HTMLInputElement>,
        setErrorMessage: (msg: string) => void ) => {
        const selectedFile = e.target.files?.[0];
        if(!selectedFile) return;
        if (selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            selectedFile.type === "application/pdf" ) {
            updateFiles(selectedFile);
            setOpenFileMenu(false);
            return;
            }
        setErrorMessage('doc, pdf');
        setOpenFileMenu(true);
    }
    
    const handleOpenFileMenu = useCallback(() => {
        setOpenFileMenu(true);
      }, []);

    return {
        loading,
        msgText,
        activateVoiceMsg,
        setActivateVoiceMsg,
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
        handleFile,
        handleImage
    };
};

export default useConversation;
