import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { FontSize, FontFamily, Color, Padding, Border } from "../../../GlobalStyles";
import WalletUser from "../../../components/WalletUser";
import Receive from "../../../components/Receive";
import Send from "../../../components/Send";
import Transactions from "../../../components/Transactions";
import BalanceBackContainer from "../../../components/BalanceBackContainer";
import DAOManagementContainer from "../../../components/DAOManagementContainer";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
// import ServiceComponent from "../../../components/ServiceComponent";
// import PromotionTasks from "../../../components/PromotionTasks";

export type Props = {};
const SettingScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <WalletUser />
      <View style={styles.sendbar}>
        <Receive />
        <Send />
        <Transactions />
      </View>
      <View style={styles.settings1}>
        <BalanceBackContainer />
        <View style={styles.settingpannel}>
          <DAOManagementContainer />
          {/*<ServiceComponent />*/}
          {/*<PromotionTasks />*/}
        </View>
      </View>
      </ScrollView>
    </View>
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
    alignSelf: "stretch",
  },
  title: {
    fontSize: FontSize.size_15xl,
    letterSpacing: -1,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
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