import type { AxiosResponse } from 'axios';
import request from '../index';
import {
  ChatInfo,
  GetMsgIdRes,
  GetMsgRes,
  ListData,
  ResData,
} from '../../declare/api/DAOApi';
export default {
  getMsgIdByName(
    url: string,
    hash: string,
  ): Promise<AxiosResponse<GetMsgIdRes>> {
    return request({
      url: url + `/channels/${hash}`,
    });
  },
  getMsgById(
    url: string,
    hash: string,
    messageId: string,
  ): Promise<AxiosResponse<GetMsgRes>> {
    return request({
      url: url + `/channels/${hash}/messages/${messageId}`,
    });
  },
  getGroupId(url: string, daoId: string): Promise<ResData<ListData<ChatInfo>>> {
    return request({
      url: url + `/chat/groups`,
      params: {
        dao_id: daoId,
      },
    });
  },
};
