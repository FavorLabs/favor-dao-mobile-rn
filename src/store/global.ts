import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../declare/api/DAOApi";
import {DaoInfo} from "../declare/api/DAOApi";

export type State = {
    user: User | null,
    dao: DaoInfo | null,
    joinStatus: boolean,
    newsJoinStatus: boolean,
    feedsOfDAOId: string,
    guidToDao: Record<string, DaoInfo>,
    userAgreement: boolean,
    daoListStatus: boolean,
    delStatus:boolean,
    delDaoMsgId:string
}

export const globalStore = createSlice({
    name: "global",
    initialState: {
        user: null,
        dao: null,
        joinStatus: false,
        newsJoinStatus: false,
        feedsOfDAOId: '',
        guidToDao: {},
        userAgreement: false,
        daoListStatus: false,
        delStatus: false,
        delDaoMsgId: '',
    } as State,
    reducers: {
        updateState: (state, action: PayloadAction<Partial<State>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        addGuid:(state,action)=>{
            return {
                ...state,
                guidToDao:{
                    ...state.guidToDao,
                    ...action.payload
                }
            }
        },
    }
})
export const {updateState,addGuid} = globalStore.actions
export default globalStore.reducer
