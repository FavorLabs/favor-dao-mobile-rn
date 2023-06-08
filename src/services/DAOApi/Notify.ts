import request from '../index';
import {NotifyGroup, ResData, ListData, SystemNotify, Page} from "../../declare/api/DAOApi";


export default {
    getNotifyGroup(url: string, params: Page): ResData<ListData<NotifyGroup>> {
        return request({
            url: url + '/notify/group',
            params
        })
    },
    getUnReadCount(url: string, id: string): ResData<number> {
        return request({
            url: url + '/notify/unread/' + id
        })
    },
    getNotifySys(url: string, id: string, params: Page) {
        return request({
            url: url + '/notify/sys/' + id,
            params
        })
    },
    getNotifyFromId(url: string, id: string, params: Page) {
        return request({
            url: url + '/notify/' + id,
            params
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
    delNotifyAll(url: string, id: string) {
        console.log(id,'--------------------------------')
        return request({
            method: 'delete',
            url: url + '/notify/group/' + id
        })
    },
}
