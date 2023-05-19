import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {getDebounce} from "../utils/util";
import {useEffect, useState} from "react";
import TextInputBlock from "./TextInputBlock";
import FavorDaoButton from "./FavorDaoButton";
import Toast from "react-native-toast-message";
import WalletController from "../libs/walletController";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useResourceUrl} from "../utils/hook";
import BottomSheetModal from "./BottomSheetModal";

type Props = {};
const WalletUser: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const { user } = useSelector((state: Models) => state.global);
  const avatarsResUrl = useResourceUrl('avatars');

  const [isBackUpShow,setBackUpIsShow] = useState<boolean>(false);
  const [password, setPassword] = useState('');

  const toBackUp = () => {
    setBackUpIsShow(true);
  };

  const Confirm = () => {
    if(!password) {
      return Toast.show({
        type: 'error',
        text1: 'No password entered!'
      });
    };
    try {
      const mnemonic =  WalletController.exportMnemonic(password);
      // @ts-ignore
      navigation.navigate(Screens.MnemonicBackup,{mnemonic: mnemonic});
      setBackUpIsShow(false);
    } catch (e) {
      return Toast.show({
        type: 'error',
        text1: 'Password Invalid!'
      });
    }
  };

  useEffect(() => {
    setPassword('');
  },[isBackUpShow])

  useEffect(() => {
    setBackUpIsShow(false);
  },[])

  return (
    <View style={styles.user}>
      <Image
        style={styles.avatarIcon}
        resizeMode="cover"
        source={{uri: `${avatarsResUrl}/${user?.avatar}`}}
      />
      <Text style={[styles.username, styles.xc8320fTypo]}>{user?.nickname}</Text>
      <View style={[styles.addressline, styles.addresslineFlexBox]}>
        <Text style={styles.shortaddress} numberOfLines={1}>{user?.address}</Text>
        <TouchableOpacity onPress={getDebounce(toBackUp)}>
        <View style={[styles.backupbutton, styles.addresslineFlexBox]}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/setting-backup-icon.png")}
          />
          <Text style={[styles.xc8320f, styles.xc8320fTypo]}>Backup</Text>
        </View>
        </TouchableOpacity>
      </View>

      <BottomSheetModal visible={isBackUpShow} setVisible={setBackUpIsShow}>
        <View style={styles.backUpDialog}>
          <Text style={styles.forMnemonic}>For mnemonic</Text>
          <TextInputBlock
            title={'Password'}
            placeholder={`Please enter passwords`}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={{marginTop:20}} onPress={Confirm}>
            <FavorDaoButton
              textValue="Confirm"
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
            />
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  backUpDialog: {
    flex: 1,
    paddingTop: 10,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  forMnemonic: {
    marginVertical: 20,
    fontFamily:FontFamily.headingH613,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
  },
  xc8320fTypo: {
    textAlign: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  shortaddress: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    width: 130,
  },
  addresslineFlexBox: {
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
  },
  avatarIcon: {
    width: 101,
    height: 100,
    borderRadius: 100,
  },
  username: {
    marginTop: 6,
  },
  icon: {
    width: 15,
    height: 15,
  },
  xc8320f: {
    width: 52,
    height: 22,
    marginLeft: 6,
  },
  backupbutton: {
    backgroundColor: Color.iOSSystemFillsLightTertiary,
    width: 93,
    marginLeft: 8,
    justifyContent: "center",
  },
  addressline: {
    borderStyle: "solid",
    borderColor: "#86868a",
    borderWidth: 1,
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_11xs,
    paddingRight: Padding.p_10xs,
    paddingBottom: Padding.p_11xs,
    marginTop: 6,
  },
  user: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalletUser;
