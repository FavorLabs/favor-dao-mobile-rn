import {registerRootComponent} from 'expo';
import {AppRegistry, AppState} from 'react-native'

import './shim'

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

AppRegistry.registerHeadlessTask('SomeTaskName', () => async (taskData) => {
    let timer = setInterval(() => {
        if (AppState.currentState === 'active') {
            clearInterval(timer);
        }
    }, 1000)
});
