import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import WalletWords from "../components/WalletWords";
import {FontFamily, Color, FontSize, Border, Padding} from "../GlobalStyles";
import FavorDaoButton from "../components/FavorDaoButton";
import { useRoute} from "@react-navigation/native";
import {useMemo} from "react";

const Mnemonic = () => {
    const route = useRoute()
    const {mnemonic} = route.params as { mnemonic: string }

    // const mnemonicArray = useMemo(() => {
    //     return mnemonic?.split(' ') || [];
    // }, [mnemonic])

    return (
        <View style={[styles.mnemonic, styles.mnemonicFlexBox]}>
            {/*<FavorDaoNavBar*/}
            {/*    title="Mnemonic words"*/}
            {/*    vector={require("../assets/vector6.png")}*/}
            {/*/>*/}
            {/*<View style={styles.titleParent}>*/}
            {/*    <Text style={[styles.title, styles.titleLayout]}>{`Backup mnemonics`}</Text>*/}
            {/*    <Text style={[styles.title1, styles.titleLayout]}>*/}
            {/*        Please copy the mnemonic words in order to ensure accurate backup*/}
            {/*    </Text>*/}
            {/*</View>*/}
            {/*<WalletWords mnemonicArray={mnemonicArray}/>*/}
            <FavorDaoNavBar
                title="Private Key"
                vector={require("../assets/vector6.png")}
            />
            <View style={styles.titleParent}>
                <Text style={[styles.title, styles.titleLayout]}>{`Backup private key`}</Text>
                <Text style={[styles.title1, styles.titleLayout]}>
                    Please copy the private key in order to ensure accurate backup
                </Text>
            </View>
            <Text style={{
                padding: 20,
                borderRadius:10,
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#ccc'
            }}>
                {
                    mnemonic
                }
            </Text>
            <TouchableOpacity>
                <FavorDaoButton
                    textValue="Backup"
                    frame1171275771BackgroundColor="#ff8d1a"
                    cancelColor="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mnemonicFlexBox: {
        overflow: "hidden",
        alignItems: "center",
    },
    titleLayout: {
        width: 343,
        textAlign: "left",
        fontFamily: FontFamily.aBeeZeeRegular,
        lineHeight: 22,
        letterSpacing: 0,
    },
    backgroundIcon: {
        height: 44,
        width: 375,
    },
    backgroundWrapper: {
        alignSelf: "stretch",
    },
    title: {
        color: Color.iOSSystemLabelsLightPrimary,
        height: 25,
        fontSize: FontSize.bodyBody17_size,
        width: 343,
        textAlign: "left",
        fontFamily: FontFamily.aBeeZeeRegular,
        lineHeight: 22,
    },
    title1: {
        fontSize: FontSize.size_xs,
        color: Color.color4,
        height: 48,
    },
    titleParent: {
        marginTop: 20,
        alignSelf: "stretch",
    },
    create: {
        lineHeight: 23,
        fontWeight: "600",
        fontFamily: FontFamily.capsCaps310SemiBold,
        color: Color.color1,
        textAlign: "center",
        letterSpacing: 0,
        fontSize: FontSize.bodyBody17_size,
    },
    createWrapper: {
        borderRadius: Border.br_29xl,
        backgroundColor: Color.color,
        flexDirection: "row",
        paddingHorizontal: Padding.p_124xl_5,
        paddingVertical: Padding.p_sm,
        justifyContent: "center",
        alignSelf: "stretch",
        alignItems: "center",
    },
    background: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        position: "absolute",
        width: "100%",
    },
    seperator: {
        marginLeft: -66.5,
        bottom: 10,
        left: "50%",
        borderRadius: Border.br_81xl,
        backgroundColor: Color.iOSSystemLabelsLightPrimary,
        width: 134,
        height: 5,
        position: "absolute",
    },
    homeIndicator: {
        height: 34,
        marginTop: 20,
        width: 375,
    },
    instanceParent: {
        paddingTop: 201,
        marginTop: 20,
        alignSelf: "stretch",
        alignItems: "center",
    },
    mnemonic: {
        backgroundColor: Color.color2,
        flex: 1,
        paddingHorizontal: Padding.p_base,
        paddingVertical: 0,
        alignItems: "center",
        width: "100%",
    },
});

export default Mnemonic;
