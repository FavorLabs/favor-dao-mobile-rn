import axios from 'axios';
import WalletController from "../libs/walletController";

const request = axios.create({
  baseURL: '',
  timeout: 10e3,
});

request.interceptors.request.use((config) => {
  const token = WalletController.token;
  if (token) {
    config.headers['x-session-token'] = token;
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data);
    return Promise.reject(
      error.response?.data ? Error(error.response?.data) : error,
    );
  },
);

export default request;
