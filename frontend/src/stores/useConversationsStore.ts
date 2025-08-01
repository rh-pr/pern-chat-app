import { ConversationsState, ConversationsType } from "../types/main";
import { create } from "zustand";

const useConversationStore = create<ConversationsState>((set) => ({
    conversations: [],
    activeConversationId: '',
    currentUserConvList: [],

    updateConversations: (newConversation: ConversationsType) =>
        set((state) => ({ conversations: [...state.conversations, newConversation] })),

    setConversations: (newConversations: ConversationsType[]) =>
        set(() => ({ conversations: newConversations })),

    setActiveConversation: (conversationId: string) => 
        set(() => ({activeConversationId: conversationId})),

    setCurrentUserConvList: (convList: string[]) => 
        set(() => ({currentUserConvList: convList})),

    updateCurrentUserConvList: (newConversation: string) =>
        set((state) => ({currentUserConvList: [...state.currentUserConvList, newConversation]}))
}));

export default useConversationStore;