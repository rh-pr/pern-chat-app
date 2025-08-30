import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForgetPassword = () => {
    const navigate =  useNavigate();
    
    const [formData, setFormData] = useState<string>('');


    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
    }

    //todo: add request to server
    const submitEmail = () => {
        
        navigate('/confirmation');
    }

    return {
        formData,
        handleChanges,
        submitEmail
    }
}

export default useForgetPassword;