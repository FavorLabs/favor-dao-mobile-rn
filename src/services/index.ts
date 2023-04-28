import axios from 'axios';
// import { getKeyByName } from '../utils/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const request = axios.create({
    baseURL: '',
    timeout: 10e3,
});

request.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // @ts-ignore
        config.headers['x-session-token'] = token;
    }

    return config;
});

request.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        return Promise.reject(
            error.response?.data?.msg ? Error(error.response?.data.msg) : error,
        );
    },
);

export default request;
