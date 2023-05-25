import React, {useEffect} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import ProtocolRadioSelect from "../components/ProtocolRadioSelect";
import FavorDaoButton from "../components/FavorDaoButton";
import {Color, Padding} from "../GlobalStyles";
import {useMemo, useState} from "react";
import WalletController from "../libs/walletController";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUrl} from "../utils/hook";
import WalletWords from "../components/WalletWords";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/global";

const CreateWallet = () => {
    const url = useUrl();
    const navigation = useNavigation<StackNavigationProp<any>>()
    const dispatch = useDispatch();
    const { userAgreement } = useSelector((state: Models) => state.global);
    const [mnemonic, setMnemonic] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const createDisable = useMemo(() => {
        return !(
          agree && password && repeatPassword
        )
    }, [agree,password,repeatPassword]);

    useEffect(() => {
        createPK();
        return () => {
            dispatch(globalUpdateState({
                userAgreement: false
            }));
        }
    }, [])

    useEffect(() => {
        setAgree(userAgreement)
    },[userAgreement])

    const createPK = () => {
        try {
            const mnemonic = WalletController.createMnemonic();
            setMnemonic(mnemonic);
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Get mnemonic error'
            });
        }
    }
    const create = async () => {
        if (createDisable) {
            return Toast.show({
                type: 'error',
                text1: 'Please complete all options',
            })
        }
        if (!password || password !== repeatPassword) {
            return Toast.show({type: 'error', text1: 'Two inconsistent passwords'});
        }
        await setLoading(true);
        try {
            WalletController.importMnemonic(password, mnemonic);
            const privateKey = WalletController.exportPrivateKey(password)
            await WalletController.login(url, privateKey);
            navigation.goBack();
        } catch (e) {
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: e.message,
            });
        } finally {
            setLoading(false)
        }
    }

    const mnemonicArray = useMemo(() => {
        return mnemonic ? mnemonic.split(' ') : [];
    }, [mnemonic])

    return <>
        <KeyboardAwareScrollView contentContainerStyle={styles.createWallet}>
            <FavorDaoNavBar
              title="Create wallet"
              vector={require("../assets/vector6.png")}
            />
            <View style={styles.content}>
                <View>
                    <WalletWords mnemonicArray={mnemonicArray}/>
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
                </View>
                <View>
                    <ProtocolRadioSelect value={agree} setValue={setAgree}/>
                    <TouchableOpacity style={[{marginTop:10},createDisable && { opacity: 0.5 }]} disabled={loading} onPress={create}>
                        <FavorDaoButton
                          isLoading={loading}
                          textValue="Create"
                          frame1171275771BackgroundColor="#ff8d1a"
                          cancelColor="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    </>
};

const styles = StyleSheet.create({
    createWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        overflow: "hidden",
        paddingHorizontal: Padding.p_base,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

export default CreateWallet;
