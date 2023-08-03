import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,Platform} from 'react-native';
import {FontSize, FontFamily, Color, Padding, Border} from "../../../GlobalStyles";
import WalletUser from "../../../components/WalletUser";
import Receive from "../../../components/Receive";
import Send from "../../../components/Send";
import Transactions from "../../../components/Transactions";
import BalanceBackContainer from "../../../components/BalanceBackContainer";
import DAOManagementContainer from "../../../components/DAOManagementContainer";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import VPNSetting from "../../../components/VPNSetting";
import SvgIcon from "../../../components/SvgIcon";
import UnionSetting from '../../../assets/svg/Setting/unionSetting.svg';
import {strings} from "../../../locales/i18n";

const SettingScreen = () => {
  const navigation = useNavigation();
  const goToSetting = () => {
    // @ts-ignore
    navigation.navigate(Screens.UserSetting)
  }

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{strings('Setting.title')}</Text>

          <TouchableOpacity onPress={goToSetting} style={styles.settingIcon}>
            <SvgIcon svg={<UnionSetting/>} width={22} height={22}/>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <WalletUser/>
          <View style={styles.sendbar}>
            { Platform.OS === 'ios' ? <View style={{flex:1}}/> :<Receive/> }
            { Platform.OS === 'ios' ? <View style={{flex:1}}/> :<Send/> }
            <Transactions/>
          </View>
          <View style={styles.settings1}>
            <BalanceBackContainer/>
            <View style={styles.settingpannel}>
              <VPNSetting />
            </View>
            <View style={styles.settingpannel}>
              <DAOManagementContainer/>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    backgroundColor: Color.whitesmoke_300,
  },
  titleWrapper: {
    paddingHorizontal: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: FontSize.size_15xl,
    letterSpacing: -1,
    fontWeight: "700",
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
  },
  settingIcon: {
    marginRight: 6
  },
  sendbar: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  settings1: {
    paddingHorizontal: Padding.p_base,
    marginTop: 30,
    paddingVertical: 0,
    alignSelf: "stretch",
    alignItems: "center",
  },
  settingpannel: {
    marginTop: 15,
    alignSelf: "stretch",
  },
});

export default SettingScreen;
