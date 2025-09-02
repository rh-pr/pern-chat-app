import api from "../api/axios";
import { codeType, resetPasswordType } from "../types/main";

export const resetPassword = async (body: resetPasswordType) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/reset`, body);
        return res.data

    } catch (err) {
        console.log('Internal server error', err);
        return false;  
    }
} 

export const sendCode = async (body: codeType) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/confirm`, body);
        return res.data;     

    } catch (err) {
        console.log('Internal server error', err);
        return false;
    }
}

//todo: remove comments
export const sendEmail = async (body: string) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/sendEmail`, {email: body});
        return res.data;     
    } catch (err) {
        console.log('Internal server error', err);
        return false;
    }
}
