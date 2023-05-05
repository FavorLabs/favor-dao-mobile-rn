import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type State = {
    globalBottomSheet: boolean
}

export const store = createSlice({
    name: "switch",
    initialState: {
        globalBottomSheet: false
    } as State,
    reducers: {
        updateState: (state, action: PayloadAction<State>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})
export const {updateState} = store.actions
export default store.reducer
