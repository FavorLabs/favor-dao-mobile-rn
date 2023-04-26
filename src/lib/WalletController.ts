import {ethers} from 'ethers';

export type State = {
    mnemonic?: string
    password?: string
}

class WalletController {
    private state: State = {};

    // private wallet: ethers.Wallet | undefined;

    init(store: any) {
        const reduxState = store?.getState?.();
        const state = reduxState?.wallet || {};
        this.state = new Proxy(state, {
            set(target: State, p: keyof State, newValue: any, receiver: any): boolean {
                target[p] = newValue;
                return true
            }
        })
    }

    get isCreate() {
        return !!this.state.password
    }

    private get wallet(): ethers.Wallet | null {
        return this.state.mnemonic ? ethers.Wallet.fromMnemonic(this.state.mnemonic) : null;
    }

    createMnemonic(): string {
        const wallet = ethers.Wallet.createRandom();
        return wallet.mnemonic.phrase;
    }

    importMnemonic(password: string, mnemonic: string) {
        ethers.Wallet.fromMnemonic(mnemonic);
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
        return this.wallet?.privateKey;
    }

    signMessage(password: string, message: string) {
        if (!this.passwordVerify(password)) {
            throw new Error('Password Invalid');
        }
        return this.wallet?.signMessage(message)
    }

    walletConnectProvide(wallet: ethers.Wallet) {
        return wallet.connect(new ethers.providers.JsonRpcProvider("https://polygon-rpc.com"))
    }

    passwordVerify(password: string) {
        return this.state.password === password;
    }
}

export default new WalletController();
