import { create } from 'zustand';
import { AuthState, UserType } from '../types/main';

const useAuthStore = create<AuthState>((set) => ({
    currentUser: null,
    expireAt: null,
    userId: null,
    setUserId: (id: string | null) => set({ userId: id }),
    setExpireAt: (time: Date | null) => {
        set({ expireAt: time });
        if (time) {
            localStorage.setItem('expireAt', time.toISOString());
        } else {
            localStorage.removeItem('expireAt');
        }
    },
    setCurrentUser: (user: UserType | null) => set({ currentUser: user }),

}))

export default useAuthStore;