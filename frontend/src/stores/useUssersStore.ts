import { create } from 'zustand';
import { UsersState, UserType } from '../types/main';

const useUsersStore = create<UsersState>((set,get) => ({
    users: [],
    openUserList: false,

    setUsers: (newUsers: UserType[]) => 
        set(() => ({ users: newUsers})),

    updateUsers: (newUser: UserType) => 
        set((state) => ({ users: [...state.users, newUser]})),

    toggleOpenList: () => 
        set(() => ({openUserList: !get().openUserList}))

}))

export default useUsersStore;