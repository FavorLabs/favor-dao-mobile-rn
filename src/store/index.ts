import {configureStore} from '@reduxjs/toolkit'
import globalReducer from './global';
import walletReducer from './wallet';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {combineReducers, createStore} from 'redux';
import WalletController from "../lib/WalletController";

const rootReducer = combineReducers({
    global: globalReducer,
    wallet: walletReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const pStore = createStore(pReducer);

const initPStore = () => {
    WalletController.init(pStore)
}

export const persiStore = persistStore(pStore, null, initPStore);
export default configureStore({
    reducer: {
        globalReducer
    }
})
