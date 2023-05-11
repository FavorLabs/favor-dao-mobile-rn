import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const AddChannel = () => {
  return (
    <View style={styles.addchannel}>
      <View style={styles.add}>
        <Image
          style={styles.materialSymbolsaddIcon}
          resizeMode="cover"
          source={require("../assets/materialsymbolsadd.png")}
        />
        <Text style={styles.channel}>Channel</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  materialSymbolsaddIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  channel: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.color,
    textAlign: "left",
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
  },
  addchannel: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.darkgray_200,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_10xs,
    justifyContent: "center",
    marginLeft: 138,
    overflow: "hidden",
  },
});

export default AddChannel;
