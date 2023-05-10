import {configureStore} from '@reduxjs/toolkit'
import globalReducer from './global';
import walletReducer from './wallet';
import controllersReducer from './controllers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {combineReducers, createStore} from 'redux';
import WalletController from "../libs/walletController";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    wallet: persistReducer(persistConfig, walletReducer),
    global: globalReducer,
    controllers: controllersReducer,
})

export const store = createStore(rootReducer);

const initPStore = async () => {
    console.log(store.getState())
    WalletController.init(store)
}

export const persiStore = persistStore(store, null, initPStore);

