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

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = "application/json"
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response)
    if (error.response?.data.code === 500) {
      return Promise.reject(Error('p2p network is unstable, please try again'));
    } else if (error.response?.data.msg) {
      return Promise.reject(Error(error.response?.data.msg))
    }
    return error;
  },
);

export default request;
