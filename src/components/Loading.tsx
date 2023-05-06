import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {FontSize, FontFamily, Color} from "../GlobalStyles";

type LoadingType = {
  text?: string;
  visible?: boolean
};

const Loading = ({text, visible}: LoadingType) => {
  if (!visible) {
    return null
  }
  return (
    <View style={styles.vectorParent}>
      <Image
        style={styles.vectorIcon}
        resizeMode="cover"
        source={require("../assets/loading.gif")}
      />
      <Text style={styles.loading}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: 80,
    height: 83,
  },
  loading: {
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    marginTop: 23,
  },
  vectorParent: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Color.whiteTransparent,
  },
});

export default Loading;
