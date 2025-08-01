import { UserType } from '../types/main';
import { getDummyUsers } from '../utils/dummy';

//todo: use real api


export const getUsers = async (currentUserId: string, conversationsIds: string[] ): Promise<UserType[]> => {
    try {
        // const res = await api.get(`/getUsers?userId=${currentUserId}`);
        // return res.data;
        const data = getDummyUsers(currentUserId, conversationsIds);
      
        return data;
        
    } catch (err) {
        console.error('Error by retrieving users: ', err);
        return [];
    }
}