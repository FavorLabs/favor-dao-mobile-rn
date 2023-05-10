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

export type PostInfo = {
    id: string;
    created_on: number;
    modified_on: number;
    latest_replied_on: number;
    dao_id: string;
    dao: DaoInfo;
    address: string;
    user: User;
    contents: Post[];
    orig_contents: Post[];
    member: number;
    view_count: number;
    collection_count: number;
    upvote_count: number;
    comment_count: number;
    ref_count: number;
    visibility: number;
    is_top: number;
    is_essence: number;
    tags: {};
    type: number;
    orig_type: number;
    author_id: number;
    author_dao_id: number;
    author: User;
    author_dao: DaoInfo;
    ref_id: string;
    ref_type: number;
};

export type Post = {
    content: string;
    type: number;
    sort: number;
};

export type DaoInfo = {
    id: string;
    address: string;
    name: string;
    introduction: string;
    visibility: number;
    avatar: string;
    banner: string;
    follow_count: number;
    price: number;
    last_posts: [
        {
            type: number;
            created_on: number;
            contents: Post[];
        },
    ];
    is_joined: boolean;
    is_subscribed: boolean;
};

export type User = {
    id: string;
    nickname: string;
    address: string;
    avatar: string;
    role: string;
};

export type Page = Pagination & {
    type?: number | string;
    query?: string;
};

export type Pagination = {
    page: number;
    page_size: number;
};
