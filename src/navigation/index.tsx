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
import Screens from './RouteNames';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }} initialRouteName={Screens.CreateNews}>
      <Stack.Screen name={Screens.Root} component={BottomTabNavigator}/>
      <Stack.Screen name={Screens.CreateWallet} component={CreateWalletScreen} />
      <Stack.Screen name={Screens.ImportWallet} component={ImportWalletScreen} />
      <Stack.Screen name={Screens.CreateDAO} component={CreateDAOScreen} />
      <Stack.Screen name={Screens.CreateNews} component={CreateNewsScreen} />
      <Stack.Screen name={Screens.CreateVideo} component={CreateVideoScreen} />
      <Stack.Screen name={Screens.VideoPlay} component={VideoPlayScreen} />
      <Stack.Screen name={Screens.PostDetail} component={PostDetailScreen} />
      <Stack.Screen name={Screens.QuoteNews} component={QuoteNewsScreen} />
      <Stack.Screen name={Screens.InputWalletPassword} component={InputWalletPasswordScreen} />
      <Stack.Screen name={Screens.MnemonicBackup} component={MnemonicBackupScreen} />
      <Stack.Screen name={Screens.DAOSetting} component={DAOSettingScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
                <RootStack/>
        </NavigationContainer>
    );
}
