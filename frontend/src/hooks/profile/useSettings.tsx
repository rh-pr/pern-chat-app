import {ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { resetPassword, sendCode, sendEmail } from "../../servieces/passwordService";
import { UserType } from "../../types/main";
type PassDataType = {
    password: string,
    confirm: string,
}

const useSettings = () => {

const navigate = useNavigate();

  const currentUser = useAuthStore(state => state.currentUser);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [succesMessage, setSuccessMessage] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<string>('');

  const [code, setCode] = useState<string>('')


  const [passData, setPassData] = useState<PassDataType>({
    password: '',
    confirm: ''
  });


   const handleData = async (field: keyof UserType, newData: string | File) => {
      if(typeof newData === 'string' && newData.trim().length < 0) return;
        setPassData(prev => (prev ? { ...prev, [field]: newData } : prev));
        setIsChanged(true);
    };

  const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCode(e.target.value);
  }


    const handleSubmit = async () => {
      
       if(passData.password.trim().length < 6 || 
          passData.confirm.trim().length < 6 ||
          passData.confirm !== passData.password) {
          setErrorMessage('Check the entered data!');
          setSuccessMessage('');
          setInfoMessage('');
          return;
      }

      const codeData = await sendEmail(currentUser?.email || '');
            
        if (!codeData || !codeData?.data?.expireAt) {
            setErrorMessage('User with this email not found');
            return false
        } else {
            setIsChanged(false);
            setErrorMessage('');
            setInfoMessage('A verification code has been sent to your email. Please confirm your password change.')
        }

        

    }

    const handleReset = async () => {
      if (!currentUser?.id) return;

     const body = {
        code: code,
        userId: currentUser?.id
      }

      const res = await  sendCode(body);
      
      if (!res) {
        setErrorMessage('Internal server error, please try again later');
        return false;  
      }

        if (res?.error) {
            setErrorMessage(res.error);
            return false;  
        }

         const resetBody = {
            password: passData.password,
            confirmPassword: passData.confirm,
            userId: currentUser?.id || ''
        }
        
      const reset = await resetPassword(resetBody);

      if (!reset) {
          setErrorMessage('Something went wrong, please try again later');
          return;
      }

      setIsChanged(false);
      setInfoMessage('');
      setSuccessMessage('Your password changed successfully')
      navigate('/profile');
      return true;
    }

  
    useEffect(() => {
        if(!passData.password.trim() && !passData.confirm.trim()) {
            setIsChanged(false);
        }
    },[passData]);

    return {
        isChanged,
        errorMessage,
        infoMessage,
        succesMessage,
        handleCode,
        handleData,
        handleSubmit,
        handleReset
    }
}

export default useSettings;