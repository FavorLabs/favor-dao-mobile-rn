import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import SvgIcon from "./SvgIcon";
import DepositIcon from '../assets/svg/Setting/depositIcon.svg';

const Receive = () => {
  return (
    <View style={styles.receive}>
      <SvgIcon svg={<DepositIcon/>} width={50} height={50}/>
      <Text style={styles.text}>Deposit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
