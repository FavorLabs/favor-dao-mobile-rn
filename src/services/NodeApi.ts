import request from 'axios';
import { AxiosResponse } from 'axios';
import type {
  Message,
  ApiPort,
  Addresses,
  FileList,
} from '../declare/api/nodeApi';
import { ChunkSource } from '../declare/api/nodeApi';

export default {
  // Api
  getPort(api: string): Promise<AxiosResponse<ApiPort>> {
    return request({
      url: api + '/apiPort',
    });
  },
  getFileInfo(api: string, hash: string): Promise<AxiosResponse<FileList>> {
    return request({
      url: api + '/file',
      method: 'get',
      params: {
        page: JSON.stringify({ pageNum: 1, pageSize: 1 }),
        sort: JSON.stringify({ key: 'rootCid', order: 'asc' }),
        filter: JSON.stringify([{ key: 'rootCid', value: hash, term: 'cn' }]),
      },
    });
  },
  uploadFile(api: string, file: File) {
    let fileName = file.name;
    let headers = {};
    // @ts-ignore
    headers['Content-Type'] = file.type || 'application/x-www-form-urlencoded';
    return request({
      url: api + '/file',
      method: 'post',
      data: file,
      params: { name: fileName },
      headers,
      timeout: 0,
    });
  },
  observeProxyGroup(
    api: string,
    proxyGroup: string,
    proxyNodes: string[],
  ): Promise<AxiosResponse<Message>> {
    return request({
      url: api + `/group/observe/` + proxyGroup,
      method: 'post',
      data: {
        nodes: proxyNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  observeStorageGroup(
    api: string,
    storeGroup: string,
    storeNodes: string[],
  ): Promise<AxiosResponse<Message>> {
    return request({
      url: api + `/group/observe/` + storeGroup,
      method: 'post',
      data: {
        nodes: storeNodes,
        'keep-connected-peers': 1,
      },
    });
  },
  async sendMessage(
    api: string,
    debugApi: string,
    overlay: string,
    hash: string,
    storeGroup: string,
  ): Promise<AxiosResponse<{ data: string }>> {
    const data = await request.get(debugApi + '/addresses');
    return request.post(
      api + `/group/send/${storeGroup}/` + overlay,
      {
        source: data.data.overlay,
        hash,
      },
      { timeout: 30 * 1000 },
    );
  },
  getPyramidSize(api: string, data: any): Promise<AxiosResponse<FileList>> {
    return request({
      url: api + '/file?' + data,
    });
  },

  // DebugApi
  connect(debugApi: string, overlay: string): Promise<AxiosResponse<Message>> {
    return request({
      url: debugApi + '/connect/' + overlay,
      method: 'post',
    });
  },
  getAddresses(debugApi: string): Promise<AxiosResponse<Addresses>> {
    return request.get(debugApi + '/addresses');
  },
  getChunkSource(
    debugApi: string,
    hash: string,
  ): Promise<AxiosResponse<ChunkSource>> {
    return request({
      url: debugApi + '/chunk/source/' + hash,
    });
  },
};
