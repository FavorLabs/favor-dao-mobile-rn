import {ethers} from 'ethers';
import {updateState} from "../store/wallet";

export type State = {
    mnemonic?: string
    password?: string
}

class WalletController {
    private state: State;
    provider: ethers.JsonRpcProvider;

    constructor() {
        this.state = {};
        this.provider = new ethers.JsonRpcProvider("https://polygon-rpc.com")
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


    get wallet() {
        return ethers.HDNodeWallet.fromPhrase(this.state.mnemonic!).connect(this.provider)
    }

    get isCreate() {
        return !!this.state.password
    }


    get address(): string {
        return this.wallet!.address;
    }

    createMnemonic(password: string): string {
        if (!password) {
            throw new Error('Password Invalid');
        }
        const wallet = ethers.HDNodeWallet.createRandom();
        this.state.mnemonic = wallet.mnemonic!.phrase;
        this.state.password = password;
        return this.state.mnemonic;
    }

    importMnemonic(password: string, mnemonic: string) {
        if (!password) {
            throw new Error('Password Invalid');
        }
        if (!ethers.Mnemonic.isValidMnemonic(mnemonic)) {
            throw new Error('Mnemonic Invalid');
        }
        this.state.mnemonic = mnemonic;
        this.state.password = password;
    }

    exportSeedPhrase(password: string) {
        if (!this.passwordVerify(password)) {
            throw new Error('Password Invalid');
        }
        return this.state.mnemonic;
    }

    exportPrivateKey(password: string) {
        if (!this.passwordVerify(password)) {
            throw new Error('Password Invalid');
        }
        return this.wallet.privateKey;
    }

    signMessage(message: string) {
        // if (!this.passwordVerify(password)) {
        //     throw new Error('Password Invalid');
        // }
        return this.wallet?.signMessage(message)
    }


    passwordVerify(password: string) {
        console.log(this.state.password)
        return this.state.password === password;
    }
}

export default new WalletController();
