import { MessageType, MessagesTypeStore } from "../types/main";
import { create } from "zustand";

const useMessagesStore = create<MessagesTypeStore>((set) => ({
    messages: null,
    files: [],
    images: [],

    updateMessages: (newMessage: MessageType) => 
        set((state) => ({ messages: [...(state.messages || []), newMessage] })),

    setMessages: (newConversation: MessageType[] | null) => 
        set(() => ({ messages: newConversation })),

    updateFiles: (newFile: File) => 
        set((state) => {
            const fileExists = state.files.some(file => file.name === newFile.name);
           return {
              files: fileExists ? state.files : [...state.files, newFile],
            };
        }),
    filteredFile: (fileName: string) =>
        set((state) => ({files: state.files?.filter(file => file.name !== fileName)})),

    deleteFiles: () =>
        set(() => ({files: []})),

    updateImages: (newImage: File) => 
        set((state) => {
            const imageExists = state.images.some(img => img.name === newImage.name);
           return {
              images: imageExists ? state.images : [...state.images, newImage],
            };
        }),
        
    filteredImages: (imageName: string) => 
        set((state) => ({ images: state.images?.filter(image => image.name !== imageName) })),
    
    deleteImages: () =>
        set(() => ({images: []})),
}))

export default useMessagesStore;