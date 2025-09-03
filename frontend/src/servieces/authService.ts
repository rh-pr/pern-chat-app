import api from '../api/axios';

import { LoginFormType } from '../types/main';
import { authValidation } from '../utils/authValidation';

export const getCurrentUser = async () => {
    try {
        const res = await api.get('/auth/profile');
        if (res) {
            return res.data;
        }
        
        return null; 

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by retrieving user:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
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

        return res.data;
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by log in:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
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
        
        return res.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sign up:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}

export const logout = async () => {
    try {
        const res = await api.get('/auth/logout');
        if (res) return true;

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by log out:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return null;
    }
}



