import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

const OperationBlock = () => {
  return (
    <View style={styles.like}>
      <View style={styles.look}>
        <View style={styles.icons8Share1Parent}>
          <Image
            style={styles.icons8Share1}
            resizeMode="cover"
            source={require("../assets/icons8share-1.png")}
          />
          <Text style={[styles.symbol, styles.symbolTypo]}>214</Text>
        </View>
      </View>
      <View style={styles.look}>
        <View style={styles.icons8Share1Parent}>
          <Image
            style={styles.icons8Share1}
            resizeMode="cover"
            source={require("../assets/icons8share-11.png")}
          />
          <Text style={[styles.symbol, styles.symbolTypo]}>214</Text>
        </View>
      </View>
      <View style={styles.comments}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8comments-1.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]}>116</Text>
      </View>
      <View style={styles.comments}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8facebooklike-1.png")}
        />
        <Text style={[styles.symbol3, styles.symbolTypo]}>1122</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  symbolTypo: {
    marginLeft: 6,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  icons8Share1: {
    width: 20,
    overflow: "hidden",
    height: 21,
  },
  symbol: {
    color: Color.iOSSystemLabelsLightSecondary,
  },
  icons8Share1Parent: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
  },
  look: {
    width: 52,
    height: 21,
  },
  comments: {
    flexDirection: "row",
  },
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  like: {
    alignSelf: "stretch",
    backgroundColor: Color.color1,
    height: 24,
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_8xs,
    justifyContent: "space-between",
    marginTop: 14,
    flexDirection: "row",
  },
});

export default OperationBlock;
