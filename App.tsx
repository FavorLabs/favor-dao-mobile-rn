import React, {useEffect, useRef, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Alert, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from "./src/navigation";
import store, {persiStore} from './src/store/index';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';

export default function App() {
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
        loadFont().catch(Alert.alert)
    }, [])


    if (!fontsLoaded) return null;

    return (
        <Provider store={store}>
            <PersistGate persistor={persiStore}>
                <SafeAreaProvider initialMetrics={null} style={styles.container}>
                    <SafeAreaView style={{flex: 1}}>
                        <StatusBar style="auto"/>
                        <AppNavigator/>
                        <Toast/>
                    </SafeAreaView>
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
