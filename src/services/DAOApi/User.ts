import request from '../index';
import {ResData, SignatureData, Statistic, User, UserAccounts} from '../../declare/api/DAOApi';

export default {
    signIn(url: string, data: SignatureData) {
        return request({
            method: 'post',
            url: url + '/auth/login',
            data,
        });
    },
    getInfo(url: string): ResData<User> {
        return request({
            url: url + '/user/info',
        });
    },
    getStatistic(url: string): ResData<Statistic> {
        return request({
            url: url + '/user/statistic',
        });
    },
    changeNickName(url: string, nickname: string | undefined): ResData<any> {
        return request({
            method: 'post',
            url: url + '/user/nickname',
            data: {nickname},
        });
    },
    accountCancellation(url: string, data: SignatureData) {
        return request({
            method: 'delete',
            url: url + '/account',
            data,
        });
    },
    getAccounts(url: string): ResData<UserAccounts[]> {
        return request({
            url: url + '/user/accounts',
        });
    },
    getTransaction(url: string): ResData<any> {
        return request({
            url: url + '/user/trans',
        });
    },
};
