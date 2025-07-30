import useUsersStore from "../../stores/useUssersStore";
import {users as usersList} from '../../dummy/dummy.json';
import { useEffect } from "react";

const useUsers = () => {
    const users = useUsersStore((state) => state.users);
    const openUserList = useUsersStore((state) => state.openUserList)
    const setUsers = useUsersStore((state) => state.setUsers);
    // const updateUsers = useUsersStore((state) => state.updateUsers);
    const toggleOpenList = useUsersStore((state) => state.toggleOpenList);


    const getUsers = () => {
        setUsers(usersList);
    }

    const filteredUser = (query: string) => {
        if ( openUserList ) {
            return  users.filter((user) =>
                user.fullName.toLowerCase().includes(query.toLowerCase())
              );
        }
        return [];
    }

    useEffect(() => {
        getUsers();
    },[]);

    return {
        users,
        openUserList,
        toggleOpenList,
        filteredUser
    }
}

export default useUsers;