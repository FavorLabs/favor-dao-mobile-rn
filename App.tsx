import React, {useEffect, useRef, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Alert, AppState, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootStack from "./src/navigation";
import {store, persiStore} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from "@react-navigation/native";
import WalletBottomSheet from "./src/components/WalletBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNExitApp from 'react-native-exit-app';
import FirebaseMessaging from "./src/components/FirebaseMessaging";
import analytics from '@react-native-firebase/analytics';
import {NavigationState} from "@react-navigation/routers";
import Favor from "./src/libs/favor";
import {AppRegistry} from 'react-native';

function App() {
  // AsyncStorage.clear().catch(console.error)
  const [fontsLoaded, setFontsLoader] = useState(false);
  const loadFont = async () => {
    SplashScreen.preventAutoHideAsync();
    try {
      await Font.loadAsync({
        'ABeeZee_regular': require('./src/assets/fonts/ABeeZee_regular.ttf'),
        'Inter_bold': require('./src/assets/fonts/Inter_bold.ttf'),
        'Inter_light': require('./src/assets/fonts/Inter_light.ttf'),
        'Inter_medium': require('./src/assets/fonts/Inter_medium.ttf'),
        'Inter_regular': require('./src/assets/fonts/Inter_regular.ttf'),
        'Inter_semibold': require('./src/assets/fonts/Inter_semibold.ttf'),
      });
    } catch (e) {
      console.warn('error', e);
    } finally {
      console.log('loaded')
      SplashScreen.hideAsync();
      setFontsLoader(true);
    }
  }

  useEffect(() => {
    analytics().logEvent('app_open', {
      platform: Platform.OS
    })
    loadFont().catch(Alert.alert)
    const nativeEventSubscription = AppState.addEventListener("change", (state) => {
      if (state === 'background') {
        if (Platform.OS === 'ios') RNExitApp.exitApp();
        else {
          AppRegistry.startHeadlessTask(1, 'SomeTaskName', {});
        }
      }
    })
    return () => {
      nativeEventSubscription.remove();
    }
  }, [])

  function getCurrentRouteName(state: NavigationState): { name: string, params: Object } {
    if (!state) {
      return {name: '', params: {}};
    }
    const route = state.routes[state.index]
    let routeName = route.name;
    let routeParams = Object.assign({}, route.params)

    if (route.state) {
      const {name, params} = getCurrentRouteName(route.state as NavigationState);
      routeName += '-' + name
      routeParams = params;
    }
    return {name: routeName, params: routeParams};
  }

  const handleNavigationStateChange = async (state: NavigationState | undefined) => {
    if (state) {
      const currentScreen = getCurrentRouteName(state);
      await analytics().logEvent('screen_change', {
        platform: Platform.OS,
        networkId: Favor.networkId,
        region: Favor.bucket?.Settings.Region,
        name: currentScreen.name,
        params: currentScreen.params
      });
    }
  };

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate persistor={persiStore}>
        <SafeAreaProvider initialMetrics={null} style={styles.container}>
          {/*<SafeAreaView style={{flex: 1}}>*/}
          <StatusBar style="auto"/>
          <NavigationContainer onStateChange={handleNavigationStateChange}>
            <RootStack/>
            <WalletBottomSheet/>
            <FirebaseMessaging/>
          </NavigationContainer>
          <Toast/>
          {/*</SafeAreaView>*/}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default function HeadlessCheck({isHeadless}: { isHeadless: boolean }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App/>;
}

const styles = StyleSheet.create({
  container: {
    //
  }
});
