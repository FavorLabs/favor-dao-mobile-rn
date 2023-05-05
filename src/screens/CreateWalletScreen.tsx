import * as React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import ProtocolRadioSelect from "../components/ProtocolRadioSelect";
import FavorDaoButton from "../components/FavorDaoButton";
import {Color, Padding} from "../GlobalStyles";
import {useEffect, useState} from "react";
import WalletController from "../lib/WalletController";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {StackNavigationProp} from "@react-navigation/stack";

const CreateWallet = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const create = () => {
        try {
            const mnemonic = WalletController.createPrivateKey(password);
            navigation.replace(Screens.MnemonicBackup, {
                mnemonic
            })
        } catch (e) {
            console.error(e);
        }
    }


    return <>
        <View style={styles.createWallet}>
            <FavorDaoNavBar
                title="Create wallet"
                vector={require("../assets/vector6.png")}
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
            <TouchableOpacity onPress={create}>
                <FavorDaoButton
                    textValue="Create"
                    frame1171275771BackgroundColor="#ff8d1a"
                    cancelColor="#fff"
                />
            </TouchableOpacity>
        </View>
    </>
};

const styles = StyleSheet.create({
    backgroundIcon: {
        height: 44,
        width: 375,
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
    createWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        overflow: "hidden",
        paddingHorizontal: Padding.p_base,
        paddingVertical: 0,
        alignItems: "center",
        // justifyContent: "center",
        width: "100%",
    },
});

export default CreateWallet;
