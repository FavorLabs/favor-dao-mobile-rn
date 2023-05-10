import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import {PostInfo} from "../declare/global";
import {useResourceUrl} from "../utils/hook";
import {getDebounce} from "../utils/util";
import {useNavigation} from "@react-navigation/native";
import BottomSheet from "./BottomSheet";
import {useEffect, useState} from "react";
import PublishContainer from "./PublishContainer";
import Chats from "./Chats";

type Props = {
  daoCardInfo: PostInfo
}

const DaoBriefCard: React.FC<Props> = (props) => {
  const { dao } = props.daoCardInfo;
  const avatarsResUrl = useResourceUrl('avatars');
  const navigation = useNavigation();

  const [isShow,setIsShow] = useState<boolean>(false);

  const toFeedsOfDao = () => {
    setIsShow(true);
  }

  useEffect(() => {
    setIsShow(false);
  },[])

  return (
    <View>
      <TouchableOpacity onPress={getDebounce(toFeedsOfDao)}>
        <View style={styles.daoBriefCard}>
          <View style={styles.infowithavatar}>
            <Image
              style={styles.avatarIcon}
              resizeMode="cover"
              source={{uri: `${avatarsResUrl}/${dao.avatar}`}}
            />
            <View style={styles.briefinfo}>
              <Text style={styles.title} numberOfLines={1}>{dao.name}</Text>
              <Text style={[styles.subtitle, styles.subtitleTypo]} numberOfLines={1}>
                Joined: {dao.follow_count}
              </Text>
            </View>
          </View>
          <Text style={[styles.subtitle1, styles.subtitleTypo]} numberOfLines={1}>
            {dao.introduction}
          </Text>
        </View>
      </TouchableOpacity>

      <BottomSheet show={isShow}>
        <View style={styles.channelDao}>
          <PublishContainer />
          <Chats/>
        </View>
      </BottomSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  channelDao: {
    width: 343,
    padding: Padding.p_xs,
    alignItems: "center",
    backgroundColor: Color.color1,
  },
  subtitleTypo: {
    color: Color.iOSSystemLabelsLightSecondary,
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
    letterSpacing: 0,
  },
  avatarIcon: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  title: {
    fontSize: FontSize.size_mini,
    lineHeight: 23,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 87,
    textAlign: "left",
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 20,
    width: 96,
    marginTop: 3,
  },
  briefinfo: {
    marginLeft: 8,
  },
  infowithavatar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  subtitle1: {
    fontSize: FontSize.size_5xs,
    lineHeight: 16,
    marginTop: 4,
    alignSelf: "stretch",
  },
  daoBriefCard: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    width: 170,
    height: 80,
    padding: Padding.p_3xs,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
  },
});

export default DaoBriefCard;
