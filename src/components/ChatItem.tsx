import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType, TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {getDebounce} from "../utils/util";
import {DaoInfo} from "../declare/api/DAOApi";

type Props = {
  daoInfo: DaoInfo
}

const ChatItem: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  const onPress = () => {}

  return (
    <TouchableOpacity onPress={getDebounce(onPress)}>
    <View style={[styles.notificationParent, styles.parentFlexBox]}>
      <View style={styles.notification}>
        <Image
          style={[styles.userImageIcon, styles.subtitlePosition]}
          resizeMode="cover"
          source={require("../assets/user-image8.png")}
        />
        <Text style={[styles.title, styles.titleClr]}>G</Text>
      </View>
      <View style={styles.channelinfoParent}>
        <View style={styles.channelinfo}>
          <View style={[styles.channelnamelLasttime, styles.parentFlexBox]}>
            <Text style={[styles.channelname, styles.subtitleFlexBox]}>
              General
            </Text>
            <Text style={[styles.lastmsgtime, styles.nehaTypo]}>5d ago</Text>
          </View>
          <View style={[styles.lastmessage, styles.parentFlexBox]}>
            <Text style={[styles.messageinfo, styles.subtitleFlexBox]}>
              {/*<Text style={[styles.neha, styles.nehaTypo]}>Neha</Text>*/}
              {/*<Text style={styles.hiYeahI}>*/}
              {/*  <Text style={styles.text}>{` `}</Text>*/}
              {/*  <Text style={styles.hiYeahI1}>: Hi, yeah i...</Text>*/}
              {/*</Text>*/}
            </Text>
            <View style={[styles.msgcountParent, styles.parentFlexBox]}>
              <View style={styles.msgcount}>
                <View style={styles.msgcountChild} />
                <Text style={[styles.subtitle, styles.subtitleFlexBox]}>
                  +99
                </Text>
              </View>
              <Image
                style={styles.enterIcon}
                resizeMode="cover"
                source={require("../assets/enter1.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.frameChild} />
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitlePosition: {
    top: "0%",
    height: "100%",
  },
  titleClr: {
    color: Color.color,
    lineHeight: 20,
    position: "absolute",
  },
  subtitleFlexBox: {
    textAlign: "left",
    letterSpacing: 0,
  },
  nehaTypo: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
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
  title: {
    width: "56%",
    top: "30%",
    left: "22%",
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    textAlign: "center",
    letterSpacing: 0,
    color: Color.color,
    fontSize: FontSize.paragraphP313_size,
  },
  notification: {
    width: 50,
    height: 50,
  },
  channelname: {
    fontSize: FontSize.size_mini,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 81,
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
  },
  lastmsgtime: {
    lineHeight: 18,
    color: '#909090',
    textAlign: "right",
    marginLeft: 32,
    flex: 1,
    fontSize: FontSize.paragraphP313_size,
    fontWeight: "500",
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
    textAlign: "left",
    fontSize: FontSize.paragraphP313_size,
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
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    color: Color.color,
    lineHeight: 20,
    position: "absolute",
    top: "0%",
    height: "100%",
    alignItems: "center",
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
});

export default ChatItem;
