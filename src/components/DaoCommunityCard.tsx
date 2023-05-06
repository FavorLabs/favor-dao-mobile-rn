import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {PostInfo} from "../declare/global";
import {useResourceUrl} from "../utils/hook";

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

  const avatarsResUrl = useResourceUrl('avatars');
  const imagesResUrl = useResourceUrl('images');

  return (
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
        <View style={[styles.groupParent, styles.labelFlexBox]}>
          <View style={styles.subtitleParent}>
            <Text style={styles.subtitle}>joined: {dao.follow_count}</Text>
            <Text style={[styles.title, styles.titleClr]}>{dao.name}</Text>
          </View>
          <View style={styles.labelWrapper}>
            <View style={[styles.label, styles.labelFlexBox]}>
              <Text style={styles.label1}>8 level</Text>
            </View>
          </View>
        </View>
        <View style={[styles.groupParent, styles.labelFlexBox]}>
          <Text style={[styles.description, styles.titleClr]} numberOfLines={3}>
            {dao.introduction}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentBg: {
    backgroundColor: Color.color1,
    borderRadius: Border.br_3xs,
  },
  labelFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleClr: {
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    letterSpacing: 0,
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
    top: 26,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    left: 0,
    position: "absolute",
    width: 114,
  },
  title: {
    top: 0,
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    left: 0,
    position: "absolute",
    width: 114,
  },
  subtitleParent: {
    height: 46,
    width: 114,
  },
  label1: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
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
  description: {
    lineHeight: 21,
    fontFamily: FontFamily.paragraphP313,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
    flex: 1,
    height: 63,
    overflow: "hidden",
  },
  ellipseParent: {
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_base,
    marginTop: -36,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    marginRight: 10,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    width: 240,
    height: 240,
    // overflow: 'hidden',
  },
});

export default DaoCommunityCard;
