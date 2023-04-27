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

export type PostInfo = {
  address: string;
  collection_count: number;
  contents: Post[];
  created_on: number;
  dao: DaoInfo;
  id: string;
  latest_replied_on: number;
  tags: [];
  type: number;
  upvote_count: number;
  view_count: number;
  comment_count: number;
  visibility: number;
  user: User;
  ref_id: string;
  ref_type: number;
  author: User;
  author_dao: DaoInfo;
  orig_type: number;
  orig_contents: Post[];
  ref_count: number;
};

export type Post = {
  content: string;
  type: number;
  sort: number;
};

export type DaoInfo = {
  address: string;
  avatar: string;
  banner: string;
  id: string;
  introduction: string;
  name: string;
  visibility: number;
  follow_count: number;
  last_posts: [
    {
      type: number;
      created_on: number;
      contents: Post[];
    },
  ];
};

export type User = {
  address: string;
  avatar: string;
  nickname: string;
  id: string;
};

export type Page = Pagination & {
  type?: number | string;
  query?: string;
};

export type Pagination = {
  page: number;
  page_size: number;
};