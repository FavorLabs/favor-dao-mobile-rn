import React from "react";
import {Text, View} from "react-native";
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