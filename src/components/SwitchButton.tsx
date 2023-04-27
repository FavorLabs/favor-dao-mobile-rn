import React, { useState } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Switch } from '@rneui/themed';
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const SwitchButton = () => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.descriptionParent}>
      <Text style={styles.descriptionTypo}>Public</Text>
      <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
      />
      <Text style={[styles.description1, styles.descriptionTypo]}>Private</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionTypo: {
    width: 60,
    textAlign: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  controlstableViewrowxswitIcon: {
    width: 51,
    height: 31,
    marginLeft: 50,
  },
  description1: {
    marginLeft: 50,
  },
  descriptionParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default SwitchButton;
