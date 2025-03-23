import { ConversationState, MessageType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationState>((set) => ({
    conversation: [],
    files: [],
    images: [],
    
    updateConversation: (newMessage: MessageType) =>
        set((state) => ({ conversation: [...state.conversation, newMessage] })),

    setConversation: (newConversation: MessageType[]) =>
        set(() => ({ conversation: newConversation })),

    // setFiles: (newFiles: File[]) =>
    //     set(()=> ({files: newFiles})),

    updateFiles: (newFile: File) => 
        set((state) => {
            const fileExists = state.files.some(file => file.name === newFile.name);
           return {
              files: fileExists ? state.files : [...state.files, newFile],
            };
        }),
    filteredFile: (fileName: string) =>
        set((state) => ({files: state.files.filter(file => file.name !== fileName)})),

    deleteFiles: () =>
        set(() => ({files: []})),

    // setImages: (newImages: File[]) =>
    //     set(() => ({images: newImages})),

    updateImages: (newImage: File) => 
        set((state) => {
            const imageExists = state.images.some(img => img.name === newImage.name);
           return {
              files: imageExists ? state.images : [...state.images, newImage],
            };
        }),
    filteredImages: (imageName: string) => 
        set((state) => ({ images: state.images.filter(image => image.name !== imageName) })),
    
    deleteImages: () =>
        set(() => ({images: []})),
    
}));

export default useConversationStore;