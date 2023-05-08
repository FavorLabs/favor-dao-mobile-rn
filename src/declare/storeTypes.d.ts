import { State as GlobalState } from '../store/global';
import { State as SwitchState } from '../store/switch';
import { State as WalletState } from '../lib/WalletController';

export default interface Models {
  global: GlobalState;
  switch: SwitchState;
  wallet: WalletState;
}