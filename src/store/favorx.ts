import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type State = {
    start: boolean
}

export const store = createSlice({
    name: "favorx",
    initialState: {
      start: false
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
