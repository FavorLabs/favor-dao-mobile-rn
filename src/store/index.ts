import {configureStore} from '@reduxjs/toolkit'
import globalReducer from './global';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  global: globalReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const pStore = createStore(pReducer);

const initPStore = () => {
  //
}

export const persiStore = persistStore(pStore, null, initPStore);
export default configureStore({
  reducer: {
    globalReducer
  }
})
