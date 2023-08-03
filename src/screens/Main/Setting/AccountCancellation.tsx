import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image,} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import FavorDaoButton from "../../../components/FavorDaoButton";
import UserApi from '../../../services/DAOApi/User';
import {useUrl} from "../../../utils/hook";
import {updateState as globalUpdateState} from "../../../store/global";
import {updateState as notifyUpdateState} from "../../../store/notify";
import Toast from "react-native-toast-message";
import { Color, FontFamily } from "../../../GlobalStyles";
import InputPassword from "../../../components/InputPassword";
import BottomSheetModal from "../../../components/BottomSheetModal";
import {SignatureData} from "../../../declare/api/DAOApi";
import WalletController from "../../../libs/walletController";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SvgIcon from "../../../components/SvgIcon";
import AccountIcon from '../../../assets/svg/Setting/accountIcon.svg'
import {strings} from "../../../locales/i18n";

const AccountCancellation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url = useUrl();
  const {user} = useSelector((state: Models) => state.global);
  const [globalBottomSheet, setGlobalBottomSheet] = useState<boolean>(false);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const showBottomSheet = async () => {
    setGlobalBottomSheet(true);
  }

  const close = () => {
    setGlobalBottomSheet(false)
  }

  const AccountCancellation = async (signatureData: SignatureData) => {
    close();
    try {
      setBtnLoading(true);
      await UserApi.accountCancellation(url, signatureData);
      await WalletController.logout(user?.address);
      dispatch(globalUpdateState({
        user: null,
        dao: null,
        newsJoinStatus: true,
        joinStatus: true,
        daoListStatus: true,
      }));
      dispatch(notifyUpdateState({
        messageRefresh: true
      }))
      Toast.show({
        type: 'info',
        text1: strings('AccountCancellation.success')
      })
      // @ts-ignore
      navigation.navigate(Screens.Main.Feeds);
    } catch (e) {
      Toast.show({
        type: 'error',
        // @ts-ignore
        text1: e.message
      })
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar title={strings('AccountCancellation.title')}/>

        <ScrollView>
          <View style={styles.topBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{strings('AccountCancellation.title')}</Text>
              <SvgIcon svg={<AccountIcon/>} width={60} height={51}/>
            </View>
            <Text style={styles.introduction}>
              {strings('AccountCancellation.Tips')}
            </Text>
          </View>

          <View style={styles.description}>
            <Text style={[styles.descriptionText, styles.topText]}>{strings('AccountCancellation.oneText')}</Text>
            <Text style={styles.descriptionText}>{strings('AccountCancellation.twoText')}</Text>
          </View>
        </ScrollView>

        <View style={styles.instanceParent}>
          <TouchableOpacity onPress={showBottomSheet}>
            <FavorDaoButton
              textValue={strings('AccountCancellation.Unregister')}
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
          <InputPassword fn={AccountCancellation} type={2}/>
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
    width: '55%',
    marginRight: 10,
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

export default AccountCancellation;
