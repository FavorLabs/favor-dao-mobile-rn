import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import SvgIcon from "./SvgIcon";
import WithDrawIcon from '../assets/svg/Setting/withDrawIcon.svg';
import {strings} from "../locales/i18n";

const Send = () => {
  return (
    <View style={styles.send}>
      <SvgIcon svg={<WithDrawIcon/>} width={50} height={50}/>
      <Text style={styles.text}>{strings('Send.title')}</Text>
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
  send: {
    flex: 1,
    alignItems: "center",
    opacity: 0.5,
  },
});

export default Send;
