import * as React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import ChatItem from "./ChatItem";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";

type Props = {
  daoInfo: DaoInfo
}

const Chats: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  return (
    <View style={styles.chats}>
      <Text style={[styles.title, styles.titleClr]}>Chats</Text>
      <ChatItem daoInfo={daoInfo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  titleClr: {
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: "left",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitlePosition: {
    top: "0%",
    height: "100%",
  },
  title1Clr: {
    color: Color.color,
    lineHeight: 20,
    position: "absolute",
    letterSpacing: 0,
  },
  nehaTypo: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
  },
  title: {
    fontSize: FontSize.size_mid,
    width: 87,
    textAlign: "left",
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
  },
  userImageIcon: {
    width: "100%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  title1: {
    width: "56%",
    top: "30%",
    left: "22%",
    textAlign: "center",
    fontSize: FontSize.paragraphP313_size,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
  },
  notification: {
    width: 50,
    height: 50,
  },
  channelname: {
    fontSize: FontSize.size_mini,
    width: 81,
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
  },
  lastmsgtime: {
    lineHeight: 18,
    color: Color.color3,
    textAlign: "right",
    marginLeft: 32,
    flex: 1,
    fontSize: FontSize.paragraphP313_size,
  },
  channelnamelLasttime: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  neha: {
    color: Color.darkslategray_100,
  },
  text: {
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
  },
  hiYeahI1: {
    fontFamily: FontFamily.paragraphP313,
  },
  hiYeahI: {
    color: Color.iOSSystemLabelsLightSecondary,
  },
  messageinfo: {
    flex: 1,
    lineHeight: 20,
    fontSize: FontSize.paragraphP313_size,
    textAlign: "left",
    letterSpacing: 0,
  },
  msgcountChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_6xs,
    backgroundColor: Color.color2,
    width: 23,
    height: 14,
    position: "absolute",
  },
  subtitle: {
    width: "95.65%",
    left: "4.35%",
    fontSize: FontSize.capsCaps310SemiBold_size,
    display: "flex",
    color: Color.color,
    lineHeight: 20,
    position: "absolute",
    letterSpacing: 0,
    top: "0%",
    height: "100%",
    alignItems: "center",
    textAlign: "left",
  },
  msgcount: {
    height: 14,
    flex: 1,
  },
  enterIcon: {
    width: 21,
    height: 18,
    overflow: "hidden",
  },
  msgcountParent: {
    width: 45,
    justifyContent: "flex-end",
    marginLeft: 31,
    alignItems: "center",
  },
  lastmessage: {
    marginTop: 4,
    alignItems: "center",
    alignSelf: "stretch",
  },
  channelinfo: {
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#c1c1c4",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 10,
    alignSelf: "stretch",
  },
  channelinfoParent: {
    marginLeft: 8,
    flex: 1,
  },
  notificationParent: {
    marginTop: 16,
    alignItems: "center",
    alignSelf: "stretch",
  },
  chats: {
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default Chats;
