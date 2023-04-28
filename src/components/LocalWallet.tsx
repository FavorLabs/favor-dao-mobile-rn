import * as React from "react";
import {Text, StyleSheet, Image, View, Pressable, TouchableOpacity} from "react-native";
import WalletItem from "./WalletItem";
import {useNavigation,} from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack'
import {FontFamily, FontSize, Color, Border, Padding} from "../GlobalStyles";
import Screens from "../navigation/RouteNames";

const LocalWallet = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const createWallet = () => {
        navigation.navigate(Screens.CreateWallet)
    }
    const importWallet = () => {
        navigation.navigate(Screens.ImportWallet)
    }

    return (
        <View style={styles.titleParent}>
            <Text style={styles.title}>Local wallet</Text>
            <TouchableOpacity onPress={createWallet}>
                <WalletItem
                    walletImage={require("../assets/group-1171275666.png")}
                    walletName="Create wallet"
                    walletIntroduction="No wallet to create"
                    frame1171275664Overflow="unset"
                    ellipse12Width={43}
                    ellipse12Height={36}
                    amountWidth={185}
                    amountWidth1={233}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={importWallet}>
                <WalletItem
                    walletImage={require("../assets/group-1171275667.png")}
                    walletName="Import wallet"
                    walletIntroduction="There is already a wallet to import"
                    frame1171275664Overflow="unset"
                    ellipse12Width={43}
                    ellipse12Height={36}
                    amountWidth={185}
                    amountWidth1={233}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // amountTypo: {
    //     fontFamily: FontFamily.headingH613,
    //     fontWeight: "500",
    //     lineHeight: 23,
    //     left: 0,
    //     position: "absolute",
    //     textAlign: "left",
    //     letterSpacing: 0,
    // },
    title: {
        fontSize: FontSize.size_xl,
        lineHeight: 22,
        fontWeight: "600",
        fontFamily: FontFamily.capsCaps310SemiBold,
        width: 343,
        height: 22,
        textAlign: "left",
        letterSpacing: 0,
        color: Color.iOSSystemLabelsLightPrimary,
    },
    // frameChild: {
    //     width: 43,
    //     height: 36,
    // },
    // amount: {
    //     top: 0,
    //     fontSize: FontSize.size_mini,
    //     width: 105,
    //     color: Color.iOSSystemLabelsLightPrimary,
    //     fontFamily: FontFamily.headingH613,
    //     fontWeight: "500",
    //     lineHeight: 23,
    //     left: 0,
    //     position: "absolute",
    // },
    // amount1: {
    //     top: 25,
    //     fontSize: FontSize.size_xs,
    //     color: Color.color3,
    //     width: 232,
    // },
    // amountParent: {
    //     flex: 1,
    //     height: 48,
    //     marginLeft: 8,
    // },
    // chevronRightIcon: {
    //     width: 24,
    //     height: 24,
    //     overflow: "hidden",
    //     marginLeft: 8,
    // },
    // groupParent: {
    //     borderRadius: Border.br_3xs,
    //     backgroundColor: Color.color1,
    //     flexDirection: "row",
    //     padding: Padding.p_sm,
    //     alignItems: "center",
    //     marginTop: 20,
    //     alignSelf: "stretch",
    // },
    titleParent: {
        marginTop: 30,
        alignSelf: "stretch",
    },
});

export default LocalWallet;
