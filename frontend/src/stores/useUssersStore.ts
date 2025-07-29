import { create } from 'zustand';
import { UsersState, UserType } from '../types/main';

const useUsersStore = create<UsersState>((set,get) => ({
    users: [],
    openUserList: false,
    currentUser: null,

    setUsers: (newUsers: UserType[]) => 
        set(() => ({ users: newUsers})),

    updateUsers: (newUser: UserType) => 
        set((state) => ({ users: [...state.users, newUser]})),

    toggleOpenList: () => 
        set(() => ({openUserList: !get().openUserList})),
    getCurrentUser: () => get().currentUser,
    // setCurrentUser: (user) => set({ currentUser: user }),

}))

export default useUsersStore;