import request from '../index';
import { BucketRes, ResData } from '../../declare/api/DAOApi';
export default {
  getBucket(url: string): ResData<BucketRes> {
    return request({
      url: url + '/',
    });
  },
};