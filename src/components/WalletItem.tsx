import React, {useMemo} from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ImageSourcePropType,
} from "react-native";
import {FontFamily, FontSize, Color, Border, Padding} from "../GlobalStyles";

type WalletItemType = {
    walletImage: ImageSourcePropType;
    walletName: string;
    walletIntroduction: string;

    /** Style props */
    frame1171275664Overflow?: string;
    ellipse12Width?: number | string;
    ellipse12Height?: number | string;
    amountWidth?: number | string;
    amountWidth1?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
    if (value === undefined) return;
    return {[key]: value === "unset" ? undefined : value};
};
const WalletItem = ({
                        walletImage, walletName, walletIntroduction,
                        frame1171275664Overflow,
                        ellipse12Width, ellipse12Height,
                        amountWidth, amountWidth1,
                    }: WalletItemType) => {
    const frameView2Style = useMemo(() => {
        return {
            ...getStyleValue("overflow", frame1171275664Overflow),
        };
    }, [frame1171275664Overflow]);

    const ellipseIconStyle = useMemo(() => {
        return {
            ...getStyleValue("width", ellipse12Width),
            ...getStyleValue("height", ellipse12Height),
        };
    }, [ellipse12Width, ellipse12Height]);

    const amountStyle = useMemo(() => {
        return {
            ...getStyleValue("width", amountWidth),
        };
    }, [amountWidth]);

    const amount1Style = useMemo(() => {
        return {
            ...getStyleValue("width", amountWidth1),
        };
    }, [amountWidth1]);

    return (

        <View style={[styles.ellipseParent, frameView2Style]} >
            <Image
                style={[styles.frameChild, ellipseIconStyle]}
                resizeMode="cover"
                source={walletImage!}
            />
            <View style={styles.amountParent}>
                <Text style={[styles.amount, styles.amountTypo, amountStyle]}>
                    {walletName}
                </Text>
                <Text style={[styles.amount1, styles.amountTypo, amount1Style]} numberOfLines={1}>
                    {walletIntroduction}
                </Text>
            </View>
            <Image
                style={styles.chevronRightIcon}
                resizeMode="cover"
                source={require("../assets/chevronright.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    amountTypo: {
        textAlign: "left",
        fontWeight: '500',
        lineHeight: 23,
        letterSpacing: 0,
        left: 0,
        position: "absolute",
    },
    frameChild: {
        width: 48,
        height: 48,
    },
    amount: {
        top: 0,
        fontSize: FontSize.size_mini,
        color: Color.iOSSystemLabelsLightPrimary,
        width: 166,
    },
    amount1: {
        top: 25,
        fontSize: FontSize.size_xs,
        color: Color.color3,
        width: 227,
    },
    amountParent: {
        flex: 1,
        marginLeft: 8,
        height: 48,
    },
    chevronRightIcon: {
        width: 24,
        height: 24,
        marginLeft: 8,
        overflow: "hidden",
    },
    ellipseParent: {
        alignSelf: "stretch",
        borderRadius: Border.br_3xs,
        backgroundColor: Color.color1,
        flexDirection: "row",
        padding: Padding.p_sm,
        alignItems: "center",
        marginTop: 20,
        overflow: "hidden",
    },
});

export default WalletItem;
