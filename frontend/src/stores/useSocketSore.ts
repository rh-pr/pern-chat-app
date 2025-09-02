import {create} from "zustand";
import {io, Socket} from "socket.io-client";

interface SocketStore {
    socket: Socket | null;
    onlineUsers: string[],
    connect: (userId: string) => void;
    disconnect: () => void;
}

const useSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    onlineUsers: [],
    connect: (userId) => {
        if(get().socket) return;
        
        const socket = io(import.meta.env.VITE_BASE_URL, {
            query: {userId},
        });

        socket.on("getOnlineUsers", (users: string[]) => {
            set({onlineUsers: users});
        });

        set({ socket });
    },
    disconnect: () => {
        set((state) => {
            state.socket?.disconnect();
            return { socket: null, onlineUsers: []}
        })
    }
}));

export default useSocketStore;