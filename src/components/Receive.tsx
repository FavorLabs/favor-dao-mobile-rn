import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const Receive = () => {
  return (
    <View style={styles.receive}>
      <Image
        style={styles.mainbuttonIcon}
        resizeMode="cover"
        source={require("../assets/deposit-icon.png")}
      />
      <Text style={styles.text}>Deposit</Text>
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
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    marginTop: 4,
  },
  receive: {
    flex: 1,
    alignItems: "center",
    opacity: 0.5,
  },
});

export default Receive;
