import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import { FontSize, Color } from "../../../../GlobalStyles";
import RecordReceived from "./RecordReceived";
import RecordDistributed from "./RecordDistributed";
import {strings} from "../../../../locales/i18n";

export const REtabs = {
    header: () => null,
    tabBarIndicatorStyle: { backgroundColor: '#eaeaea', display: 'none' },
    tabBarLabel: ({ focused, children }: { focused: boolean, color: string, children: string }) => {
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
export function RecordTabs(props: FeedsOfDaoProps) {
    return (
        // @ts-ignore
        <TopTab.Navigator screenOptions={REtabs} >
            <TopTab.Screen name={strings('RecordTabs.Received')} component={RecordReceived} />
            <TopTab.Screen name={strings('RecordTabs.Distributed')} component={RecordDistributed}/>
        </TopTab.Navigator>
    );
}

const styles = StyleSheet.create({
    option: {
        paddingHorizontal: 11,
        paddingVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontWeight: '500',
        color: '#939393'
    },
    active: {
        backgroundColor: '#FF8D1A',
        borderRadius: 14,
    },
    activeText: {
        color: Color.color1
    },
})
