import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import CreateDAOScreen from '../screens/CreateDAOScreen';
import CreateNewsScreen from '../screens/CreateNewsScreen';
import CreateVideoScreen from '../screens/CreateVideoScreen';
import VideoPlayScreen from '../screens/VideoPlayScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import QuoteNewsScreen from '../screens/QuoteNewsScreen';
import InputWalletPasswordScreen from '../screens/InputWalletPasswordScreen';
import MnemonicBackupScreen from '../screens/MnemonicBackupScreen';
import DAOSettingScreen from '../screens/Main/Setting/DAOSettingScreen';
import {BottomTabNavigator} from "./BottomTabBar";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Root" component={BottomTabNavigator}/>
      <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
      <Stack.Screen name="ImportWallet" component={ImportWalletScreen} />
      <Stack.Screen name="CreateDAO" component={CreateDAOScreen} />
      <Stack.Screen name="CreateNews" component={CreateNewsScreen} />
      <Stack.Screen name="CreateVideo" component={CreateVideoScreen} />
      <Stack.Screen name="VideoPlay" component={VideoPlayScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="QuoteNews" component={QuoteNewsScreen} />
      <Stack.Screen name="InputWalletPassword" component={InputWalletPasswordScreen} />
      <Stack.Screen name="MnemonicBackup" component={MnemonicBackupScreen} />
      <Stack.Screen name="DAOSetting" component={DAOSettingScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}