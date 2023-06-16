import {State as GlobalState} from '../store/global';
import {State as SwitchState} from '../store/switch';
import {State as WalletState} from '../libs/walletController';
import {State as SearchState} from '../store/search';
import {State as notifyState} from '../store/notify';
import {State as ControllersState} from '../store/controllers';
import {State as FavorxState} from '../store/favorx';

export default interface Models {
  global: GlobalState;
  switch: SwitchState;
  wallet: WalletState;
  search: SearchState;
  controllers: ControllersState;
  notify: notifyState;
  favorx: FavorxState
}
