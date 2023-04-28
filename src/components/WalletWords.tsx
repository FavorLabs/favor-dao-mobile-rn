import * as React from "react";
import {Text, StyleSheet, View, FlatList} from "react-native";
import WalletWordItem from "./WalletWordItem";
import {FontSize, FontFamily, Color} from "../GlobalStyles";

type WalletWordsType = {
    mnemonicArray: string[];
};

const WalletWords = ({mnemonicArray}: WalletWordsType) => {

    return (
        <View style={styles.titleParent}>
            <Text style={styles.title}>Mnemonic words</Text>
            <FlatList
                data={mnemonicArray}
                renderItem={({item, index}) => {
                    return <View style={[styles.item, index % 3 !== 0 && {marginLeft: 16}]}>
                        <WalletWordItem serialNumber={index + 1} value={item}></WalletWordItem>
                    </View>
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    item: {
        flex: 1,
    },
    frameSpaceBlock: {
        marginTop: 10,
        alignSelf: "stretch",
    },
    instanceFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: FontSize.bodyBody17_size,
        letterSpacing: 0,
        lineHeight: 23,
        fontWeight: "600",
        fontFamily: FontFamily.capsCaps310SemiBold,
        color: Color.iOSSystemLabelsLightPrimary,
        textAlign: "left",
        alignSelf: "stretch",
    },
    instanceParent: {
        flex: 1,
    },
    frameWrapper: {
        flexDirection: "row",
        marginTop: 10,
    },
    instanceGroup: {
        alignSelf: "stretch",
    },
    titleParent: {
        marginTop: 20,
        alignSelf: "stretch",
    },
});

export default WalletWords;
