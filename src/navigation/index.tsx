import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
import ChatScreen from '../screens/Main/Chat';
import SettingScreen from '../screens/Main/Setting';
import RecommendScreen from '../screens/Main/Feeds/RecommendScreen';
import JoinedScreen from '../screens/Main/Feeds/JoinedScreen';
import RecommendDAOListScreen from '../screens/Main/DAO/RecommendDAOListScreen';
import JoinedDAOListScreen from '../screens/Main/DAO/JoinedDAOListScreen';
import ReadScreen from '../screens/Main/Notify/ReadScreen';
import UnreadScreen from '../screens/Main/Notify/UnreadScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopBarOptions = {
  header: () => null,
  tabBarActiveTintColor: 'white',
  // tabBarInactiveTintColor: 'gray',
  tabBarLabelStyle: { fontSize: 15 },
  tabBarPressColor: 'transparent',
  tabBarIndicatorStyle: { backgroundColor: 'white' },
  // tabBarItemStyle: { margin:5,borderRadius: 30},
  tabBarLabel: ({ focused, color, children }: { focused: boolean, color: string, children: string }) => {
    return (
      <View style={{ width: 150, height: '100%', flex: 1 , justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#ff8d1a' : 'white', borderRadius: 30 }}>
        <Text style={{ color: focused ? 'white' : 'grey', fontSize: 15 }}>{children}</Text>
      </View>
    )
  },
  tabBarStyle: {
    display: 'flex',
    width: '90%',
    top: 0,
    bottom: 0,
    left: 15,
    right: 15,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 30,
  },
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Feeds">
      <BottomTab.Screen name="Feeds" component={FeedsTopTabNavigator} />
      <BottomTab.Screen name="Chat" component={ChatScreen} />
      <BottomTab.Screen name="DAO" component={DAOTopTabNavigator} />
      <BottomTab.Screen name="Notify" component={NotifyTopTabNavigator} />
      <BottomTab.Screen name="Setting" component={SettingScreen} />
    </BottomTab.Navigator>
  );
}

function FeedsTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Recommend" component={RecommendScreen} />
      <TopTab.Screen name="Joined" component={JoinedScreen} />
    </TopTab.Navigator>
  );
}

function DAOTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="RecommendDAOList" component={RecommendDAOListScreen} />
      <TopTab.Screen name="JoinedDAOList" component={JoinedDAOListScreen} />
    </TopTab.Navigator>
  );
}

function NotifyTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Read" component={ReadScreen} />
      <TopTab.Screen name="Unread" component={UnreadScreen} />
    </TopTab.Navigator>
  );
}

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