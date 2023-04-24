import request from '../index';
import { ResData, Statistic } from '../../declare/api/DAOApi';
export default {
  signIn(
    url: string,
    data: {
      timestamp: number;
      wallet_addr: string;
      signature: string;
      type: string;
    },
  ) {
    return request({
      method: 'post',
      url: url + '/auth/login',
      data,
    });
  },
  getInfo(url: string) {
    return request({
      url: url + '/user/info',
    });
  },
  getStatistic(url: string): ResData<Statistic> {
    return request({
      url: url + '/user/statistic',
    });
  },
  changeNickName(url: string, nickname: string | undefined): ResData<any> {
    return request({
      method: 'post',
      url: url + '/user/nickname',
      data: { nickname },
    });
  },
  accountCancellation(
    url: string,
    data: {
      timestamp: number;
      wallet_addr: string;
      signature: string;
      type: string;
    },
  ) {
    return request({
      method: 'delete',
      url: url + '/account',
      data,
    });
  },
};
