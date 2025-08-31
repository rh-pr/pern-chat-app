import React, { useState } from "react";
import { sendCode } from "../../servieces/passwordService";
import { useNavigate } from "react-router-dom";

const useConfirmation = () => {
    const [formData, setFormData] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const submitOPT = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        const code = formData.join('');

        const data = new FormData();
        data.append('code', code);

        //const res = await sendCode(data);
        setLoading(false);

       // if (res) {
            navigate('/changePassword');
        //}

       // return false;  
    }

    const handleChanges = (val: string, ind: number) => {
        const number = val.replace(/\D/g, '').slice(0,1);
        const newFormData = [...formData];
        newFormData[ind] = number;
        setFormData(newFormData);
    }
    
    return {
        loading, 
        formData,
        handleChanges,
        submitOPT

    }
}

export default useConfirmation;