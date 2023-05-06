import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import {Padding, FontFamily, FontSize, Color, Border} from "../GlobalStyles";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import ProtocolRadioSelect from "../components/ProtocolRadioSelect";
import WalletController from "../libs/walletController";
import Screens from "../navigation/RouteNames";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUrl} from "../utils/hook";

const ImportWallet = () => {
    const url = useUrl();
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [mnemonic, setMnemonic] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const importMnemonic = async () => {
        if (!password || password !== repeatPassword) {
            return console.error('Password Invalid')
        }
        if (!agree) {
            return console.error('Please check the box')
        }
        try {
            WalletController.importPrivateKey(password, mnemonic);
            await WalletController.login(url);
            navigation.goBack();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={[styles.importWallet, styles.importWalletSpaceBlock]}>
            <FavorDaoNavBar
                title="Import wallet"
                vector={require("../assets/vector6.png")}
            />
            {/*<TextInputBlock*/}
            {/*    title={'Mnemonic words'}*/}
            {/*    placeholder={`Please enter mnemonic words，Separate with semicolons...`}*/}
            {/*    value={mnemonic}*/}
            {/*    setValue={setMnemonic}*/}
            {/*    multiline={true}*/}
            {/*/>*/}
            <TextInputBlock
                title={'Private Key'}
                placeholder={`Please enter private key`}
                value={mnemonic}
                setValue={setMnemonic}
                multiline={true}
            />
            <TextInputBlock
                title={'Password'}
                placeholder={`Please enter passwords`}
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <TextInputBlock
                title={'Confirm Password'}
                placeholder={`Please enter passwords again`}
                value={repeatPassword}
                setValue={setRepeatPassword}
                secureTextEntry={true}
            />
            <ProtocolRadioSelect value={agree} setValue={setAgree}/>
            <TouchableOpacity onPress={importMnemonic}>
                <FavorDaoButton
                    textValue="Create"
                    frame1171275771BackgroundColor="#ff8d1a"
                    cancelColor="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    importWalletSpaceBlock: {
        paddingHorizontal: Padding.p_base,
        overflow: "hidden",
    },
    title1Typo: {
        fontFamily: FontFamily.paragraphP313,
        textAlign: "left",
        letterSpacing: 0,
    },
    backgroundIcon: {
        height: 44,
        width: 375,
    },
    title: {
        fontSize: FontSize.bodyBody17_size,
        fontWeight: "600",
        fontFamily: FontFamily.capsCaps310SemiBold,
        textAlign: "left",
        letterSpacing: 0,
        color: Color.iOSSystemLabelsLightPrimary,
        lineHeight: 23,
        alignSelf: "stretch",
    },
    title1: {
        fontSize: FontSize.size_mini,
        color: Color.color4,
        width: 311,
        lineHeight: 23,
        fontFamily: FontFamily.paragraphP313,
    },
    titleWrapper: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.color1,
        flexDirection: "row",
        paddingVertical: Padding.p_smi,
        marginTop: 10,
        alignSelf: "stretch",
    },
    titleParent: {
        alignSelf: "stretch",
    },
    importWalletInner: {
        justifyContent: "center",
        marginTop: 20,
        alignSelf: "stretch",
    },
    controlstableViewrowxchecIcon: {
        top: 2,
        left: 0,
        width: 17,
        height: 16,
        position: "absolute",
    },
    iHaveCarefully: {
        color: Color.iOSSystemLabelsLightPrimary,
    },
    theUserAgreement: {
        color: Color.color,
    },
    description: {
        top: 0,
        left: 28,
        fontSize: FontSize.size_xs,
        lineHeight: 20,
        width: 315,
        position: "absolute",
    },
    controlstableViewrowxchecParent: {
        height: 20,
        alignSelf: "stretch",
        justifyContent: "center"
    },
    groupParent: {
        paddingTop: Padding.p_70xl,
        marginTop: 20,
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
    importWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        height: 812,
        paddingVertical: 0,
        alignItems: "center",
        width: "100%",
    },
});

export default ImportWallet;
