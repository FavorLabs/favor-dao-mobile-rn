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
