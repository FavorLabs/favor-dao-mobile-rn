import {updateState} from "../store/wallet";
import Wallet from "ethereumjs-wallet";

const {ecsign, isValidPrivate, toRpcSig, keccak256,hashPersonalMessage} = require('ethereumjs-util');

export type State = {
    privateKey?: string
    password?: string
}

class WalletController {
    private state: State;

    constructor() {
        this.state = {};
    }

    init(store: any) {
        const reduxState = store?.getState?.();
        console.log("reduxState", reduxState);
        const state = reduxState?.wallet || {};
        this.state = new Proxy(state, {
            set(target: State, p: keyof State, newValue: any, receiver: any): boolean {
                target[p] = newValue;
                store.dispatch(updateState({key: p, value: newValue}));
                return true
            }
        })
    }

    get address() {
        return '0x' + Wallet.fromPrivateKey(Buffer.from(this.state.privateKey!, 'hex')).getAddress().toString('hex')
    }

    get isCreate() {
        return !!this.state.password
    }

    createPrivateKey(password: string): string {
        if (!password) {
            throw new Error('Password Invalid');
        }
        const privateKey = Wallet.generate().getPrivateKey().toString('hex');
        this.state.privateKey = privateKey;
        this.state.password = password;
        return privateKey;
    }

    importPrivateKey(password: string, privateKey: string) {
        if (!password) {
            throw new Error('Password Invalid');
        }
        if (!isValidPrivate(privateKey)) {
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
        console.log(this.state.password)
        return this.state.password === password;
    }
}

export default new WalletController();
