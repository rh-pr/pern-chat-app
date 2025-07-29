// import api from '../api/axios';

import { currentUser as user } from '../dummy/dummy.json';


//add serverRequest
export const getCurrentUser = async ()=> {
    try {
        // const res = await api.get('profile');
        // return res.data;
        return user;

    } catch (err) {
        console.error('Error by retrieving user: ', err);
        return null;
    }
}