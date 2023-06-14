import {AxiosResponse} from 'axios';

export type ComplaintData={
    post_id:string,
    reason:string
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
    tags: [];
    type: number;
    orig_type: number;
    author_id: number;
    author_dao_id: number;
    author: User;
    author_dao: DaoInfo;
    ref_id: string;
    ref_type: number;
    origCreatedAt: number;

    orig_member: number;
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
    price: string;
    last_posts: [
        {
            type: number;
            created_on: number;
            contents: Post[];
            orig_contents: Post[];
        },
    ];
    is_joined: boolean;
    is_subscribed: boolean;
    tags: string[];
    home_page: string;
    type: number;
};

export type User = {
    id: string;
    nickname: string;
    address: string;
    avatar: string;
    role: string;
};

export type Statistic = {
    comment_count: number;
    dao_count: number;
    upvote_count: number;
};


export type Pagination = {
    page: number;
    page_size: number;
};

export type Page = Pagination & {
    type?: number | string;
    query?: string;
};

export type DAOPage = Pagination & {
    type?: number | string;
    query?: string;
    sort?: string;
};

export type CreatePost = {
    contents: Post[];
    dao_id: string;
    tags: string[];
    type: number;
    users: string[];
    visibility: number;
};

export type ReTransferPost = {
    contents?: Post[];
    dao_id: string;
    tags?: string[];
    type: number;
    visibility: number;
    ref_id: string;
    ref_type: number;
};


export type Comment = {
    content: string;
    type: number;
    sort: number;
};

export type CommentInfo = {
    id: string;
    post_id: string;
    address: string;
    user: User;
    contents: CommentRes[];
    replies: CommentReplyRes[];
    created_on: number;
    modified_on: number;
};

export type CreateComment = {
    post_id: string;
    contents: Comment[];
};

export type CreateReply = {
    comment_id: string;
    content: string;
};

export type GetCommentsParams = Pagination & {
    id: string;
};

export type CommentRes = Comment & {
    id: string;
    created_on: number;
    modified_on: number;
    deleted_on: number;
    is_del: number;
    comment_id: string;
    post_id: string;
    address: string;
};

export type CommentReplyRes = {
    id: string;
    content: string;
    user: User;
    comment_id: string;
    created_on: number;
};

export type CreateCommentReplyRes = Omit<CommentReplyRes, 'user'>;

export type ResData<T> = Promise<
  AxiosResponse<{
      code: number;
      data: T;
      msg: string;
      tracehost: string;
  }>
>;

export type DaoParams = Omit<
  DaoInfo,
  'address' | 'id' | 'follow_count' | 'last_posts' | 'price' | 'is_joined' | 'is_subscribed' | 'type' | 'home_page'
>;

export type ListData<T> = {
    list: T[] | null;
    pager: Pagination & {
        total_rows: number;
    };
};

export type Status = {
    status: boolean;
};

export type UploadImage = 'avatars' | 'images';

export type UploadVideo = 'videos';

export type BucketsPath = UploadImage | UploadVideo;

export type BucketRes = {
    BuildInfo: {
        Version: string;
        Sum: string;
        BuildDate: string;
    };
    Settings: Settings;
};

export type Settings = {
    Bucket: string;
    TagNetwork: string;
    TagRegion: string;
    Region: string;
};

export type GetMsgIdRes = {
    channel_type: string;
    _id: string;
    server: string;
    name: string;
    last_message_id: string;
};

export type GetMsgRes = {
    _id: string;
    nonce: string;
    channel: string;
    author: string;
    content: string;
};

export type LastMsg = {
    content: string;
    created_on: number;
};

export type ChatInfo = {
    guid: string;
    name: string;
    type: string;
    icon: string;
    description: string;
    scope: string;
    owner: string;
    membersCount: number;
    joinedAt: number;
    hasJoined: boolean;
    createdAt: number;
    updatedAt: number;
    conversationlc: string;
};


export type UserAccounts = {
    "balance": string
    "frozen": string
    "asset": string
}

export type SignatureData = {
    "timestamp": number
    "wallet_addr": string
    "signature": string
    "type": "wallet_connect" | 'meta_mask' | 'okx' | 'unipass_std' | 'unipass_eth'
}

export type TransactionInfo = {
    account_id: {
        reference: string,
        token_name: string
    },
    channel: string,
    id: string,
    created_at: number,
    updated_at: number,
    subject_id: string,
    pay_amount: string,
    status: string,
    rollback: boolean,
    log: [],
    ref_order_id: string
}


export type NotifyGroup = {
    "fromInfo": {
        "id": string
        "avatar": string
        "name": string
    }
    "unreadCount": number
    "content": string
    "createdAt": number
}

export type SystemNotify = {
    "id": string
    "name": string
    "avatar": string
    "unreadCount": number
    "key": string
}

export type Notify = {
    "id": string
    "title": string
    "content": string
    "createdAt": string
    "route"?: {
        name: string
        subRoute: Notify['route']
        [key: string]: any
    },
    "links": string
}
