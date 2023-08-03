import React, {useEffect, useRef, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Alert, AppState, Platform, ActivityIndicator, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootStack from "./src/navigation";
import {store, persiStore} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from "@react-navigation/native";
import WalletBottomSheet from "./src/components/WalletBottomSheet";
import FirebaseMessaging from "./src/components/FirebaseMessaging";
import analytics from '@react-native-firebase/analytics';
import {NavigationState} from "@react-navigation/routers";
import Favor from "./src/libs/favor";
import {useKeepAwake} from 'expo-keep-awake'
import BackgroundService from 'react-native-background-actions';
import {sleep} from "./src/utils/util";
import {Color} from "./src/GlobalStyles";
import {Audio} from "expo-av";

function App() {
  // AsyncStorage.clear().catch(console.error)
  useKeepAwake();
  useEffect(() => {
    async function fetch() {
      Audio.setAudioModeAsync({
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true
      });
      analytics().logEvent('app_open', {
        platform: Platform.OS
      })
      if (Platform.OS === 'android') startService();
    }

    fetch();
    const nativeEventSubscription = AppState.addEventListener("change", (state) => {
      // if (state === 'background') {
      //   if (Platform.OS === 'ios') {
      //     RNExitApp.exitApp()
      //   }
      // }
    })
    return nativeEventSubscription.remove;
  }, [])

  const veryIntensiveTask = async (taskDataArguments: any) => {
    const {delay} = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        await sleep(delay);
      }
    });
  };

  const startService = async () => {
    const options = {
      taskName: 'FavorDAO',
      taskTitle: 'FavorX Light Node Running',
      taskDesc: "Full Peers : 0 | Proxy : 0",
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      linkingURI: 'favordao://',
      color: Color.color,
      parameters: {
        delay: 1000,
      },
    };
    await BackgroundService.start(veryIntensiveTask, options);
  }

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
  },
  loader: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
