import {AxiosResponse} from 'axios';

export type ComplaintData={
    post_id:string,
    reason:string
}

export type RedPacketInfo = {
    "address": string,
    "amount": string,
    "avg_amount": string,
    "balance": string,
    "claim_amount": string,
    "claim_count": number,
    "created_on": number,
    "id": string,
    "modified_on": number,
    "pay_status": number,
    "refund_status": number,
    "refund_tx_id": string,
    "title": string,
    "total": number,
    "tx_id": string,
    "type": number,
    "user_avatar": string,
    "is_timeout": boolean,
    "user_nickname": string,
}