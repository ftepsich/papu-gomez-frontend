import { axiosConfig } from '../config';

const getPacientes = async (token) => {
    try {
        const res = await axiosConfig.get("/pacientes",{
            headers:{
                'Content-Type': 'application/json',
                'access-token': token,
            }
        });
        const pacientes = await res.data;
        return pacientes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export {
    getPacientes
}