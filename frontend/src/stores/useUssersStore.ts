import { create } from 'zustand';
import { UsersState, User } from '../types/main';

const useUsersStore = create<UsersState>((set,get) => ({
    users: [],
    openUserList: false,

    setUsers: (newUsers: User[]) => 
        set(() => ({ users: newUsers})),

    updateUsers: (newUser: User) => 
        set((state) => ({ users: [...state.users, newUser]})),

    toggleOpenList: () => 
        set(() => ({openUserList: !get().openUserList})),

}))

export default useUsersStore;