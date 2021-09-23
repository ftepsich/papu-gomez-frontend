import { axiosConfig } from '../config';

module.exports.getObraSocial = async () => {
    const response = await axiosConfig.get('/obras-sociales');
    return response.data;
}


