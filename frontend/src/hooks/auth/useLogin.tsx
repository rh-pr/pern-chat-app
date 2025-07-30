import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { login } from "../../servieces/authService";

import { LoginFormType } from "../../types/main";

export const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormType>({
        username: '',
        password: ''
       });

       const [isError, setIsError] = useState<boolean>(false);

       const setCurrentUser = useAuthStore(state => state.setCurrentUser);

       const handleLoginForm = async (e: React.FormEvent) => {
            e.preventDefault();
            const user = await login(formData);

            if (user) {
                setFormData({
                    username: '',
                    password: ''
                }); 
                setIsError(false);
                setCurrentUser(user);
            } else {
                setIsError(true);
            }
       }

       const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
       }

         return {
            formData,
            isError,
            handleChanges,
            handleLoginForm,
        };
}