import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {PostInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";
import {useNavigation} from "@react-navigation/native";
import {getDebounce} from "../utils/util";
import Screens from "../navigation/RouteNames";
import TextParsed from "./TextParsed";

type Props = {
  // daoCardInfo: {
  //   backgroundImg : any,
  //   avatar: any,
  //   daoName: string,
  //   joined: string,
  //   level: string,
  //   description: string
  // };
  daoCardInfo: PostInfo
};

const DaoCommunityCard: React.FC<Props> = (props) => {
  const { dao } = props.daoCardInfo;
  const navigation = useNavigation();

  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');

  const onPress = () => {
    if(dao.type === 0) {
      // @ts-ignore
      navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : dao, type : 'Mixed'});
    } else {
      // @ts-ignore
      navigation.navigate(Screens.ToolDaoDetail, { daoInfo: dao});
    }

  }

  return (
    <TouchableOpacity onPress={getDebounce(onPress)}>
    <View style={[styles.frameParent, styles.frameParentBg]}>
      <View style={[styles.previewWrapper, styles.frameParentBg]}>
        <Image
          style={styles.previewIcon}
          resizeMode="cover"
          source={{uri: `${imagesResUrl}/${dao.banner}`}}
        />
      </View>
      <View style={styles.ellipseParent}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={{uri: `${avatarsResUrl}/${dao.avatar}`}}
        />
        <View style={styles.groupParent}>
          <View style={styles.subtitleParent}>
            <Text style={styles.daoName} numberOfLines={1}>{dao.name}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>joined: {dao.follow_count}</Text>
          </View>
          <View style={styles.labelWrapper}>
            {/*<View style={[styles.label, styles.labelFlexBox]}>*/}
            {/*  <Text style={styles.label1}>8 level</Text>*/}
            {/*</View>*/}
          </View>
        </View>
        <View style={styles.introductionRow}>
          {/* @ts-ignore */}
          <TextParsed content={dao.introduction} style={[styles.description, styles.titleClr]} numberOfLines={3} />
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frameParentBg: {
    backgroundColor: Color.color1,
    borderRadius: Border.br_3xs,
  },
  previewIcon: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    maxWidth: "100%",
    overflow: "hidden",
    height: 72,
    width: "100%",
    alignSelf: "stretch",
  },
  previewWrapper: {
    alignSelf: "stretch",
  },
  frameChild: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  subtitle: {
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    textAlign: "left",
    fontWeight: '400',
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  daoName: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: '600',
    color: Color.iOSSystemLabelsLightPrimary,
  },
  subtitleParent: {
  },
  label1: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    fontWeight: "500",
    color: Color.color,
    textAlign: "center",
    letterSpacing: 0,
  },
  label: {
    borderRadius: Border.br_base,
    backgroundColor: Color.darkorange_100,
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
  },
  labelWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  groupParent: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  introductionRow: {
    marginTop: 10,
  },
  description: {
    lineHeight: 21,
    fontWeight: '400',
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  ellipseParent: {
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_base,
    marginTop: -36,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    height: '100%'
  },
});

export default DaoCommunityCard;
