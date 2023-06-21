import axios from 'axios';
import WalletController from "../libs/walletController";
import {EventEmitter} from 'events'

export const eventEmitter = new EventEmitter();
export const errorEvent = 'network_error'

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
    console.log(error)
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        return Promise.reject(Error('p2p network is unstable, please try again'));
      } else if (error.response.data.msg) {
        return Promise.reject(Error(error.response.data.msg))
      }
    }
    eventEmitter.emit('errorEvent')
    return Promise.reject(error);
  },
);

export default request;
