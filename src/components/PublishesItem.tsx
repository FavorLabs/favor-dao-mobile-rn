import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import {FontFamily, Color, FontSize, Border} from "../GlobalStyles";
import {getDebounce} from "../utils/util";
import {DaoInfo} from "../declare/api/DAOApi";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useResourceUrl} from "../utils/hook";
import SvgIcon from "./SvgIcon";
import NewsIcon from '../assets/svg/Dao/newsIcon.svg';
import VideoIcon from '../assets/svg/Dao/videoIcon.svg';
import RightArrow from '../assets/svg/Dao/rightArrow.svg';
import {strings} from "../locales/i18n";

type Props = {
  type: string;
  daoInfo: DaoInfo;
  lastPost?: {
    text: string;
    createTime: string;
  };
  setIsShow?: (a: boolean) => void;
};
const PublishesItem: React.FC<Props> = (props) => {
  const {type, daoInfo, lastPost, setIsShow} = props;
  const navigation = useNavigation();
  const avatarsResUrl = useResourceUrl('avatars');

  const onPress = () => {
    if (setIsShow) setIsShow(false)
    if (daoInfo.type === 0) {
      // @ts-ignore
      navigation.navigate(Screens.FeedsOfDAO, {daoInfo: daoInfo, type: type});
    } else {
      // @ts-ignore
      navigation.navigate(Screens.ToolDaoDetail, {daoInfo: daoInfo});
    }
  }

  return (
    <TouchableOpacity onPress={getDebounce(onPress)}>
      <View style={[styles.channelitemwithseperator, styles.iconwithbackgroundFlexBox,]}>
        {
          daoInfo.type === 0 ?
            <SvgIcon svg={type === strings('FeedsOfDaoTabBar.News') ? <NewsIcon/> : <VideoIcon/>} width={50} height={50}/>
            :
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source={{uri: `${avatarsResUrl}/${daoInfo.avatar}`}}
            />
        }
        <View style={styles.channelinfo}>
          <View style={styles.publishes}>
            <View style={styles.channelnamelLasttime}>
              <Text style={styles.channelname}>{type}</Text>
              <Text style={[styles.lastmsgtime, styles.subtitleTypo]} numberOfLines={1}>
                {lastPost?.createTime}
              </Text>
            </View>
            <View style={styles.lastmessage}>
              <Text style={[styles.messageinfo, styles.subtitleLayout]} numberOfLines={1}>
                {lastPost?.text}
              </Text>
              <View style={styles.msgcountParent}>
                <SvgIcon svg={<RightArrow/>} width={18} height={18}/>
              </View>
            </View>
          </View>
          <View style={styles.channelinfoChild}/>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  iconwithbackgroundFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  subtitleTypo: {
    fontWeight: '500',
  },
  subtitleLayout: {
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0,
  },
  vectorIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
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
    fontWeight: '500',
    flex: 1,
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  lastmsgtime: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    color: '#939393',
    textAlign: "right",
    marginLeft: 12,
  },
  channelnamelLasttime: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  messageinfo: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
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
    fontWeight: '500',
    alignItems: "center",
  },
  msgcount: {
    display: "none",
    height: 14,
    width: 23,
  },
  msgcountParent: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
    alignItems: 'center',
  },
});

export default PublishesItem;
