import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,ScrollView} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import {DaoInfo, PostInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";
import {getDebounce} from "../utils/util";
import {useState} from "react";
import {strings} from "../locales/i18n";

type Props = {
  daoCardInfo: DaoInfo
}

const DaoBriefCard: React.FC<Props> = (props) => {
  const { daoCardInfo } = props
  const avatarsResUrl = useResourceUrl('avatars');

  return (
    <View style={styles.container}>
        <View style={styles.daoBriefCard}>
          <View style={styles.infowithavatar}>
            <Image
              style={styles.avatarIcon}
              resizeMode="cover"
              source={{uri: `${avatarsResUrl}/${daoCardInfo.avatar}`}}
            />
            <View style={styles.briefinfo}>
              <Text style={styles.title} numberOfLines={1}>{daoCardInfo.name}</Text>
              <Text style={[styles.subtitle, styles.subtitleTypo]} numberOfLines={1}>
                {strings('DAO.Joined')}: {daoCardInfo.follow_count}
              </Text>
            </View>
          </View>
          <Text style={[styles.subtitle1, styles.subtitleTypo]} numberOfLines={1}>
            {daoCardInfo.introduction}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: '400',
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
    fontWeight: "500",
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
    height: '100%',
    padding: Padding.p_3xs,
    justifyContent: "center",
  },
});

export default DaoBriefCard;
