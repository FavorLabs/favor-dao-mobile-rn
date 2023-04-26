import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

type FavorDaoButtonType = {
  textValue?: string;

  /** Style props */
  frame1171275771BackgroundColor?: string;
  cancelColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const FavorDaoButton = ({
  textValue,
  frame1171275771BackgroundColor,
  cancelColor,
}: FavorDaoButtonType) => {
  const frameView3Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", frame1171275771BackgroundColor),
    };
  }, [frame1171275771BackgroundColor]);

  const cancelStyle = useMemo(() => {
    return {
      ...getStyleValue("color", cancelColor),
    };
  }, [cancelColor]);

  return (
    <View style={[styles.cancelWrapper, frameView3Style]}>
      <Text style={[styles.cancel, cancelStyle]}>{textValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cancel: {
    fontSize: FontSize.bodyBody17_size,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.color5,
    textAlign: "center",
  },
  cancelWrapper: {
    alignSelf: "stretch",
    borderRadius: Border.br_29xl,
    backgroundColor: Color.color1,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: Padding.p_124xl_5,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

export default FavorDaoButton;
