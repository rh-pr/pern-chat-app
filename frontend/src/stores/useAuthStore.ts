import { create } from 'zustand';
import { AuthState } from '../types/main';

const useAuthStore = create<AuthState>((set) => ({
    currentUser: null,
    expireAt: null,
    // setExpireAt: (time: Date | null) => set({ expireAt: time }),
    setExpireAt: (time: Date | null) => {
        set({ expireAt: time });
        if (time) {
            localStorage.setItem('expireAt', time.toISOString());
        } else {
            localStorage.removeItem('expireAt');
        }
    },
    setCurrentUser: (user) => set({ currentUser: user }),

}))

export default useAuthStore;