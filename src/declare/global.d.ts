export type Config = {
  bootNode: string[];
  chainEndpoint: string;
  tokenName: string;
  chainId: number;
  oracleContractAddr: string;
  traffic: boolean;
  trafficContractAddr: string;
  faucet: string;
  favorTokenAddress: string;
  favorTubeAddress: string;
  videoLimitSize: number;
  proxyGroup: string;
  DaoDomainName: string;
  storeGroup: string;
  proxyNodes: string[];
  storeNodes: string[];
};