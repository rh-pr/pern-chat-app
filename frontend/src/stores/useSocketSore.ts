import {create} from "zustand";
import {io, Socket} from "socket.io-client";

interface SocketStore {
    socket: Socket | null;
    onlineUsers: string[],
    connect: (userId: string) => void;
    disconnect: () => void;
}

//todo: change for production version
const socketURL = import.meta.env.NODE_MODE === "development" ? "http://localhost:5000" : "/";
// const socketURL = import.meta.env.VITE_NODE_MODE === "development" ? "http://localhost:5000" : "/";

console.log('soscket', import.meta.env.VITE_NODE_MODE);

const useSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    onlineUsers: [],
    connect: (userId) => {
        if(get().socket) return;
        
        const socket = io(socketURL, {
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