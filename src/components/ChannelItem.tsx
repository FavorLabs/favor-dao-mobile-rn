import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

type ChannelItemType = {
  /** Style props */
  channelItemMarginTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ChannelItem = ({ channelItemMarginTop }: ChannelItemType) => {
  const channelItemStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", channelItemMarginTop),
    };
  }, [channelItemMarginTop]);

  return (
    <View style={[styles.channelitem, channelItemStyle]}>
      <Image
        style={styles.channelavatarIcon}
        resizeMode="cover"
        source={require("../assets/channelavatar.png")}
      />
      <View style={styles.nameinput}>
        <Text style={styles.preSale}>Pre-Sale</Text>
      </View>
      <Image
        style={styles.channelitemChild}
        resizeMode="cover"
        source={require("../assets/daoSetting-delete.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  channelavatarIcon: {
    borderRadius: Border.br_9xs,
    width: 20,
    height: 20,
  },
  preSale: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    letterSpacing: 0,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
  },
  nameinput: {
    flex: 1,
    borderRadius: Border.br_5xs,
    backgroundColor: Color.color,
    overflow: "hidden",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_2xs,
    marginLeft: 9,
    flexDirection: "row",
  },
  channelitemChild: {
    width: 48,
    height: 34,
    marginLeft: 9,
  },
  channelitem: {
    width: 343,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default ChannelItem;
