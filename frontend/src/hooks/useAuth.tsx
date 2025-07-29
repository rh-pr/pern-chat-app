import { useEffect, useState } from "react";
import useAuthStore from "../stores/useAuthStore";
// import axios from 'axios';
import { currentUser as user } from '../dummy/dummy.json';

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const setCurrentUser = useAuthStore(state => state.setCurrentUser);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                //change later
                // const res = await axios.get('/auth/profile');
                // setCurrentUser(res.data.username);

                // setCurrentUser(user);
                setCurrentUser(null)
            } catch {
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { loading };
}

export default useAuth;