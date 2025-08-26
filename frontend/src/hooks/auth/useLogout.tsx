import { logout } from "../../servieces/authService";
import useAuthStore from "../../stores/useAuthStore";

export const useLogout = () => {
    const setCurrentUser = useAuthStore(state => state.setCurrentUser);
    
    const handleLogout = () => {
        setCurrentUser(null);
        return logout();
    }
    return {
        handleLogout
    }
}