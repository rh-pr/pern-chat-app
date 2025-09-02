import { useEffect, useState } from "react";
import { ChangePasswordRequest } from "../../types/main";
import { resetPassword } from "../../servieces/passwordService";
import { useNavigate } from "react-router-dom";
import useConfirmation from "./useConfirmation";
import useAuthStore from "../../stores/useAuthStore";


const useChangePassword = () => {
    const [formData, setformData] = useState<ChangePasswordRequest>({
        password: '',
        confirm: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false)

    const userId = useAuthStore(state => state.userId);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const body = {
            password: formData.password,
            confirmPassword: formData.confirm,
            userId: userId || ''
        }

        const res = await resetPassword(body);
        if (!res) {
            setErrorMessage('Something went wrong, please try again later');
            setLoading(false);
            return;
        }

        if (res.error) {
            setErrorMessage(res.error);
            setLoading(false);
            return; 
        }
        
        setSuccess(true);
        setLoading(false);
        setErrorMessage('');
        return success
    }

    const handleNavigate = () => {
        navigate('/login');
    }

    useEffect(() => {
        
    },[])

    return {
        success,
        formData,
        loading,
        errorMessage,
        handleChange,
        handleSubmit,
        handleNavigate
    };
}

export default useChangePassword;
