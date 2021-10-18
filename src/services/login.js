import { axiosConfig } from '../config';

export const authenticate = async credentials => {
    try{
    const response = await axiosConfig.post('/login',credentials)
    const token = response.data.token;
    return token;

} catch (error) {
    console.log(error);
    throw error;
}
}