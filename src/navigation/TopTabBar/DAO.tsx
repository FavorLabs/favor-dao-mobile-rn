import React from "react";
import RecommendDAOListScreen from "../../screens/Main/DAO/RecommendDAOListScreen";
import JoinedDAOListScreen from "../../screens/Main/DAO/JoinedDAOListScreen";
import { TopBarOptions } from './index';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();

export function DAOTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="RecommendDAOList" component={RecommendDAOListScreen} />
      <TopTab.Screen name="JoinedDAOList" component={JoinedDAOListScreen} />
    </TopTab.Navigator>
  );
}