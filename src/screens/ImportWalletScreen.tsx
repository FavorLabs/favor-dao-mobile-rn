import * as React from "react";
import {StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import {Padding, Color} from "../GlobalStyles";
import {useEffect, useMemo, useState} from "react";
import {useNavigation, useRoute} from '@react-navigation/native';
import ProtocolRadioSelect from "../components/ProtocolRadioSelect";
import WalletController from "../libs/walletController";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUrl} from "../utils/hook";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/global";
import {CometChat} from "@cometchat-pro/react-native-chat";
import UserApi from "../services/DAOApi/User";
import Favor from "../libs/favor";
import DaoApi from "../services/DAOApi/Dao";
import {getDAOInfo} from "../utils/util";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import * as buffer from "buffer";

const ImportWallet = () => {
    const url = useUrl();
    const navigation = useNavigation<StackNavigationProp<any>>()
    const dispatch = useDispatch();
    const route = useRoute();
    const {type} = route.params as { type: 'mnemonic' | 'privateKey' }
    const {userAgreement} = useSelector((state: Models) => state.global);
    const [mnemonic, setMnemonic] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(userAgreement);
    const [loading, setLoading] = useState(false);

    const createDisable = useMemo(() => {
        return !(
          agree && password && repeatPassword && mnemonic
        )
    }, [agree, password, repeatPassword, mnemonic]);


    const importMnemonic = async () => {
        WalletController.importMnemonic(password, mnemonic);
        const privateKey = WalletController.exportPrivateKey(password)
        await WalletController.login(url, privateKey);
    }

    const importPrivateKey = async () => {
        WalletController.importPrivateKey(password, mnemonic);
        await WalletController.login(url, Buffer.from(mnemonic,'hex'));
    }

    const importWallet = async () => {
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
            type === 'mnemonic' ? await importMnemonic() : await importPrivateKey();
            await getDAOInfo(dispatch);
            navigation.goBack();
        } catch (e) {
            if (e instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: e.message
                })
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            dispatch(globalUpdateState({
                userAgreement: false
            }));
        }
    }, [])

    useEffect(() => {
        setAgree(userAgreement)
    }, [userAgreement])

    return (
      <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}}
                              footerStyle={{backgroundColor: Color.color2}}>
          <KeyboardAwareScrollView contentContainerStyle={[styles.importWalletSpaceBlock]}>
              <FavorDaoNavBar
                title={type === 'mnemonic' ? 'Import wallet' : 'Import private key'}
              />
              <View style={styles.content}>
                  <ScrollView>
                      <View>
                          <TextInputBlock
                            title={
                                type === 'mnemonic' ? 'Mnemonic words' : 'Private key'
                            }
                            placeholder={
                                type === 'mnemonic' ? `Please enter mnemonic words，Separate with space...` : 'Please enter private key'
                            }
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
                      </View>
                  </ScrollView>
                  <View style={styles.bottom}>
                      <ProtocolRadioSelect value={agree} setValue={setAgree}/>
                      <TouchableOpacity style={[{marginTop: 10}, createDisable && {opacity: 0.5}]} disabled={loading}
                                        onPress={importWallet}>
                          <FavorDaoButton
                            isLoading={loading}
                            textValue="Import"
                            frame1171275771BackgroundColor="#ff8d1a"
                            cancelColor="#fff"
                          />
                      </TouchableOpacity>
                  </View>
              </View>
          </KeyboardAwareScrollView>
      </BackgroundSafeAreaView>
    );
};

const styles = StyleSheet.create({
    importWalletSpaceBlock: {
        paddingHorizontal: Padding.p_base,
        overflow: "hidden",
        flex: 1,
        backgroundColor: Color.color2,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottom: {
        marginBottom: 20,
    }
});

export default ImportWallet;
