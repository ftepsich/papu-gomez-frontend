import axios from 'axios';

export const axiosConfig = axios.create({
    baseURL: "https://papu-gomez-api.herokuapp.com"
})