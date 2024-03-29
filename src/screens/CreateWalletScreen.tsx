import React, {useEffect} from "react";
import {StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
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
import {getDAOInfo} from "../utils/util";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import {strings} from "../locales/i18n";

const CreateWallet = () => {
  const url = useUrl();
  const navigation = useNavigation<StackNavigationProp<any>>()
  const dispatch = useDispatch();
  const {userAgreement} = useSelector((state: Models) => state.global);
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const createDisable = useMemo(() => {
    return !(
      agree && password && repeatPassword
    )
  }, [agree, password, repeatPassword]);

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
  }, [userAgreement])

  const createPK = () => {
    try {
      const mnemonic = WalletController.createMnemonic();
      setMnemonic(mnemonic);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `${strings('CreateWalletScreen.Toast.GetMnemonicError')}`
      });
    }
  }
  const create = async () => {
    if (createDisable) {
      return Toast.show({
        type: 'error',
        text1: `${strings('CreateWalletScreen.Toast.PleaseCompleteAllOptions')}`
      })
    }
    if (!password || password !== repeatPassword) {
      return Toast.show({
        type: 'error',
        text1: `${strings('CreateWalletScreen.Toast.TwoInconsistentPasswords')}`
      });
    }
    await setLoading(true);
    try {
      WalletController.importMnemonic(password, mnemonic);
      const privateKey = WalletController.exportPrivateKey(password)
      await WalletController.login(url, privateKey);
      await getDAOInfo(dispatch);
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
    <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}} footerStyle={{backgroundColor: Color.color2}}>
      <KeyboardAwareScrollView contentContainerStyle={styles.createWallet}>
        <FavorDaoNavBar title={strings('CreateWalletScreen.title')}/>

          <View style={styles.content}>
            <ScrollView>
            <View>
              <WalletWords mnemonicArray={mnemonicArray}/>
              <TextInputBlock
                title={strings('CreateWalletScreen.passwordTitle')}
                placeholder={strings('CreateWalletScreen.passwordPlaceholder')}
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
              />
              <TextInputBlock
                title={strings('CreateWalletScreen.ConfirmPasswordTitle')}
                placeholder={strings('CreateWalletScreen.ConfirmPasswordPlaceholder')}
                value={repeatPassword}
                setValue={setRepeatPassword}
                secureTextEntry={true}
              />
            </View>
            </ScrollView>
            <View style={styles.bottom}>
              <ProtocolRadioSelect value={agree} setValue={setAgree}/>
              <TouchableOpacity style={[{marginTop: 10}, createDisable && {opacity: 0.5}]} disabled={loading}
                                onPress={create}>
                <FavorDaoButton
                  isLoading={loading}
                  textValue={strings('CreateWalletScreen.CreateButton')}
                  frame1171275771BackgroundColor="#ff8d1a"
                  cancelColor="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAwareScrollView>
    </BackgroundSafeAreaView>
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
  },
  bottom: {
    marginBottom: 20,
  },
});

export default CreateWallet;
