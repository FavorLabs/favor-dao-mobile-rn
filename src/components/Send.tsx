import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const Send = () => {
  return (
    <View style={styles.send}>
      <Image
        style={styles.mainbuttonIcon}
        resizeMode="cover"
        source={require("../assets/withdraw-icon.png")}
      />
      <Text style={styles.text}>Withdraw</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbuttonIcon: {
    borderRadius: Border.br_101xl,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    marginTop: 4,
  },
  send: {
    flex: 1,
    alignItems: "center",
    opacity: 0.5,
  },
});

export default Send;
