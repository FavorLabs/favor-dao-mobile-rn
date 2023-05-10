import request from '../index';
import {
    DaoInfo,
    DaoParams,
    ListData,
    Page,
    ResData, SignatureData,
    Status,
} from '../../declare/api/DAOApi';

export default {
    get(url: string):ResData<DaoInfo[]> {
        return request({
            url: url + '/dao/my',
        });
    },
    getById(url: string, id: string): ResData<DaoInfo> {
        return request({
            url: url + '/dao',
            params: {dao_id: id},
        });
    },
    create(url: string, data: DaoParams): ResData<DaoInfo> {
        return request({
            url: url + '/dao',
            method: 'post',
            data,
        });
    },
    getBookmarkList(url: string, params: Page): ResData<ListData<DaoInfo>> {
        return request({
            url: url + '/daos',
            params,
        });
    },
    checkBookmark(url: string, id: string): ResData<Status> {
        return request({
            url: url + '/dao/bookmark',
            params: {dao_id: id},
        });
    },
    bookmark(url: string, id: string): ResData<Status> {
        return request({
            method: 'post',
            url: url + '/dao/bookmark',
            data: {dao_id: id},
        });
    },
    queryDao(url: string, text: string): ResData<ListData<DaoInfo>> {
        return request({
            url: url + '/daos',
            params: {query: text},
        });
    },
    subscribe(url: string, id: string, data: SignatureData):ResData<Status> {
        return request({
            url: url + '/dao/sub/' + id,
            data,
            method: 'post'
        })
    }
};
