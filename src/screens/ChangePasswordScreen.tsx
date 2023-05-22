import * as React from "react";
import {StyleSheet, View, Pressable} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import {Padding, Color} from "../GlobalStyles";
import {useState} from "react";
import WalletController from "../libs/walletController";
import Toast from "react-native-toast-message";

const ImportWallet = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const change = () => {
        setLoading(true)
        try {
            WalletController.exportMnemonic(oldPassword);
            if (password !== repeatPassword) {
                throw new Error('Two inconsistent passwords');
            }
            WalletController.changePassword(password, oldPassword);
        } catch (e) {
            Toast.show({
                type:'info',
                // @ts-ignore
                text1: e.message
            })
        } finally {
            setLoading(false);
        }
    }
    return (
      <View style={[styles.importWallet, styles.importWalletSpaceBlock]}>
          <FavorDaoNavBar
            title="Change Password"
            vector={require("../assets/vector6.png")}
          />
          <View style={styles.content}>
              <View>
                  <TextInputBlock
                    title={'Original password'}
                    placeholder={`Please enter original passwords`}
                    value={oldPassword}
                    setValue={setOldPassword}
                    secureTextEntry={true}
                  />
                  <TextInputBlock
                    title={'Password'}
                    placeholder={`Please enter new passwords`}
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                  />
                  <View style={{marginTop: -30}}>
                      <TextInputBlock
                        placeholder={`Please enter passwords again`}
                        value={repeatPassword}
                        setValue={setRepeatPassword}
                        secureTextEntry={true}
                      />
                  </View>
              </View>
              <Pressable style={{marginTop: 20}} disabled={loading} onPress={change}>
                  <FavorDaoButton
                    isLoading={loading}
                    textValue="Import"
                    frame1171275771BackgroundColor="#ff8d1a"
                    cancelColor="#fff"
                  />
              </Pressable>
          </View>


      </View>
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
