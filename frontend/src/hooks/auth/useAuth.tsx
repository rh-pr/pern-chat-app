import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { getCurrentUser } from "../../servieces/authService";

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const setCurrentUser = useAuthStore(state => state.setCurrentUser);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
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