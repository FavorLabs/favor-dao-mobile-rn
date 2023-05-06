import React, { useMemo } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";

type PostDetailHeaderType = {
  title?: string;

  /** Style props */
  postDetailHeaderWidth?: number | string;
  postDetailHeaderPaddingHorizontal?: number | string;
  postDetailHeaderAlignSelf?: string;

  /** Action props */
  onBackPress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const PostDetailHeader = ({
  onBackPress,
  postDetailHeaderWidth,
  postDetailHeaderPaddingHorizontal,
  postDetailHeaderAlignSelf,
  title,
}: PostDetailHeaderType) => {
  const postDetailHeaderStyle = useMemo(() => {
    return {
      ...getStyleValue("width", postDetailHeaderWidth),
      ...getStyleValue("paddingHorizontal", postDetailHeaderPaddingHorizontal),
      ...getStyleValue("alignSelf", postDetailHeaderAlignSelf),
    };
  }, [
    postDetailHeaderWidth,
    postDetailHeaderPaddingHorizontal,
    postDetailHeaderAlignSelf,
  ]);

  return (
    <View style={[styles.postdetailHeader, postDetailHeaderStyle]}>
      <Pressable style={styles.back} onPress={onBackPress}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/back1.png")}
        />
      </Pressable>
      <Image
        style={styles.imageIcon}
        resizeMode="cover"
        source={require("../assets/image3.png")}
      />
      <View style={styles.info}>
        <Text style={[styles.title, styles.titleTypo]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.subtitle, styles.titleTypo]} numberOfLines={1}>
          1h ago
        </Text>
      </View>
      <View style={styles.follow}>
        <View style={[styles.joined, styles.join1FlexBox]}>
          <Text style={[styles.join, styles.joinTypo]}>Joined</Text>
        </View>
        <View style={[styles.join1, styles.join1FlexBox]}>
          <Text style={[styles.join2, styles.joinTypo]}>Join</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  join1FlexBox: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_xs,
    width: 64,
    borderRadius: Border.br_lg,
    paddingVertical: Padding.p_9xs,
    alignItems: "center",
    flexDirection: "row",
  },
  joinTypo: {
    textAlign: "center",
    fontSize: FontSize.paragraphP313_size,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 23,
    letterSpacing: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  back: {
    width: 24,
    height: 24,
  },
  imageIcon: {
    borderRadius: Border.br_5xs,
    width: 43,
    height: 40,
    marginLeft: 12,
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 158,
    lineHeight: 23,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 251,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  join: {
    color: Color.color3,
  },
  joined: {
    borderStyle: "solid",
    borderColor: "#8a8a8e",
    borderWidth: 1,
    display: "none",
  },
  join2: {
    color: Color.color,
  },
  join1: {
    backgroundColor: Color.color2,
    marginLeft: 10,
  },
  follow: {
    borderRadius: Border.br_29xl,
    overflow: "hidden",
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_9xs,
    marginLeft: 12,
    flexDirection: "row",
  },
  postdetailHeader: {
    alignSelf: "stretch",
    backgroundColor: Color.color1,
    height: 90,
    paddingTop: Padding.p_29xl,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default PostDetailHeader;
