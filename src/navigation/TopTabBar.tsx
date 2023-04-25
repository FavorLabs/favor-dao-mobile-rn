import React from "react";
import {Text, View} from "react-native";
import RecommendScreen from "../screens/Main/Feeds/RecommendScreen";
import JoinedScreen from "../screens/Main/Feeds/JoinedScreen";
import RecommendDAOListScreen from "../screens/Main/DAO/RecommendDAOListScreen";
import JoinedDAOListScreen from "../screens/Main/DAO/JoinedDAOListScreen";
import ReadScreen from "../screens/Main/Notify/ReadScreen";
import UnreadScreen from "../screens/Main/Notify/UnreadScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();

export const TopBarOptions = {
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
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 30,
  },
}

export function FeedsTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Recommend" component={RecommendScreen} />
      <TopTab.Screen name="Joined" component={JoinedScreen} />
    </TopTab.Navigator>
  );
}

export function DAOTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="RecommendDAOList" component={RecommendDAOListScreen} />
      <TopTab.Screen name="JoinedDAOList" component={JoinedDAOListScreen} />
    </TopTab.Navigator>
  );
}

export function NotifyTopTabNavigator() {
  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions}>
      <TopTab.Screen name="Read" component={ReadScreen} />
      <TopTab.Screen name="Unread" component={UnreadScreen} />
    </TopTab.Navigator>
  );
}