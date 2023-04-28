import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type State = {
    api: string
}

export const globalStore = createSlice({
    name: "global",
    initialState: {
    } as State,
    reducers: {
        updateState: (state, action) => {
            //
        }
    }
})
export const {updateState} = globalStore.actions
export default globalStore.reducer
