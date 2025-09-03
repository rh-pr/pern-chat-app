import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { login } from "../../servieces/authService";

import { LoginFormType } from "../../types/main";

export const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormType>({
        username: '',
        password: ''
       });
    const [loading, setLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const setCurrentUser = useAuthStore(state => state.setCurrentUser);

    const handleLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = await login(formData);

        if (user) {
            setFormData({
                username: '',
                password: ''
            }); 
            setIsError(false);
            setLoading(false);
            setCurrentUser(user);
        } else {
            setIsError(true);
            setLoading(false);
        }
    }

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: LoginFormType) => ({
            ...prev,
            [name]: value
        }));
    }

    return {
        loading,
        formData,
        isError,
        handleChanges,
        handleLoginForm,
    };
}