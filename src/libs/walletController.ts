import {updateState} from "../store/wallet";
import Wallet, {hdkey} from "ethereumjs-wallet";
import UserApi from "../services/DAOApi/User";
import {SignatureData} from "../declare/api/DAOApi";

const bip39 = require('bip39');
const {ecsign, toRpcSig, hashPersonalMessage} = require('ethereumjs-util');
import {encrypt, decrypt} from '../utils/crypto'
import Favor from "./favor";
import _ from 'lodash'
import messaging from "@react-native-firebase/messaging";
import {CometChat} from "@cometchat-pro/react-native-chat";
import analytics from "@react-native-firebase/analytics";
import {Platform} from "react-native";
import {strings} from "../locales/i18n";

export type State = {
    data?: string;
    token?: Record<string, string>
    type?: 'mnemonic' | 'privateKey'
}

class WalletController {
    state: State;

    constructor() {
        this.state = {};
    }

    init(store: any) {
        const reduxState = store?.getState?.();
        const state = _.cloneDeep(reduxState?.wallet);
        this.state = new Proxy(state, {
            set(target: State, p: keyof State, newValue: any, receiver: any): boolean {
                target[p] = newValue;
                console.log(p, newValue)
                store.dispatch(updateState({key: p, value: newValue}));
                return true
            }
        })
    }

    get token() {
        return this.state.token?.[Favor.networkName]
    }

    get type(){
        return this.state.type
    }

    createMnemonic() {
        return bip39.generateMnemonic();
    }

    importMnemonic(password: string, mnemonic: string) {
        if (!password) {
            throw new Error(`${strings('walletController.PasswordInvalid')}`);
        }
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error(`${strings('walletController.MnemonicInvalid')}`);
        }
        this.state.data = encrypt(mnemonic, password);
        this.state.type = 'mnemonic';
    }

    importPrivateKey(password: string, privateKey: string) {
        if (!password) {
            throw new Error(`${strings('walletController.PasswordInvalid')}`);
        }
        if (privateKey.length !== 64) {
            throw new Error(`${strings('walletController.PrivateKeyInvalid')}`);
        }
        this.state.data = encrypt(privateKey, password);
        this.state.type = 'privateKey'
    }

    exportPrivateKeySting(password: string) {
        const privateKey = decrypt(this.state.data!, password);
        if (!privateKey) {
            throw new Error(`${strings('walletController.PasswordInvalid')}`)
        }
        return privateKey;
    }

    exportPrivateKey(password: string) {
        if (this.state.type === 'privateKey') {
            return Buffer.from(this.exportPrivateKeySting(password),'hex');
        }
        const mnemonic = this.exportMnemonic(password);
        const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
        const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet()
        return wallet.getPrivateKey();
    }

    exportMnemonic(password: string) {
        const mnemonic = decrypt(this.state.data!, password);
        if (!mnemonic) {
            throw new Error(`${strings('walletController.PasswordInvalid')}`)
        }
        return mnemonic;
    }

    signMessage(message: string, privateKey: Buffer) {
        const messageBuffer = hashPersonalMessage(Buffer.from(message));
        const signature = ecsign(messageBuffer, privateKey);
        return toRpcSig(signature.v, signature.r, signature.s);
    }

    getSignatureData(privateKey: Buffer, type = 0): SignatureData {
        const address = Wallet.fromPrivateKey(privateKey).getAddressString();
        const timestamp = Date.parse(new Date().toUTCString());
        let msg = '';
        if (type === 0) {
            msg = `${address} login FavorDAO at ${timestamp}`;
        } else if (type === 1) {
            msg = `${address} subscribe DAO at ${timestamp}`;
        } else if (type === 2) {
            msg = `delete ${address} account at ${timestamp}`;
        } else if (type === 3) {
            msg = `${address} Create Redpacket at ${timestamp}`;
        }
        const signature = this.signMessage(msg, privateKey);
        return {
            timestamp,
            signature,
            wallet_addr: address,
            type: 'meta_mask',
        }
    }

    async login(url: string, sign: Buffer | SignatureData) {
        const signatureData = Buffer.isBuffer(sign) ? this.getSignatureData(sign) : sign;
        const token: string | undefined = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined);
            }, 2000)
            messaging().getToken().then(resolve).catch(() => resolve(undefined))
        })
        const {data} = await UserApi.signIn(url, {
              ...signatureData,
              token,
          }
        );
        this.state.token = Object.assign(this.state.token ?? {}, {
            [Favor.networkName]: data.data.token
        })
    }

    async logout(address?: string) {
        Object.keys(this.state).map((item) => {
            this.state[item as keyof State] = undefined
        })
        await CometChat.logout();
        await analytics().logEvent('logout', {
            platform: Platform.OS,
            networkId: Favor.networkId,
            region: Favor.bucket?.Settings.Region,
            address: address
        });
    }

    changePassword(newPassword: string, oldPassword: string) {
        if (this.state.type === 'privateKey') {
            const privateKey = this.exportPrivateKeySting(oldPassword);
            this.importPrivateKey(newPassword, privateKey)
        } else {
            const mnemonic = this.exportMnemonic(oldPassword);
            this.importMnemonic(newPassword, mnemonic);
        }
    }
}

export default new WalletController();



