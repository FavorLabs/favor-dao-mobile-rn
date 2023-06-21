import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Padding, Color, FontFamily, FontSize, Border } from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {RETabs} from "./RedEnvelopesTab/RETabs";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useRoute} from "@react-navigation/native";

const RedEnvelopesScreen = () => {
    const route = useRoute();
    // @ts-ignore
    const { memberCount, sendCustomMessage} = route.params;
    return (
        <BackgroundSafeAreaView headerStyle={{backgroundColor:'#F8F8F8'}}>
            <View style={{flex:1,backgroundColor:'#F8F8F8'}}>
                <View style={styles.header}>
                    <FavorDaoNavBar
                        title="LuckyPacket"
                        vector={require("../../../assets/vector6.png")}
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.feedsOfDao}>
                        <RETabs memberCount={memberCount} sendCustomMessage={sendCustomMessage}/>
                    </View>
                </View>
            </View>
        </BackgroundSafeAreaView>
    );
};

const styles = StyleSheet.create({
    header:{
        paddingLeft:20,
        paddingRight:20,
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
    createWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        overflow: "hidden"
    },
});

export default RedEnvelopesScreen;
