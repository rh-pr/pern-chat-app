import { ConversationState, MessageType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationState>((set) => ({
    conversation: [],
    
    updateConversation: (newMessage: MessageType) =>
        set((state) => ({ conversation: [...state.conversation, newMessage] })),

    setConversation: (newConversation: MessageType[]) =>
        set(() => ({ conversation: newConversation })),
}));

export default useConversationStore;