import {updateState} from "../store/wallet";
import {hdkey} from "ethereumjs-wallet";
import UserApi from "../services/DAOApi/User";
import {SignatureData} from "../declare/api/DAOApi";

const bip39 = require('bip39');
const {ecsign, toRpcSig, hashPersonalMessage} = require('ethereumjs-util');

export type State = {
    mnemonic?: string
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

    private get hdWallet() {
        return hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(this.state.mnemonic!));
    }

    private get wallet() {
        return this.hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet()
    }

    get address() {
        return this.wallet.getAddressString()
    }

    get privateKeyBuffer() {
        return this.wallet.getPrivateKey()
    }

    createMnemonic(): string {
        return bip39.generateMnemonic();
    }

    importMnemonic(password: string, mnemonic: string) {
        if (!password) {
            throw new Error('Password Invalid');
        }
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Private Key Invalid');
        }
        this.state.mnemonic = mnemonic;
        this.state.password = password;
    }

    signMessage(message: string) {
        const messageBuffer = hashPersonalMessage(Buffer.from(message));
        const signature = ecsign(messageBuffer, this.privateKeyBuffer);
        return toRpcSig(signature.v, signature.r, signature.s);
    }

    passwordVerify(password: string) {
        return this.state.password === password;
    }

    async login(url: string) {
        const {data} = await UserApi.signIn(url, this.getSignatureData());
        this.state.token = data.data.token
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
