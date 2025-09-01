import React, { useState, useEffect } from "react";
import { sendCode } from "../../servieces/passwordService";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const useConfirmation = () => {
    const [formData, setFormData] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [minutes, setMinutes] = useState<number>(5);
    const [seconds, setSeconds] = useState<number>(0);

    const expireAt = useAuthStore(state => state.expireAt);
    const setExpireAt = useAuthStore(state => state.setExpireAt);

    const navigate = useNavigate();
    
     useEffect(() => {
        
        if (!expireAt) return;
        
        const interval = setInterval(() => {
            const diff = Number(expireAt) - Date.now();
            
            if(diff <= 0) {
                clearInterval(interval);
                setMinutes(0);
                setSeconds(0);
            } else {
                setMinutes(Math.floor(diff / 1000 / 60));
                setSeconds(Math.floor((diff / 1000) % 60 ));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [expireAt]);



    const submitOPT = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        const code = formData.join('');

        const data = new FormData();
        data.append('code', code);

        const res = await sendCode(data);

       if (res) {
            navigate('/changePassword');
            setLoading(false);
            setExpireAt(null);
            return true;
        }

        setLoading(false);
        return false;  
    }

    const handleChanges = (val: string, ind: number) => {
        const number = val.replace(/\D/g, '').slice(0,1);
        const newFormData = [...formData];
        newFormData[ind] = number;
        setFormData(newFormData);
    }
    
    return {
        minutes, 
        seconds,
        loading, 
        formData,
        handleChanges,
        submitOPT

    }
}

export default useConfirmation;