import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultsignUp } from "../../constants/defaultValues";
import { SignupFormType } from "../../types/main";
import { signup } from "../../servieces/authService";
import useAuthStore from "../../stores/useAuthStore";

export const useSignupForm = () => {
        const [isFile, setIsFile] = useState(false);

        const [formData, setFormData] = useState<SignupFormType>(defaultsignUp);
        const [msgError, setMsgError] = useState<string>('');

        const [loading, setLoading] = useState(false)

        const navigate = useNavigate();
        const setCurrentUser = useAuthStore(state => state.setCurrentUser);


        const handleSignupForm = async (e: React.FormEvent) => {
            e.preventDefault();

           try {
            setLoading(true);
             if (formData.password !== formData.confirm) {
                setMsgError('Passwords musst be the same! ');
                setLoading(false);
                return;
            }

            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if(key !== 'profilePic') {
                    data.append(key, value as string);
                }
            });
        
            if(formData.profilePic) {
                data.append('profilePic', formData.profilePic)
            }

            setMsgError('');

            const user = await signup(data);
            
            if (user) {
                setFormData(defaultsignUp);
                setCurrentUser(user);
                navigate('/');
            } 

            setLoading(false);

           } catch (err) {
                if (err instanceof Error) {
                    setMsgError(err.message);
                } else {
                    setMsgError('An unknown error occurred.');
                }
                setLoading(false);
           }
        }

        const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files, type } = e.target;

            if (type === 'file' && files && files[0]) {
                setFormData(prev => ({
                    ...prev,
                    [name]: files[0], 
                }));
                setIsFile(true);
                // setImgFile(files[0]);
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                }));
            }
        };


        const deleteFile = () => {
            setIsFile(false);
            setFormData(prev => ({...prev, profilePic: ''}));
        }

        return {
            loading,
            isFile,
            formData,
            msgError,
            handleSignupForm,
            handleChanges,
            deleteFile
        };
}