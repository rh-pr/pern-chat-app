import { create } from 'zustand';
import { AuthState } from '../types/main';

const useAuthStore = create<AuthState>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),

}))

export default useAuthStore;