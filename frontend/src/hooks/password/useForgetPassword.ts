import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../servieces/passwordService";
import useAuthStore from "../../stores/useAuthStore";

const useForgetPassword = () => {
    const navigate =  useNavigate();
    
    const [formData, setFormData] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);
    
    const setExpireAt = useAuthStore(state => state.setExpireAt);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
    }


    const submitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('email', formData);

        const res = await sendEmail(data);
    
        if (!res) {
            setErrorMessage('User with this email not found');
            setLoading(false);
            return false
        } 
        setExpireAt(new Date (Date.now() + 5 * 60 * 1000));
        navigate('/confirmation', {state: {email: formData}});
        setLoading(false); 
        return true;
    }

    return {
        loading,
        errorMessage,
        formData,
        handleChanges,
        submitEmail
    }
}

export default useForgetPassword;