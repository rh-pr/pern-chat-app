import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { UpdatadUserDataType, UserType } from "../../types/main";
import { updateCurrentUser } from "../../servieces/authService";

const useUserProfile = () => {
     const currentUser = useAuthStore(state => state.currentUser);
    const setCurrentUser = useAuthStore(state => state.setCurrentUser);
    const navigate = useNavigate();


    const [user, setUser] = useState<UpdatadUserDataType | null>(currentUser ?? null);
    const [imageUrl, setImageUrl] = useState<string>(currentUser?.profilePic || '');
    const [isChanges, setIsChannges] = useState<boolean>(false);
    
    
    useEffect(()=> {
      if(currentUser ) { 
        setUser(currentUser);
      }
    },[currentUser]);

    if (!currentUser) return null;

    const handleData = async (field: keyof UserType, newData: string | File) => {
      if(typeof newData === 'string' && newData.trim().length < 0) return;
      setUser(prev => (prev ? { ...prev, [field]: newData } : prev));
      setIsChannges(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImageUrl(URL.createObjectURL(file));
      handleData("profilePic", file);
    };

    const handleUpdate = async () => {
      if (user) {
        const res = await updateCurrentUser(user);
        setCurrentUser(res);
        setIsChannges(false);
        navigate('/profile')
      }
    }

    return {
        user,
        imageUrl,
        isChanges,
        handleImageChange,
        handleUpdate, 
        handleData,
    }
}

export default useUserProfile;