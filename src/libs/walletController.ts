import {updateState} from "../store/wallet";
import Wallet from "ethereumjs-wallet";
import UserApi from "../services/DAOApi/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SignatureData} from "../declare/api/DAOApi";

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
        const state = Object.assign({}, reduxState?.wallet);
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
        const {data} = await UserApi.signIn(url, this.getSignatureData());
        this.state.token = data.data.token
        // await AsyncStorage.setItem('token', data.data.token);
    }

    getSignatureData(index = 0): SignatureData {
        const signatureMsg = ['login FavorDAO at', 'subscribe DAO at']
        const address = this.address;
        const timestamp = Date.parse(new Date().toUTCString());
        const msg = `${address} ${signatureMsg[index]} ${timestamp}`;
        const signature = this.signMessage(msg);
        return {
            timestamp,
            signature,
            wallet_addr: address,
            type: 'meta_mask',
        }
    }
}

export default new WalletController();
