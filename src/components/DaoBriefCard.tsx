import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import {PostInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";
import {getDebounce} from "../utils/util";
import {useNavigation} from "@react-navigation/native";
import BottomSheet from "./BottomSheet";
import {useEffect, useState} from "react";
import PublishContainer from "./PublishContainer";
import Chats from "./Chats";
import DaoInfoHeader from "./DaoInfoHeader";

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

  // useEffect(() => {
  //   setIsShow(false);
  // },[])

  return (
    <View style={styles.container}>
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
        <DaoInfoHeader daoInfo={dao}/>
        <View style={styles.channelDao}>
          <PublishContainer daoInfo={dao}/>
          <Chats/>
        </View>
      </BottomSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '47%',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  channelDao: {
    flex: 1,
    padding: Padding.p_xs,
    alignItems: "center",
    justifyContent: 'center',
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
    textAlign: "left",
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 20,
    marginTop: 3,
  },
  briefinfo: {
    marginLeft: 8,
    flex: 1,
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
    width: '100%',
    height: 80,
    padding: Padding.p_3xs,
    justifyContent: "center",
  },
});

export default DaoBriefCard;
