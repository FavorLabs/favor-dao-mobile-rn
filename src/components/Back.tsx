import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import SvgIcon from "./SvgIcon";
import ChevronLeft from '../assets/svg/chevronLeft.svg';
import {strings} from "../locales/i18n";

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
      <SvgIcon svg={<ChevronLeft/>} width={24} height={24}/>
      <Text style={[styles.back1, backStyle]}>{strings('FavorDaoNavBar.back')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  back1: {
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    fontWeight: '400',
    color: Color.color1,
    textAlign: "left",
  },
  back: {
    flexDirection: "row",
    alignItems: 'center',
  },
});

export default Back;
