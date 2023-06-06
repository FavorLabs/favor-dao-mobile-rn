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
    title: {
        fontSize: FontSize.size_xl,
        fontWeight: "600",
        height: 22,
        textAlign: "left",
        color: Color.iOSSystemLabelsLightPrimary,
        marginLeft: 14,
    },

    titleParent: {
        alignSelf: "stretch",
        paddingBottom: 30,
    },
});

export default LocalWallet;
