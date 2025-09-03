import { useEffect } from "react";
import useSocketStore from "../stores/useSocketSore";
import useAuthStore from "../stores/useAuthStore";


const useAppInit = () => {

  
    const currentUser = useAuthStore(state => state.currentUser);
    const setExpireAt = useAuthStore(state => state.setExpireAt);

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

    // useEffect(() => {
    //     (async () => {
    //     setLoading(true);
    //     const user = await getCurrentUser();
    //     if (user) {
    //         setCurrentUser(user);
    //     }
    //     setLoading(false);
    //     })();
    // },[]);


        return {
        }
}

export default useAppInit;