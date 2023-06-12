import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import WalletWords from "../components/WalletWords";
import {FontFamily, Color, FontSize, Border, Padding} from "../GlobalStyles";
import FavorDaoButton from "../components/FavorDaoButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useMemo} from "react";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import TextInputBlock from "../components/TextInputBlock";
import {Icon} from "@rneui/themed";
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from "react-native-toast-message";

const Mnemonic = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const {mnemonic, type} = route.params as { mnemonic: string, type: 'mnemonic' | 'privateKey' }

  const mnemonicArray = useMemo(() => {
    return mnemonic?.split(' ') || [];
  }, [mnemonic])

  const backUp = () => {
    navigation.goBack();
  };

  return (
    <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}} footerStyle={{backgroundColor: Color.color2}}>
      <View style={styles.mnemonic}>
        <FavorDaoNavBar
          title={type === 'privateKey' ? 'Private Key' : 'Mnemonic words'}
          vector={require("../assets/vector6.png")}
        />
        <ScrollView>
          <View style={styles.titleParent}>
            <Text style={[styles.title, styles.titleLayout]}>{`Backup`}</Text>
            <Text style={[styles.title1, styles.titleLayout]}>
              Please copy the {type === 'privateKey' ? 'Private Key' : 'Mnemonic words'} in order to ensure accurate
              backup
            </Text>
          </View>
          {
            type === 'privateKey' ?
              <View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20
                }}>
                  <Text style={styles.title2}>Private Key</Text>
                  <TouchableOpacity onPress={() => {
                    Clipboard.setString(mnemonic);
                    Toast.show({
                      type: 'success',
                      text1: "copy success"
                    })
                  }}>
                    <Icon size={20} name={'copy1'} type={'antdesign'}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.textBox}>
                  <Text style={{lineHeight: 20, letterSpacing: 0.5}}>
                    {mnemonic}
                  </Text>
                </View>
              </View> :
              <WalletWords mnemonicArray={mnemonicArray}/>
          }

        </ScrollView>
      </View>
      <TouchableOpacity onPress={backUp} style={styles.backupButton}>
        <FavorDaoButton
          textValue="Backup"
          frame1171275771BackgroundColor="#ff8d1a"
          cancelColor="#fff"
        />
      </TouchableOpacity>
    </BackgroundSafeAreaView>
  );
};

const styles = StyleSheet.create({
  backupButton: {
    paddingHorizontal: Padding.p_base,
    marginBottom: 20,
  },
  titleLayout: {
    width: '85%',
    textAlign: "left",
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
  },
  title: {
    color: Color.iOSSystemLabelsLightPrimary,
    height: 25,
    fontSize: FontSize.bodyBody17_size,
    textAlign: "left",
    fontWeight: '400',
    lineHeight: 22,
  },
  title1: {
    fontSize: FontSize.size_xs,
    color: Color.color4,
    height: 48,
  },
  titleParent: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  create: {
    lineHeight: 23,
    fontWeight: "600",
    color: Color.color1,
    textAlign: "center",
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
  },
  mnemonic: {
    backgroundColor: Color.color2,
    flex: 1,
    paddingHorizontal: Padding.p_base,
  },
  title2: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  textBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: Border.br_3xs,
    padding: Padding.p_smi,
    paddingTop: Padding.p_smi,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Mnemonic;
