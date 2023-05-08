import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Events from 'events';
import { Config } from "../declare/global";

export type State = {
    api: string,
    debugApi: string,
    ws: null | (WebSocket & Events);
    config: Config | null;
}

export const globalStore = createSlice({
    name: "global",
    initialState: {
        // api: 'http://192.168.100.250:1609',
        // debugApi: 'http://192.168.100.250:1709',
        // ws: null,
        // config: {
        //     "videoLimitSize": 307200,
        //     "chainEndpoint": "https://polygon-testnet.blastapi.io/9623b441-182f-457d-92b5-46a85694cbf4",
        //     "chainId": 80001,
        //     "proxyGroup": "dao-backend-local",
        //     "DaoDomainName": "favordao",
        //     "storeGroup": "dao-store",
        //     "proxyNodes": [
        //         "7e4ef7efbdab6dbea55d9ee7b2186c09da85cca53b88a37de0c58ea4d8fc9fc0"
        //     ],
        //     "storeNodes": [
        //         "5c1782695c3cfc62b7c77f88ab68178f785f109684aafc1eaec22db2f87b1083"
        //     ]
        // }
    } as State,
    reducers: {
        updateState: (state, action: PayloadAction<Partial<State>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    }
})

export default globalStore.reducer
