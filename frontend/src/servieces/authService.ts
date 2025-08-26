import api from '../api/axios';

import { currentUser as user } from '../dummy/dummy.json';

import { LoginFormType } from '../types/main';
import { authValidation } from '../utils/authValidation';
// import { updateLocalUser } from '../utils/localStorage';


//todo: add serverRequest
export const getCurrentUser = async () => {
    try {
        const res = await api.get('/auth/profile');
        if (res) {
            return res.data;
        }
        
        return null; 

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
        
        const res = await api.post('/auth/login', formData);

        // updateLocalUser(res.data);

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
        
        const res = await api.post('/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // updateLocalUser(res.data);
        
        return res.data;
    } catch (err) {
         console.error('Error by signup: ', err);
        return null;
    }
}

export const logout = async () => {
    try {
        const res = await api.get('/auth/logout');
        if (res) return true;

    } catch (err) {
        console.error('Error by logout: ', err);
        return null;
    }
}



