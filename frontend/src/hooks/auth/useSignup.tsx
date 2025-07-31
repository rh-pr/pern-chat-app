import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultsignUp } from "../../dummy/defaultValues";
import { SignupFormType } from "../../types/main";
import { signup } from "../../servieces/authService";
import useAuthStore from "../../stores/useAuthStore";

export const useSignupForm = () => {
        const [isFile, setIsFile] = useState(false);
        const [ imgFile, setImgFile ] = useState<File | null>(null);

        const [formData, setFormData] = useState<SignupFormType>(defaultsignUp);
        const [msgError, setMsgError] = useState<string>('');

        const navigate = useNavigate();
        const setCurrentUser = useAuthStore(state => state.setCurrentUser);


        const handleSignupForm = async (e: React.FormEvent) => {
            e.preventDefault();

            if (formData.password !== formData.confirm) {
                setMsgError('Passwords musst be the same! ')
                return;
            }

            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if(key !== 'confirm') {
                    data.append(key, value);
                }             
            })
           
            setMsgError('');

            const user = await signup(data);
            
            if (user) {
                setFormData(defaultsignUp);
                setCurrentUser(user);
                navigate('/');
            } else {
                setMsgError(user.message);
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
                setImgFile(files[0]);
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                }));
            }
        };


        const deleteFile = () => {
            setIsFile(false);
            setFormData(prev => ({...prev, photo: ''}));
        }

        return {
            imgFile,
            isFile,
            formData,
            msgError,
            handleSignupForm,
            handleChanges,
            deleteFile
        };
}