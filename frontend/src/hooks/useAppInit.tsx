import { useEffect, useState } from "react";
import useSocketStore from "../stores/useSocketSore";
import useAuthStore from "../stores/useAuthStore";
import { getCurrentUser } from "../servieces/authService";
import { getUnreadedMessages } from "../servieces/messagesService";
import { filteredUnreadedMsg } from "../utils/msgHandlers";
import useMessagesStore from "../stores/useMessagesStore";

const useAppInit = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const currentUser = useAuthStore(state => state.currentUser);
    const setCurrentUser = useAuthStore(state => state.setCurrentUser);
    const setExpireAt = useAuthStore(state => state.setExpireAt);
    const setUnreadedMsgs = useMessagesStore((state) => state.setUnreadedMsgs);

    const { connect, disconnect } = useSocketStore();

    useEffect(() => {
        const savedExpireAt = localStorage.getItem('expireAt');
        if (savedExpireAt) {
            setExpireAt(new Date(savedExpireAt));
        }
    }, [setExpireAt]); 

    useEffect(() => {

        if (currentUser) {
        connect(currentUser.id);
        return () => disconnect();
        
        }
    },[currentUser, connect, disconnect])

    useEffect(() => {
        (async () => {
        setLoading(true);
        const user = await getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setLoading(false);
        })();
    },[]);

    useEffect(() => {
        async function fetchUnreadedMessages (currentUserId: string | undefined) {
            if (!currentUserId) return;

            const data = await getUnreadedMessages(currentUserId);
            
            if (!data) return;

            const filteredMessages = filteredUnreadedMsg(data, currentUser, '-1');
            setUnreadedMsgs(filteredMessages);
            
        }

        fetchUnreadedMessages(currentUser?.id)
    },[currentUser])


        return {
            loading
        }
}

export default useAppInit;