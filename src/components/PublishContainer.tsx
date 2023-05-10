import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import PublishesItem from "./PublishesItem";
import {DaoInfo} from "../declare/global";

type Props = {
  daoInfo: DaoInfo;
};
const PublishContainer: React.FC<Props> = (props) => {
  const { daoInfo } = props;

  return (
    <View style={styles.publishes}>
      <Text style={styles.title}>Publishes</Text>
      <PublishesItem type={'News'} daoInfo={daoInfo}/>
      <PublishesItem type={'Videos'} daoInfo={daoInfo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  iconwithbackgroundFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  subtitleTypo: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
  },
  subtitleLayout: {
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0,
  },
  title: {
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  vectorIcon: {
    height: 25,
    width: 23,
  },
  iconwithbackground: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    backgroundColor: Color.color2,
  },
  channelname: {
    textAlign: "left",
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    flex: 1,
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  lastmsgtime: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    color: Color.color3,
    textAlign: "right",
    width: 70,
    marginLeft: 12,
  },
  channelnamelLasttime: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  messageinfo: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.paragraphP313,
    color: Color.iOSSystemLabelsLightSecondary,
    flex: 1,
  },
  msgcountChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_6xs,
    width: 22,
    position: "absolute",
    height: 14,
    backgroundColor: Color.color2,
  },
  subtitle: {
    height: "100%",
    width: "95.65%",
    top: "0%",
    left: "4.35%",
    fontSize: FontSize.capsCaps310SemiBold_size,
    color: Color.color,
    display: "flex",
    position: "absolute",
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    alignItems: "center",
  },
  msgcount: {
    display: "none",
    height: 14,
    width: 23,
  },
  enterIcon: {
    height: 18,
    overflow: "hidden",
    width: 18,
  },
  msgcountParent: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 18,
    marginLeft: 12,
    flexDirection: "row",
  },
  lastmessage: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  publishes: {
    alignSelf: "stretch",
  },
  channelinfoChild: {
    borderStyle: "solid",
    borderColor: "#c1c1c4",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 12,
    alignSelf: "stretch",
  },
  channelinfo: {
    marginLeft: 10,
    flex: 1,
  },
  channelitemwithseperator: {
    marginTop: 16,
    alignSelf: "stretch",
  },
});

export default PublishContainer;
