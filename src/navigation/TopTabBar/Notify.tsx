import React from "react";
import ReadScreen from "../../screens/Main/Notify/ReadScreen";
import UnreadScreen from "../../screens/Main/Notify/UnreadScreen";
import { TopBarOptions } from './index';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();

export function NotifyTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Read" component={ReadScreen} />
      <TopTab.Screen name="Unread" component={UnreadScreen} />
    </TopTab.Navigator>
  );
}