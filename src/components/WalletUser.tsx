import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Color, FontFamily, FontSize, Border, Padding} from "../GlobalStyles";
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
import Clipboard from '@react-native-clipboard/clipboard';
import SvgIcon from "./SvgIcon";
import SettingBackupIcon from '../assets/svg/Setting/settingBackupIcon.svg';
import {strings} from "../locales/i18n";

type Props = {};
const WalletUser: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const {user} = useSelector((state: Models) => state.global);
  const avatarsResUrl = useResourceUrl('avatars');

  const [isBackUpShow, setBackUpIsShow] = useState<boolean>(false);
  const [password, setPassword] = useState('');

  const toBackUp = () => {
    setBackUpIsShow(true);
  };

  const Confirm = () => {
    if (!password) {
      return Toast.show({
        type: 'error',
        text1: strings('WalletUser.Toast.NoPassword')
      });
    }
    ;
    try {
      if (WalletController.type === 'privateKey') {
        const privateKey = WalletController.exportPrivateKeySting(password)
        // @ts-ignore
        navigation.navigate(Screens.MnemonicBackup, {mnemonic: privateKey, type: 'privateKey'});
      } else {
        const mnemonic = WalletController.exportMnemonic(password);
        if (mnemonic) {
          // @ts-ignore
          navigation.navigate(Screens.MnemonicBackup, {mnemonic: mnemonic, type: 'mnemonic'});
        }
      }
      setBackUpIsShow(false);
    } catch (e) {
      return Toast.show({
        type: 'error',
        text1: strings('WalletUser.Toast.PasswordInvalid')
      });
    }
  };

  const copyClick = async () => {
    Clipboard.setString(user?.address as string);
    const content = await Clipboard.getString();
    if (content === user?.address) {
      Toast.show({type: 'info', text1: strings('WalletUser.Toast.copySuccess')});
    } else {
      Toast.show({type: 'error', text1: strings('WalletUser.Toast.copyError')});
    }
  };

  useEffect(() => {
    setPassword('');
  }, [isBackUpShow])

  useEffect(() => {
    setBackUpIsShow(false);
  }, [])

  return (
    <View style={styles.user}>
      <Image
        style={styles.avatarIcon}
        resizeMode="cover"
        source={{uri: `${avatarsResUrl}/${user?.avatar}`}}
      />
      <Text style={[styles.username, styles.xc8320fTypo]}>{user?.nickname}</Text>
      <View style={[styles.addressline, styles.addresslineFlexBox]}>
        <TouchableWithoutFeedback onPress={copyClick}>
          <Text style={styles.shortaddress} numberOfLines={1}>{user?.address}</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={getDebounce(toBackUp)}>
          <View style={[styles.backupbutton, styles.addresslineFlexBox]}>
            <View style={{marginRight: 6}}>
              <SvgIcon svg={<SettingBackupIcon/>} width={15} height={15} />
            </View>
            <Text style={[styles.xc8320fTypo]} numberOfLines={1}>{strings('WalletUser.Backup')}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheetModal visible={isBackUpShow} setVisible={setBackUpIsShow}>
        <View style={styles.backUpDialog}>
          <Text
            style={styles.forMnemonic}>{WalletController.type === "privateKey" ? strings('WalletUser.forPrivateKey') : strings('WalletUser.forMnemonic')}</Text>
          <TextInputBlock
            title={strings('WalletUser.Password')}
            placeholder={strings('WalletUser.PasswordPlaceholder')}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={{marginTop: 20}} onPress={Confirm}>
            <FavorDaoButton
              textValue={strings('WalletUser.Confirm')}
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
    // flex: 1,
    paddingTop: 10,
  },
  forMnemonic: {
    marginVertical: 20,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 22,
  },
  xc8320fTypo: {
    textAlign: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  shortaddress: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
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
  backupbutton: {
    backgroundColor: Color.iOSSystemFillsLightTertiary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 8,
    justifyContent: "space-between",
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
