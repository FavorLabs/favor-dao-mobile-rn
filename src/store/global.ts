import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../declare/api/DAOApi";
import {DaoInfo} from "../declare/api/DAOApi";

export type State = {
    user: User | null,
    dao: DaoInfo | null,
    joinStatus: boolean,
    newsJoinStatus: boolean,
    feedsOfDAOId: string,
}

export const globalStore = createSlice({
    name: "global",
    initialState: {
        user: null,
        dao: null,
        joinStatus: false,
        newsJoinStatus: false,
        feedsOfDAOId: '',
    } as State,
    reducers: {
        updateState: (state, action: PayloadAction<Partial<State>>) => {
            console.log({
                ...state,
                ...action.payload,
            })
            return {
                ...state,
                ...action.payload,
            };
        },
    }
})
export const {updateState} = globalStore.actions
export default globalStore.reducer
