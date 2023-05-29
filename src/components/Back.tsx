import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type BackType = {
  /** Style props */
  backColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Back = ({ backColor }: BackType) => {
  const backStyle = useMemo(() => {
    return {
      ...getStyleValue("color", backColor),
    };
  }, [backColor]);

  return (
    <View style={styles.back}>
      <Image
        style={styles.chevronLeftIcon}
        resizeMode="cover"
        source={require("../assets/chevronleft.png")}
      />
      <Text style={[styles.back1, backStyle]}>Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chevronLeftIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  back1: {
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: '400',
    color: Color.color1,
    textAlign: "left",
  },
  back: {
    width: 63,
    flexDirection: "row",
  },
});

export default Back;
