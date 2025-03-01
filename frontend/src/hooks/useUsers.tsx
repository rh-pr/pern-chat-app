import useUsersStore from "../stores/useUssersStore";
import { conversationa } from '../dummy/dummyData';
import { useEffect, useState } from "react";

const useUsers = () => {
    const users = useUsersStore((state) => state.users);
    const openUserList = useUsersStore((state) => state.openUserList)
    const setUsers = useUsersStore((state) => state.setUsers);
    const updateUsers = useUsersStore((state) => state.updateUsers);
    const toggleOpenList = useUsersStore((state) => state.toggleOpenList);


    const getUsers = () => {
        setUsers(conversationa.sort());
    }

    useEffect(() => {
        getUsers();
    },[]);

    return {
        users,
        openUserList,
        toggleOpenList,
    }
}

export default useUsers;