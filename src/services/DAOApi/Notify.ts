import request from '../index';
import {NotifyGroup, ResData, ListData, SystemNotify} from "../../declare/api/DAOApi";


export default {
    getNotifyGroup(url: string): ResData<ListData<NotifyGroup>> {
        return request({
            url: url + '/notify/group'
        })
    },
    getUnReadCount(url: string, id: string): ResData<number> {
        return request({
            url: url + '/notify/unread/' + id
        })
    },
    getNotifySys(url: string, id: string) {
        return request({
            url: url + '/notify/sys/' + id
        })
    },
    getNotifyFromId(url: string, id: string) {
        return request({
            url: url + '/notify/' + id
        })
    },
    getNotifyOrgan(url: string): ResData<ListData<SystemNotify>> {
        return request({
            url: url + '/notify/organ'
        })
    },
    readNotifyFromId(url: string, id: string) {
        return request({
            method: 'put',
            url: url + '/notify/group/' + id
        })
    },
}
