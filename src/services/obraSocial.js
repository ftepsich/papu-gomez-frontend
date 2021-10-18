import { axiosConfig } from '../config';

export const fetchObrasSociales = async () => {
    const response = await axiosConfig.get('/obras-sociales');
    return response.data;
}
export const fetchObraSocialById = async id => {
    const response = await axiosConfig.get(`/obras-sociales/${id}`)
    return response;
}

export const postObrasSociales = async data => {
    const response = await axiosConfig.post('/obras-sociales',data);
    return response;
}


export const removeObraSocial = async id => {
    const response = await axiosConfig.delete(`/obras-sociales/${id}`)
    console.log(response)
     return response;
}
