import React from "react";
import RecommendScreen from "../../screens/Main/Feeds/RecommendScreen";
import JoinedScreen from "../../screens/Main/Feeds/JoinedScreen";
import { TopBarOptions } from './index';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();

export function FeedsTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Recommend" component={RecommendScreen} />
      <TopTab.Screen name="Joined" component={JoinedScreen} />
    </TopTab.Navigator>
  );
}