import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Padding, Color, FontFamily, FontSize, Border } from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {RecordTabs} from "./RedEnvelopesTab/RecordTabs";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";

const LuckyPacketRecordScreen = () => {
    return (
        <BackgroundSafeAreaView headerStyle={{backgroundColor:'#f8f8f8'}}>
            <View style={{backgroundColor:'#F8F8F8',flex:1}}>
                <View style={styles.header}>
                    <FavorDaoNavBar title="LuckyPacket Record"/>
                </View>
                <View style={styles.content}>
                    <View style={styles.feedsOfDao}>
                        <RecordTabs />
                    </View>
                </View>
            </View>
        </BackgroundSafeAreaView>
    );
};

const styles = StyleSheet.create({
    header:{
        paddingLeft:10,
        paddingRight:10,
        marginBottom:44
    },
    feedsOfDao: {
        backgroundColor: Color.color1,
        flex: 1,
        width: "100%"
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
});

export default LuckyPacketRecordScreen;
