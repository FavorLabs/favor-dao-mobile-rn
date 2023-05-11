import React, {useEffect, useMemo, useState} from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import SwitchButton from "./SwitchButton";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type DefaultContentModeContainerType = {
  /** Style props */
  propMarginTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DefaultContentModeContainer = () => {
  const [daoMode, setDaoMode] = useState<number>(0);

  const { dao } = useSelector((state: Models) => state.global);

  useEffect(() => {
    if (dao) {
      setDaoMode(dao.visibility);
    }
  }, [dao]);

  return (
    <View style={[styles.defaultContentMode]}>
      <Text style={styles.title}>Default Content Mode</Text>
      <View style={styles.toggle}>
        <SwitchButton mode={daoMode} setMode={setDaoMode} />
      </View>
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
  title: {
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
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
  toggle: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  defaultContentMode: {
    width: 343,
  },
});

export default DefaultContentModeContainer;
