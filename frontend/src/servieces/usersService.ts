import { users } from '../dummy/dummy.json';
import { UserType } from '../types/main';


//todo: delete this method, use real api
const getDummyUsers = (currentUserId: string, conversationsIds: string[]): UserType[] => {
    const res =  users.filter(user => !conversationsIds.includes(user.id) && user.id !==currentUserId)
     return res;
}

export const getUsers = async (currentUserId: string, conversationsIds: string[] ) => {
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