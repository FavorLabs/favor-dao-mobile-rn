import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image,} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import FavorDaoButton from "../../../components/FavorDaoButton";
import {updateState as globalUpdateState} from "../../../store/global";
import {updateState as notifyUpdateState} from "../../../store/notify";
import Toast from "react-native-toast-message";
import {Color, FontFamily} from "../../../GlobalStyles";
import WalletController from '../../../libs/walletController';
import BottomSheetModal from "../../../components/BottomSheetModal";
import InputPassword from "../../../components/InputPassword";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import LogOutIcon from '../../../assets/svg/Setting/logOutIcon.svg';
import SvgIcon from "../../../components/SvgIcon";
import {strings} from "../../../locales/i18n";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user} = useSelector((state: Models) => state.global);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [globalBottomSheet, setGlobalBottomSheet] = useState<boolean>(false);

  const showBottomSheet = async () => {
    setGlobalBottomSheet(true);
  }

  const logOut = async () => {
    close();
    try {
      setBtnLoading(true);
      await WalletController.logout(user?.address);
      Toast.show({
        type: 'info',
        text1: strings('LogOut.success')
      })
      dispatch(globalUpdateState({
        user: null,
        dao: null,
        newsJoinStatus: true,
        joinStatus: true,
      }));
      dispatch(notifyUpdateState({
        messageRefresh: true
      }));
      // @ts-ignore
      navigation.navigate(Screens.Main.Feeds);
    } catch (e) {
      Toast.show({
        type: 'error',
        // @ts-ignore
        text1: e.message
      })
    } finally {
      setBtnLoading(false)
    }
  };

  const close = () => {
    setGlobalBottomSheet(false)
  }

  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar title={strings('LogOut.title')}/>

        <ScrollView>
          <View style={styles.topBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{strings('LogOut.title')}</Text>
              <SvgIcon svg={<LogOutIcon/>} width={40} height={40}/>
            </View>
            <Text style={styles.introduction}>
              {strings('LogOut.Tips')}
            </Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>{strings('LogOut.logOutText')}</Text>
          </View>
        </ScrollView>

        <View style={styles.instanceParent}>
          <TouchableOpacity onPress={showBottomSheet}>
            <FavorDaoButton
              textValue={strings('LogOut.title')}
              frame1171275771BackgroundColor="#FF564F"
              cancelColor="#fff"
              isLoading={btnLoading}
            />
          </TouchableOpacity>
        </View>

        <BottomSheetModal
          visible={globalBottomSheet}
          setVisible={close}
        >
          <InputPassword psd={logOut}/>
        </BottomSheetModal>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  instanceParent: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  topBlock: {
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    color: Color.iOSSystemLabelsLightPrimary,
    marginRight: 20,
  },
  introduction: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#999999'
  },
  description: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Color.color1,
  },
  descriptionText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  topText: {
    marginBottom: 20
  }
})

export default LogOut;
