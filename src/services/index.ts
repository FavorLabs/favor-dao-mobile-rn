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

  if(!config.headers['Content-Type']){
    config.headers['Content-Type'] = "application/json"
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    return Promise.reject(
      error.response?.data.msg ? Error(error.response?.data.msg) : error,
    );
  },
);

export default request;
