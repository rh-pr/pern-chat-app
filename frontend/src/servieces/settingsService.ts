import api from "../api/axios";

export const getUserSettings = async(userId: string) => {
    try {
        if (!userId) return false;
        const res = await api.get(`/settings/getSettings?userId=${userId}`);
        return res.data;     

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error by retrieving settings:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return false;
    }
}

type SettingsProps = {
    userId: string,
    sound: boolean,
    thema: boolean
}

export const updateUserSettings = async (body: SettingsProps) => {
    try {
        if (!body) return false;

        const res =  await api.post('/settings/updateSettings', body);

        if (!res) return false;

        return res.data;

    } catch (err: unknown){
        if (err instanceof Error) {
            console.error("Error by updating settings:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
        return false;
    }
}