import React from "react";
import FeedsScreen from "../screens/Main/Feeds";
import ChatScreen from "../screens/Main/Chat";
import DAOScreen from "../screens/Main/DAO";
import NotifyScreen from "../screens/Main/Notify";
import SettingScreen from "../screens/Main/Setting";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const BottomTabBar = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <BottomTabBar.Navigator initialRouteName="Feeds" screenOptions={{ headerShown: false }}>
      <BottomTabBar.Screen name="Feeds" component={FeedsScreen} />
      <BottomTabBar.Screen name="Chat" component={ChatScreen} />
      <BottomTabBar.Screen name="DAO" component={DAOScreen} />
      <BottomTabBar.Screen name="Notify" component={NotifyScreen} />
      <BottomTabBar.Screen name="Setting" component={SettingScreen} />
    </BottomTabBar.Navigator>
  );
}