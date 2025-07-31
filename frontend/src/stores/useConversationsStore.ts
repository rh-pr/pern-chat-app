import { ConversationsState, ConversationsType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationsState>((set) => ({
    conversations: [],
    activeConversation: '',
    currentUserConvList: [],

    updateConversations: (newConversation: ConversationsType) =>
        set((state) => ({ conversations: [...state.conversations, newConversation] })),

    setConversations: (newConversations: ConversationsType[]) =>
        set(() => ({ conversations: newConversations })),

    setActiveConversation: (conversationId: string) => 
        set(() => ({activeConversation: conversationId})),

    setCurrentUserConvList: (convList: string[]) => 
        set(() => ({currentUserConvList: convList})),
}));

export default useConversationStore;