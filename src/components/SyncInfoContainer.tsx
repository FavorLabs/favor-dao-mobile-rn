import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import AccessToken from "./AccessToken";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const SyncInfoContainer = () => {
  return (
    <View style={styles.syncinfo}>
      <Text style={styles.contentSync}>Content Sync</Text>
      <View style={styles.synchronizers}>
        <AccessToken socialMediaAccessToken="Twitter Access Token" />
        <AccessToken
          socialMediaAccessToken="YouTube Access Token"
          propMarginTop={10}
          propDisplay="none"
          propDisplay1="unset"
          propDisplay2="none"
        />
        <AccessToken
          socialMediaAccessToken="Meta Access Token"
          propMarginTop={10}
          propDisplay="none"
          propDisplay1="none"
          propDisplay2="unset"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentSync: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
  },
  synchronizers: {
    alignSelf: "stretch",
    paddingTop: Padding.p_9xs,
    paddingBottom: Padding.p_base,
    marginTop: 15,
  },
  syncinfo: {
    backgroundColor: Color.color1,
    width: 376,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    marginTop: 20,
  },
});

export default SyncInfoContainer;
