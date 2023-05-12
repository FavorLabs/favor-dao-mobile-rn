import {updateState} from "../store/wallet";
import Wallet, {hdkey} from "ethereumjs-wallet";
import UserApi from "../services/DAOApi/User";
import {SignatureData} from "../declare/api/DAOApi";

const bip39 = require('bip39');
const {ecsign, toRpcSig, hashPersonalMessage} = require('ethereumjs-util');
import {encrypt, decrypt} from '../utils/crypto'

export type State = {
    data?: string;
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

    createMnemonic() {
        return bip39.generateMnemonic();
    }

    importMnemonic(password: string, mnemonic: string) {
        if (!password) {
            throw new Error('Password Invalid');
        }
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Private Key Invalid');
        }
        this.state.data = encrypt(mnemonic, password);
    }

    signMessage(message: string, privateKey: Buffer) {
        const messageBuffer = hashPersonalMessage(Buffer.from(message));
        const signature = ecsign(messageBuffer, privateKey);
        return toRpcSig(signature.v, signature.r, signature.s);
    }

    exportPrivateKey(password: string) {
        const mnemonic = this.exportMnemonic(password);
        const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
        const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet()
        return wallet.getPrivateKey();
    }

    exportMnemonic(password: string) {
        const mnemonic = decrypt(this.state.data!, password);
        if (!mnemonic) {
            throw new Error('Password Invalid')
        }
        return mnemonic;
    }

    passwordVerify(password: string) {
        try {

        } catch (e) {

        }
    }

    async login(url: string, privateKey: Buffer) {
        const {data} = await UserApi.signIn(url, this.getSignatureData(privateKey));
        this.state.token = data.data.token
    }

    getSignatureData(privateKey: Buffer, index = 0): SignatureData {
        const signatureMsg = ['login FavorDAO at', 'subscribe DAO at']
        const address = Wallet.fromPrivateKey(privateKey).getAddressString();
        const timestamp = Date.parse(new Date().toUTCString());
        const msg = `${address} ${signatureMsg[index]} ${timestamp}`;
        const signature = this.signMessage(msg, privateKey);
        return {
            timestamp,
            signature,
            wallet_addr: address,
            type: 'meta_mask',
        }
    }
}

export default new WalletController();
