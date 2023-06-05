import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native'
import Toast from "react-native-toast-message";
import Favor from "../libs/favor";
import {useDispatch} from "react-redux";
import {updateState as globalUpdateState} from "../store/notify";

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("background", remoteMessage)
})

const FirebaseMessaging = () => {
    const dispatch = useDispatch();
    async function initMessaging() {
        try {
            let permissionStatus = false;
            if (Platform.OS === 'ios') {
                permissionStatus = await iosRequestUserPermission()
            } else if (Platform.OS === 'android') {
                permissionStatus = await androidRequestUserPermission()
            }
            if (permissionStatus) {
                messaging().onTokenRefresh(token => {
                    console.log('token_refresh', token)
                })
                messaging().onNotificationOpenedApp((remoteMessage) => {
                    console.log('openApp', remoteMessage);
                });
                messaging().onMessage(async remoteMessage => {
                    console.log('message', remoteMessage)
                    if (Number(remoteMessage.data?.networkId) === Number(Favor.networkId) && remoteMessage.data?.region === Favor.bucket?.Settings.Region) {
                        Toast.show({
                            type: 'info',
                            text1: remoteMessage.notification?.title,
                            text2: remoteMessage.notification?.body
                        });
                        dispatch(globalUpdateState({
                            messageRefresh: true,
                        }));
                    }
                })
                await messaging().subscribeToTopic('sys');
            }

        } catch (e) {
            console.error(e)
        }

    }

    async function iosRequestUserPermission() {
        const authStatus = await messaging().requestPermission();
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
    }

    async function androidRequestUserPermission() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        return granted === PermissionsAndroid.RESULTS.GRANTED
    }

    useEffect(() => {
        initMessaging()
    }, [])
    return <>
    </>
};

export default FirebaseMessaging;
