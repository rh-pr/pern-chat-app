import api from "../api/axios";

export const resetPassword = async (body: FormData) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/reset`, body);
        return Boolean(res);

    } catch (err) {
        console.log('Internal server error', err);
        return false;  
    }
} 

export const sendCode = async (body: FormData) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/confirm`, body);
        return Boolean(res.data);     


    } catch (err) {
        console.log('Internal server error', err);
        return false;
    }
}

//todo: remove comments
export const sendEmail = async (body: FormData) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/sendEmail`, body);
        return Boolean(res.data);     
    } catch (err) {
        console.log('Internal server error', err);
        return false;
    }
}