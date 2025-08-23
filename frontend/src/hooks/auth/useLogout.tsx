import useAuthStore from "../../stores/useAuthStore";

export const useLogout = () => {
    const setCurrentUser = useAuthStore(state => state.setCurrentUser);
    
    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    }
    return {
        handleLogout
    }
}