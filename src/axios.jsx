// src/axios.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:7223/api',
    withCredentials: true
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/signIn';
        }
        return Promise.reject(error);
    }
);

export default API;
