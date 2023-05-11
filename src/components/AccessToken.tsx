import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";

type AccessTokenType = {
  socialMediaAccessToken?: string;

  /** Style props */
  propMarginTop?: number | string;
  propDisplay?: string;
  propDisplay1?: string;
  propDisplay2?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AccessToken = ({
  socialMediaAccessToken,
  propMarginTop,
  propDisplay,
  propDisplay1,
  propDisplay2,
}: AccessTokenType) => {
  const accessTokenStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  const mditwitterIconStyle = useMemo(() => {
    return {
      ...getStyleValue("display", propDisplay),
    };
  }, [propDisplay]);

  const biyoutubeIconStyle = useMemo(() => {
    return {
      ...getStyleValue("display", propDisplay1),
    };
  }, [propDisplay1]);

  const vectorIconStyle = useMemo(() => {
    return {
      ...getStyleValue("display", propDisplay2),
    };
  }, [propDisplay2]);

  return (
    <View style={[styles.accesstoken, accessTokenStyle]}>
      <View style={styles.header}>
        <Image
          style={[styles.mditwitterIcon, mditwitterIconStyle]}
          resizeMode="cover"
          source={require("../assets/twitter-icon.png")}
        />
        <Image
          style={[styles.biyoutubeIcon, styles.iconLayout, biyoutubeIconStyle]}
          resizeMode="cover"
          source={require("../assets/youtube-icon.png")}
        />
        <Image
          style={[styles.iconLayout, vectorIconStyle]}
          resizeMode="cover"
          source={require("../assets/vector-icon.png")}
        />
        <Text style={styles.twitterAccessToken}>{socialMediaAccessToken}</Text>
        <Text style={[styles.help, styles.helpTypo]}>Help</Text>
      </View>
      <View style={styles.tokeninput}>
        <Text style={[styles.accesstoken1, styles.helpTypo]}>
          NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRl.....
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    marginLeft: 15,
    display: "none",
    height: 16,
    width: 16,
  },
  helpTypo: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    textAlign: "left",
    letterSpacing: 0,
  },
  mditwitterIcon: {
    overflow: "hidden",
    height: 16,
    width: 16,
  },
  biyoutubeIcon: {
    overflow: "hidden",
  },
  twitterAccessToken: {
    flex: 1,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    letterSpacing: 0,
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.paragraphP313,
    marginLeft: 15,
  },
  help: {
    textDecoration: "underline",
    color: Color.color2,
    fontSize: FontSize.capsCaps310SemiBold_size,
    fontFamily: FontFamily.paragraphP313,
    marginLeft: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  accesstoken1: {
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
    color: Color.iOSSystemLabelsLightPrimary,
    fontSize: FontSize.capsCaps310SemiBold_size,
  },
  tokeninput: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.color,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    height: 35,
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: 0,
    justifyContent: "center",
    marginTop: 5,
    alignSelf: "stretch",
  },
  accesstoken: {
    alignSelf: "stretch",
  },
});

export default AccessToken;
