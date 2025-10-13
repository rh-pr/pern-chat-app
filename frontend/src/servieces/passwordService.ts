import api from "../api/axios";
import { codeType, resetPasswordType } from "../types/main";

export const resetPassword = async (body: resetPasswordType) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/reset`, body);
        return res.data

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by reset Password:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return false;
    }
} 

export const sendCode = async (body: codeType) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/confirm`, body);
        return res.data;     

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sending code:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return false;
    }
}


export const sendEmail = async (body: string) => {
    try {
        if (!body) return false
        const res = await api.post(`/password/sendEmail`, {email: body});
        return res.data;     

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by sending email:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return false;
    }
}
