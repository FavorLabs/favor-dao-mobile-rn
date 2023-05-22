import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import Mixed from '../FeedsOfDAOs/Mixed';
import News from "./News";
import Videos from "./Viedos";

export const TopBarOptions = {
  header: () => null,
  tabBarIndicatorStyle: { backgroundColor: '#eaeaea', display: 'none' },
  tabBarLabel: ({ focused, color, children }: { focused: boolean, color: string, children: string }) => {
    return (
      <View style={[styles.option,focused && styles.active]}>
        <Text style={[styles.optionText,focused && styles.activeText]}>{children}</Text>
      </View>
    )
  },
  tabBarStyle: {
    backgroundColor: '#EAEAEA',
    justifyContent: 'flex-start',
  },
}

type FeedsOfDaoProps = {
  type: string;
}
export function FeedsOfDaoNavigator(props: FeedsOfDaoProps) {
  const { type } = props;

  return (
    // @ts-ignore
    <TopTab.Navigator screenOptions={TopBarOptions} initialRouteName={type}>
      <TopTab.Screen name="Mixed" component={Mixed}/>
      <TopTab.Screen name="News" component={News}/>
      <TopTab.Screen name="Videos" component={Videos}/>
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 30,
    paddingHorizontal: 11,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "600",
    color: '#939393',
    fontSize: FontSize.size_sm
  },
  active: {
    backgroundColor: '#FF8D1A',
    borderRadius: 14,
  },
  activeText: {
    color: Color.color1
  },
})