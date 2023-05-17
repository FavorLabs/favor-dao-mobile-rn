import React from "react";
import {StyleSheet, Text, View} from "react-native";
import RecommendScreen from "../screens/Main/Feeds/RecommendScreen";
import JoinedScreen from "../screens/Main/Feeds/JoinedScreen";
import RecommendDAOListScreen from "../screens/Main/DAO/RecommendDAOListScreen";
import JoinedDAOListScreen from "../screens/Main/DAO/JoinedDAOListScreen";
import ReadScreen from "../screens/Main/Notify/ReadScreen";
import UnreadScreen from "../screens/Main/Notify/UnreadScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();
import {FontSize, Color, Border, FontFamily, Padding} from "../GlobalStyles";
import {useIsLogin} from "../utils/hook";

export const TopBarOptions = {
    header: () => null,
    // tabBarActiveTintColor: 'white',
    // tabBarInactiveTintColor: 'gray',
    tabBarPressColor: 'transparent',
    tabBarIndicatorStyle: {backgroundColor: '#eaeaea', display: 'none'},
    tabBarItemStyle: {fontSize: 24},
    tabBarLabel: ({focused, color, children}: { focused: boolean, color: string, children: string }) => {
        return (
          <View style={[styles.container, {backgroundColor: focused ? '#ff8d1a' : 'white'}]}>
              <Text style={[styles.text, {color: focused ? 'white' : '#000000', fontSize: 15}]}>{children}</Text>
          </View>
        )
    },
    tabBarStyle: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 48,
        marginBottom: 10,
    },
}

export function FeedsTopTabNavigator() {
    const [isLogin, gotoLogin] = useIsLogin()
    return (
      // @ts-ignore
      <TopTab.Navigator screenOptions={TopBarOptions} screenListeners={({navigation, route}) => ({
          tabPress: e => {
              if (route.name === 'Joined' && !isLogin) {
                  gotoLogin();
                  e.preventDefault()
              }
          },
      })}>
          <TopTab.Screen name="Recommend" component={RecommendScreen}/>
          <TopTab.Screen name="Joined" component={JoinedScreen} options={{
              lazy: true
          }}/>
      </TopTab.Navigator>
    );
}

export function DAOTopTabNavigator() {
    return (
      // @ts-ignore
      <TopTab.Navigator screenOptions={TopBarOptions}>
          <TopTab.Screen name="DAOs" component={RecommendDAOListScreen}/>
          <TopTab.Screen name="Joined" component={JoinedDAOListScreen}/>
      </TopTab.Navigator>
    );
}

export function NotifyTopTabNavigator() {
    return (
      // @ts-ignore
      <TopTab.Navigator screenOptions={TopBarOptions}>
          <TopTab.Screen name="Read" component={ReadScreen}/>
          <TopTab.Screen name="Unread" component={UnreadScreen}/>
      </TopTab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        padding: Padding.p_3xs,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Border.br_29xl
    },
    text: {
        // fontSize: FontSize.bodyBody17_size,
        fontWeight: '600',
    },
})
