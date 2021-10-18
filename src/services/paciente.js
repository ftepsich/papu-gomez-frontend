import { axiosConfig } from '../config';

export const fetchPacientes = async (token) => {
    try{
    const response = await axiosConfig.get('/pacientes',{
        headers:{
            'Content-Type': 'application/json',
            'access-token': token,
        }
    });
    const pacientes = await response.data;
    return pacientes;
} catch (error) {
    console.log(error);
    throw error;
}
}