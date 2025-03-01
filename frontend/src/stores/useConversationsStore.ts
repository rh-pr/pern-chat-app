import { ConversationsState, ConversationsType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationsState>((set, get) => ({
    conversations: [],

    updateConversations: (newConversation: ConversationsType) =>
        set((state) => ({ conversations: [...state.conversations, newConversation] })),

    setConversations: (newConversation: ConversationsType[]) =>
        set(() => ({ conversations: newConversation }))
}));

export default useConversationStore;