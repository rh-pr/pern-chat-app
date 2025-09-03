import useUsersStore from "../../stores/useUsersStore";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { getUsers } from "../../servieces/usersService";
import useConversations from "./useConversations";
import useConversationsStore from "../../stores/useConversationsStore";
import { UserType } from "../../types/main";


const useUsers = () => {
    const users = useUsersStore((state) => state.users);
    const openUserList = useUsersStore((state) => state.openUserList)
    const setUsers = useUsersStore((state) => state.setUsers);
    const toggleOpenList = useUsersStore((state) => state.toggleOpenList);
    const conversations = useConversationsStore((state) => state.conversations);


    const currentUser = useAuthStore(state => state.currentUser);

    const { addConversation } = useConversations();
   
    const filteredUser = (query: string) => {
        if ( openUserList ) {
            return  users.filter((user: UserType) =>
                user.fullName.toLowerCase().includes(query.toLowerCase())
              );
        }
        return [];
    }

    const chooseUser  = async (userId: string) => {
        const res = await addConversation(userId);
       
        if (res) {
            const filteredUsers = users.filter((user: UserType) => user.id !== userId);
            setUsers(filteredUsers);
            toggleOpenList();
        }
    }

   useEffect(() => {
    
    const fetchUser = async () => {
        
        if (!currentUser || !currentUser.id) return;
        try {
            const data = await getUsers(currentUser.id);
            
            if (data && data.length > 0 ) {  
                setUsers(data);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Error by retrieving users:", err.message);
            } else {
                console.error("Unknown error:", err);
            }
        }
    };

    fetchUser();
}, [conversations]);




    return {
        users,
        openUserList,
        toggleOpenList,
        filteredUser,
        chooseUser 
    }
}

export default useUsers;