import { ConversationsState, ConversationsType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationsState>((set) => ({
    conversations: [],

    updateConversations: (newConversation: ConversationsType) =>
        set((state) => ({ conversations: [...state.conversations, newConversation] })),

    setConversations: (newConversations: ConversationsType[]) =>
        set(() => ({ conversations: newConversations }))
}));

export default useConversationStore;