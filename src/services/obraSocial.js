import { axiosConfig } from '../config';

export const fetchObrasSociales = async () => {
    const response = await axiosConfig.get('/obras-sociales');
    console.log(response)
    return response.data;
}

export const deleteObraSocial = async id => {
    const response = await axiosConfig.delete('/obras-sociales/:id', id)
    console.log(response)
     return response.data;
}
