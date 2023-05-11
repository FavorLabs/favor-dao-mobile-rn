import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const ShortAddress = () => {
  return <Text style={styles.shortaddress}>0xc8666B7...320f</Text>;
};

const styles = StyleSheet.create({
  shortaddress: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
  },
});

export default ShortAddress;
