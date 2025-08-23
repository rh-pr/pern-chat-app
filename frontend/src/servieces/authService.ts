import api from '../api/axios';

import { currentUser as user } from '../dummy/dummy.json';

import { LoginFormType } from '../types/main';
import { authValidation } from '../utils/authValidation';
import { updateLocalUser } from '../utils/localStorage';


//todo: add serverRequest
export const getCurrentUser = async () => {
    try {
        const stored = localStorage.getItem('user');

        if (stored) {
            return JSON.parse(stored);
        } else {
            // const res = await api.get('/profile');
            //if (res) {
             // localStorage.setItem('user', JSON.stringify(res.data))
             // return res.data;
            //}
           
            // return user;
            return null;
        }  

    } catch (err) {
        console.error('Error by retrieving user: ', err);
        return null;
    }
}

//todo: add server request
export const login = async (formData: LoginFormType) => {
    try {
        if (!formData?.username?.trim() || (formData.password?.trim().length ?? 0) < 3) {
            throw new Error('Invalid data...');
        }
        // const res = await api.get('/login', {
        //     params: formData
        // });

        const res = {
            data: user
        }

        updateLocalUser(res.data);

        return res.data;
        
    } catch (err) {
        console.error('Error by login: ', err);
        return null;
    }
}

//todo: delete console
export const signup = async (formData: FormData) => {
    try {
        
        if (!authValidation(formData)) {
            throw new Error('Invalid data...');
        }
        
        const res = await api.post('/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        updateLocalUser(res.data);
        
        return res.data;
    } catch (err) {
         console.error('Error by signup: ', err);
        return null;
    }
}



