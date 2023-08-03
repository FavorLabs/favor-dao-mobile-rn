import * as React from "react";
import {StyleSheet, View, Pressable} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import TextInputBlock from "../../../components/TextInputBlock";
import FavorDaoButton from "../../../components/FavorDaoButton";
import {Padding, Color} from "../../../GlobalStyles";
import {useMemo, useState} from "react";
import WalletController from "../../../libs/walletController";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {strings} from "../../../locales/i18n";

const ImportWallet = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const confirmDisable = useMemo(() => {
    return !(
      oldPassword && password && repeatPassword
    )
  }, [oldPassword, password, repeatPassword]);

  const change = () => {
    if (confirmDisable) {
      return Toast.show({
        type: 'error',
        text1: strings('ChangePassword.Toast.allOptions'),
      })
    }
    setLoading(true)
    try {
      WalletController.exportMnemonic(oldPassword);
      if (password !== repeatPassword) {
        return Toast.show({type: 'error', text1: strings('ChangePassword.Toast.twoPasswords')})
      }
      WalletController.changePassword(password, oldPassword);
      navigation.goBack();
      Toast.show({
        type: 'info',
        // @ts-ignore
        text1: strings('ChangePassword.Toast.successfully')
      })
    } catch (e) {
      Toast.show({
        type: 'error',
        // @ts-ignore
        text1: strings('ChangePassword.Toast.OriginalWrong')
      })
    } finally {
      setLoading(false);
    }
  }
  return (
    <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}} footerStyle={{backgroundColor: Color.color2}}>
      <View style={[styles.importWallet, styles.importWalletSpaceBlock]}>
        <FavorDaoNavBar title={strings('ChangePassword.title')}/>
        <View style={styles.content}>
          <View>
            <TextInputBlock
              title={strings('ChangePassword.OriginalPassword')}
              placeholder={strings('ChangePassword.OriginalPasswordPlaceholder')}
              value={oldPassword}
              setValue={setOldPassword}
              secureTextEntry={true}
            />
            <TextInputBlock
              title={strings('ChangePassword.Password')}
              placeholder={strings('ChangePassword.PasswordPlaceholder')}
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <TextInputBlock
              placeholder={strings('ChangePassword.passwordsAgain')}
              value={repeatPassword}
              setValue={setRepeatPassword}
              secureTextEntry={true}
            />
          </View>
          <Pressable style={[{marginTop: 20}, confirmDisable && {opacity: 0.5}]} disabled={loading} onPress={change}>
            <FavorDaoButton
              isLoading={loading}
              textValue={strings('ChangePassword.Confirm')}
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
            />
          </Pressable>
        </View>


      </View>
    </BackgroundSafeAreaView>
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
    paddingVertical: 0,
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default ImportWallet;
