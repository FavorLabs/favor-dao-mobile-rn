import {updateState} from "../store/wallet";
import Wallet from "ethereumjs-wallet";
import UserApi from "../services/DAOApi/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {ecsign, isValidPrivate, toRpcSig, hashPersonalMessage} = require('ethereumjs-util');

export type State = {
    privateKey?: string
    password?: string
    token?: string
}

class WalletController {
    private state: State;

    constructor() {
        this.state = {};
    }

    init(store: any) {
        const reduxState = store?.getState?.();
        // console.log("reduxState", reduxState);
        const state = reduxState?.wallet || {};
        this.state = new Proxy(state, {
            set(target: State, p: keyof State, newValue: any, receiver: any): boolean {
                target[p] = newValue;
                store.dispatch(updateState({key: p, value: newValue}));
                return true
            }
        })
    }

    get token() {
        return this.state.token
    }

    get address() {
        return '0x' + Wallet.fromPrivateKey(Buffer.from(this.state.privateKey!, 'hex')).getAddress().toString('hex')
    }

    get isCreate() {
        return !!this.state.password
    }

    createPrivateKey(password: string): string {
        return Wallet.generate().getPrivateKey().toString('hex');
    }

    importPrivateKey(password: string, privateKey: string) {
        if (!password) {
            throw new Error('Password Invalid');
        }
        if (!isValidPrivate(Buffer.from(privateKey, 'hex'))) {
            throw new Error('Private Key Invalid');
        }
        console.log(111111)
        this.state.privateKey = privateKey;
        this.state.password = password;
    }


    exportPrivateKey(password: string) {
        if (!this.passwordVerify(password)) {
            throw new Error('Password Invalid');
        }
        return this.state.privateKey;
    }

    signMessage(message: string) {
        // if (!this.passwordVerify(password)) {
        //     throw new Error('Password Invalid');
        // }
        const messageBuffer = hashPersonalMessage(Buffer.from(message));
        const privateKeyBuffer = Buffer.from(this.state.privateKey!, 'hex');
        const signature = ecsign(messageBuffer, privateKeyBuffer);
        return toRpcSig(signature.v, signature.r, signature.s);
    }

    passwordVerify(password: string) {
        return this.state.password === password;
    }

    async login(url: string) {
        const address = this.address;
        const timestamp = Date.parse(new Date().toUTCString());
        const msg = `${address} login FavorDAO at ${timestamp}`;
        const signature = this.signMessage(msg);
        const {data} = await UserApi.signIn(url, {
            timestamp,
            signature,
            wallet_addr: address,
            type: 'meta_mask',
        });
        this.state.token = data.data.token
        // await AsyncStorage.setItem('token', data.data.token);
    }
}

export default new WalletController();
