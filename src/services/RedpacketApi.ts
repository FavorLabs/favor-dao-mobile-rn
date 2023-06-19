import request from './index';

export default {
    creatRedpacket(url: string, data:any) {
        return request({
            method: 'post',
            url: url + `/redpacket`,
            data
        });
    },
    claimRedpacket(url: string, id: string) {
        return request({
            method: 'post',
            url: url + `/redpacket/${id}`
        });
    },
    getRedPacketInfo(url: string,id:string) {
        return request({
            url: url + `/redpacket/${id}`,
        });
    },
    getUserClaims(url: string, params:any) {
        return request({
            url: url + '/redpacket/stats/claims',
            params
        });
    },
    getUserSends(url: string, params:any) {
        return request({
            url: url + '/redpacket/stats/sends',
            params
        });
    },
    getMySendList(url: string, params:any) {
        return request({
            url: url + '/redpacket/sends',
            params
        });
    },
    getMyClaimList(url: string,params:any) {
        return request({
            url: url + '//redpacket/claims',
            params
        });
    },
}