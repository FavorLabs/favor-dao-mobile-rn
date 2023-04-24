import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./src/navigation";
import store, { persiStore } from './src/store/index';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persiStore}>
        <SafeAreaProvider initialMetrics={null} style={styles.container}>
          <StatusBar style="auto" />
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  }
});
