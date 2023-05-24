import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import {Padding, Color} from "../GlobalStyles";
import {useMemo, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import ProtocolRadioSelect from "../components/ProtocolRadioSelect";
import WalletController from "../libs/walletController";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUrl} from "../utils/hook";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-toast-message";

const ImportWallet = () => {
    const url = useUrl();
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [mnemonic, setMnemonic] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const createDisable = useMemo(() => {
        return !(
          agree && password && repeatPassword && mnemonic
        )
    }, [agree,password,repeatPassword,mnemonic]);

    const importMnemonic = async () => {
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
            Toast.show({type: 'error', text1: 'Get privateKey error'});
        } finally {
            setLoading(false)
        }
    }

    return (
      <KeyboardAwareScrollView contentContainerStyle={[styles.importWallet, styles.importWalletSpaceBlock]}>
          <FavorDaoNavBar
            title="Import wallet"
            vector={require("../assets/vector6.png")}
          />
          <View style={styles.content}>
              <View>
                  <TextInputBlock
                    title={'Mnemonic words'}
                    placeholder={`Please enter mnemonic words，Separate with semicolons...`}
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
              <View>
                  <ProtocolRadioSelect value={agree} setValue={setAgree}/>
                  <TouchableOpacity style={[{marginTop: 10},createDisable && { opacity: 0.5 }]} disabled={loading} onPress={importMnemonic}>
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
    );
};

const styles = StyleSheet.create({
    importWalletSpaceBlock: {
        paddingHorizontal: Padding.p_base,
        overflow: "hidden",
    },
    importWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        height: 812,
        paddingVertical: 0,
        alignItems: "center",
        width: "100%",
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default ImportWallet;
