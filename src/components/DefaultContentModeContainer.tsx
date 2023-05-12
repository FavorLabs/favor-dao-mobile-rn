import React, {useEffect, useMemo, useState} from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import SwitchButton from "./SwitchButton";

type DefaultContentModeContainerType = {
  /** Style props */
  propMarginTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

export type Props = {
  mode: number;
  setMode: React.Dispatch<React.SetStateAction<number>>;
};
const DefaultContentModeContainer: React.FC<Props> = (props) => {
  const { mode, setMode } = props;

  return (
    <View style={[styles.defaultContentMode]}>
      <SwitchButton mode={mode} setMode={setMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionTypo: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  description: {
    width: 43,
  },
  controlstableViewrowxswitIcon: {
    width: 51,
    height: 31,
    marginLeft: 50,
  },
  description1: {
    width: 48,
    marginLeft: 50,
  },
  defaultContentMode: {
    width: 343,
  },
});

export default DefaultContentModeContainer;
