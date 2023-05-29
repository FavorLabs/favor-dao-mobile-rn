import React, {useMemo} from "react";
import {Text, StyleSheet, View} from "react-native";
import {FontFamily, FontSize, Color, Border, Padding} from "../GlobalStyles";

type WalletWordItemType = {
    serialNumber?: number;
    value?: string;
};


const WalletWordItem = ({serialNumber, value}: WalletWordItemType) => {

    return (
        <View style={[styles.titleParent, styles.titleFlexBox]}>
            <Text style={[styles.title, styles.titleTypo]}>{serialNumber}</Text>
            <Text style={[styles.title1, styles.titleTypo]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleFlexBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleTypo: {
        textAlign: "center",
        fontWeight: '400',
        lineHeight: 23,
        letterSpacing: 0,
    },
    title: {
        fontSize: FontSize.size_xs,
        color: Color.color4,
        position: "absolute",
        bottom: 5,
        left: 10
    },
    title1: {
        fontSize: FontSize.size_mini,
        color: Color.iOSSystemLabelsLightPrimary,
    },
    titleParent: {
        flex: 1,
        borderRadius: Border.br_3xs,
        backgroundColor: Color.color1,
        // height: 50,
        padding: Padding.p_mini,
        flexDirection: "row",
    },
});

export default WalletWordItem;
