export type Config = {
  chainEndpoint: string;
  chainId: number;
  videoLimitSize: number;
  proxyGroup: string;
  DaoDomainName: string;
  storeGroup: string;
  proxyNodes: string[];
  storeNodes: string[];
  proxyVPN?: {
    enabled: boolean
    whitelist: string[]
    proxy: [
      {
        group: string
        name: string
        boot: string[]
      }
    ]
  }
};

export type FavorXConfig = {
  "name": string
  "bootnode": string[]
  "chain-endpoint": string
  "network-id": number
  "oracle-contract-addr": string
  "traffic": boolean
  "traffic-contract-addr": string
  "proxy-group": string
  "proxy-nodes": string[]
  "unipass": {
    "nodeRPC": string
    "domain": string
  }
  "chat": {
    "region": string
    "appId": string
  }
}
