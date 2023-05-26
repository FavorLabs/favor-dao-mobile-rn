import request from '../index';
import { AxiosResponse } from 'axios';
export default {
  upload(url: string, data: FormData): Promise<AxiosResponse<{ id: string }>> {
    return request({
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      url: url,
      data,
      timeout: 0,
    });
  },
};
