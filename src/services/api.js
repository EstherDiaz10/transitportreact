import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://18.232.225.15/api'
    baseURL: 'http://localhost/api'
});

api.interceptors.request.use((config) => {

    const token = sessionStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;