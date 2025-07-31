import useUsersStore from "../../stores/useUssersStore";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { getUsers } from "../../servieces/usersService";
import useConversationsStore from "../../stores/useConversationsStore";

const useUsers = () => {
    const users = useUsersStore((state) => state.users);
    const openUserList = useUsersStore((state) => state.openUserList)
    const setUsers = useUsersStore((state) => state.setUsers);
    // const updateUsers = useUsersStore((state) => state.updateUsers);
    const toggleOpenList = useUsersStore((state) => state.toggleOpenList);

    const currentUser = useAuthStore(state => state.currentUser);
    const currentUserConvList = useConversationsStore((state) => state.currentUserConvList);
    const conversation = useConversationsStore((state) => state.conversations);

   
    const filteredUser = (query: string) => {
        if ( openUserList ) {
            return  users.filter((user) =>
                user.fullName.toLowerCase().includes(query.toLowerCase())
              );
        }
        return [];
    }

    useEffect(() => {
        const fetchUser = async () => {
            // const data = await getUsers(currentUserId, conversations);
            // setUsers(data);
            if (!currentUser || !currentUser.id) return;
            const data = await getUsers(currentUser.id, currentUserConvList || []);
            
            if (data) {
                setUsers(data);
            }
        }
        fetchUser();
    },[currentUser, conversation]);

    return {
        users,
        openUserList,
        toggleOpenList,
        filteredUser
    }
}

export default useUsers;