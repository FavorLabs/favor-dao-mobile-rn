import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import { FontSize, Color } from "../../../../GlobalStyles";
import FightForLuck from "./FightForLuck";
import Ordinary from "./Ordinary";
import RecordReceived from "./RecordReceived";
import RecordDistributed from "./RecordDistributed";

export const REtabs = {
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
    headerTitleAlign:'flex-start'
}

type FeedsOfDaoProps = {
}
export function RETabs(props: FeedsOfDaoProps) {
    const {  } = props;
    return (
        // @ts-ignore
        <TopTab.Navigator screenOptions={REtabs} >
            <TopTab.Screen name="FightForLuck" component={FightForLuck} />
            <TopTab.Screen name="Ordinary" component={Ordinary}/>
        </TopTab.Navigator>
    );
}

const styles = StyleSheet.create({
    option: {
        height: 30,
        paddingHorizontal: 11,
        paddingVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop:8,
        marginBottom:8
    },
    optionText: {
        fontWeight: '500',
        color: '#939393',
        fontSize: 18
    },
    active: {
        backgroundColor: '#FF8D1A',
        borderRadius: 14,
    },
    activeText: {
        color: Color.color1
    },
})
