import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import {Color, FontFamily, FontSize, Border, Padding} from "../../GlobalStyles";
import {addDecimal} from "../../utils/balance";
import {useState} from "react";
import {toNumber} from "lodash";
import {strings} from "../../locales/i18n";

type ChatChannelType = {
  isShowAvatar?:boolean
  avatar: ImageSourcePropType;
  channelName: string;
  amount: number;
  time: string;
  isLuckKing?: boolean;
  record?: string;
};

const ChatChannel = ({avatar, channelName, amount, isLuckKing, record,time,isShowAvatar=true}: ChatChannelType) => {
  return (
    <View style={[styles.chatchannel, styles.chatchannelFlexBox]}>
      <Image
        style={[styles.notificationIconLayout,{display:isShowAvatar?'flex':'none'}]}
        resizeMode="cover"
        source={avatar}
      />
      <View
        style={[
          styles.channelitemwithseperator,
          styles.iconwithbackgroundFlexBox,
        ]}
      >
        <View style={styles.channelinfo}>
          <View style={styles.content}>
            <View
              style={[styles.channelnamelLasttime, styles.chatchannelFlexBox]}
            >
              <Text style={[styles.channelname, styles.channelnameFlexBox]}>
                {channelName}
              </Text>
              <Text style={[styles.lastmsgtime, styles.channelnameTypo]}>
                {
                  // @ts-ignore
                    parseFloat(amount)/1000
                } FavT
              </Text>
            </View>
            <View style={[styles.lastmessage,styles.chatchannelFlexBox]}>
              <Text style={[styles.messageinfo,styles.chatchannelFlexBox]}>
                {time}
              </Text>
              {
                isLuckKing &&
                  <View style={styles.luckrow}>
                      <Image
                          style={styles.luckImg}
                          resizeMode="cover"
                          source={require("../../assets/luck-king.png")}
                      />
                      <Text style={styles.luckText}>
                        {strings('ChatChannel.LuckKing')}
                      </Text>
                  </View>
              }
              {
                record &&
                <View>
                    <Text style={styles.recordText}>{record}</Text>
                </View>
              }
            </View>
          </View>
          <View style={styles.channelinfoChild}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatchannelFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconwithbackgroundFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  channelnameFlexBox: {
    textAlign: "left",
    letterSpacing: 0,
    flex: 1,
  },
  channelnameTypo: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "500",
    fontSize: FontSize.bodyBody17_size,
  },
  notificationIconLayout: {
    height: 50,
    width: 50,
    borderRadius:25
  },
  vectorIcon: {
    width: 23,
    height: 25,
    display: "none",
  },
  iconwithbackground: {
    borderRadius: 25,
    backgroundColor: Color.color2,
    display: "none",
    height: 50,
    width: 50,
    alignItems: "center",
  },
  channelname: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "500",
    fontSize: FontSize.bodyBody17_size,
  },
  lastmsgtime: {
    textAlign: "right",
  },
  channelnamelLasttime: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  messageinfo: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: '#999999',
  },
  lastmessage: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  luckrow: {
    flexDirection: 'row',
    alignItems: "center",
  },
  luckImg: {
    width: 18,
    height: 19,
  },
  luckText: {
    marginLeft: 5,
    color: Color.color,
    fontWeight: '400',
    fontSize: FontSize.size_mini
  },
  recordText: {
    color: '#999999',
    fontWeight: '400',
    fontSize: FontSize.size_mini
  },
  content: {
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
    overflow: "hidden",
    marginLeft: 8,
    flex: 1,
    alignSelf: "stretch",
  },
  chatchannel: {
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default ChatChannel;
