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
import Toast from "react-native-toast-message";
import Favor from "../libs/favor";
import {h64} from "xxhashjs";
import {CometChat} from "@cometchat-pro/react-native-chat";
import Screens from "../navigation/RouteNames";
import navigation from "../navigation";
import {useNavigation} from "@react-navigation/native";
import DaoApi from "../services/DAOApi/Dao";
import {useEffect, useState} from "react";
import {useUrl} from "../utils/hook";

type Props = {
  daoInfo: DaoInfo;
  setIsShow?: (a: boolean) => void;
  isJoin?: boolean;
}

const ChatItem: React.FC<Props> = (props) => {
  const { daoInfo, setIsShow, isJoin } = props;
  const navigation = useNavigation();

  const toFeedsOfDao = async () => {
    if(isJoin === false){
      return Toast.show({
        type:'info',
        text1: 'You need to join this dao to enter the chat!!!'
      })
    }
    const str = `${Favor.bucket?.Settings.TagRegion.split('_')[1]}-${Favor.networkId}-group_${daoInfo.id}`
    const guid = h64(Buffer.from(str), 0).toString()
    const group = await CometChat.getGroup(guid)
    // @ts-ignore
    navigation.navigate(Screens.Main.Chat, {
      group,
      time: Date.now()
    })
    if(setIsShow) setIsShow(false)
  }

  return (
    <TouchableOpacity onPress={getDebounce(toFeedsOfDao)}>
    <View style={[styles.notificationParent, styles.parentFlexBox]}>
      <View style={styles.notification}>
        <Text style={styles.title}>G</Text>
      </View>
      <View style={styles.channelinfoParent}>
        <View style={styles.channelinfo}>
          <View style={[styles.channelnamelLasttime, styles.parentFlexBox]}>
            <Text style={[styles.channelname, styles.subtitleFlexBox]}>
              General
            </Text>
            {/*<Text style={[styles.lastmsgtime, styles.nehaTypo]}>5d ago</Text>*/}
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
                {/*<Text style={[styles.subtitle, styles.subtitleFlexBox]}>*/}
                {/*  +99*/}
                {/*</Text>*/}
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
  subtitleFlexBox: {
    textAlign: "left",
    letterSpacing: 0,
  },
  nehaTypo: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
  },
  title: {
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    textAlign: "center",
    letterSpacing: 0,
    color: Color.color,
    fontSize: FontSize.size_9xl,
  },
  notification: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
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
