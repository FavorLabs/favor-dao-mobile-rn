import {State as GlobalState} from '../store/global';
import {State as SwitchState} from '../store/switch';
import {State as WalletState} from '../libs/walletController';
import {State as SearchState} from '../store/search';
import {State as ControllersState} from '../store/controllers';

export default interface Models {
    global: GlobalState;
    switch: SwitchState;
    wallet: WalletState;
    search: SearchState;
    controllers: ControllersState
}
