import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {State} from '../lib/WalletController'

export const walletControllerStore = createSlice({
    name: "wallet",
    initialState: {} as State,
    reducers: {
        updateState: (state, action: PayloadAction<{ key: keyof State, value: any }>) => {
            state[action.payload.key] = action.payload.value;
        }
    }
})
export const {updateState} = walletControllerStore.actions
export default walletControllerStore.reducer
