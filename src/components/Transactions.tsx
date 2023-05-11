import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const Transactions = () => {
  return (
    <View style={styles.mainbuttonParent}>
      <Image
        style={styles.mainbuttonIcon}
        resizeMode="cover"
        source={require("../assets/transaction-icon.png")}
      />
      <Text style={styles.text}>Transaction</Text>
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
  mainbuttonParent: {
    flex: 1,
    alignItems: "center",
  },
});

export default Transactions;
