import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import {PostInfo} from "../declare/global";

type Props = {
  postInfo: PostInfo | null
};

const VideoDetailButton: React.FC<Props> = (props) => {
  return (
    <View style={styles.groupParent}>
      <View style={styles.placeholderParent}>
        <Image
          style={[styles.placeholderIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/placeholder.png")}
        />
        <View style={[styles.frameParent, styles.frameLayout]}>
          <Image
            style={[styles.frameIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/frame.png")}
          />
          <Text style={[styles.symbol, styles.symbolTypo]}>326</Text>
        </View>
        <View style={[styles.icons8Comments2Parent, styles.icons8Position]}>
          <Image
            style={[styles.icons8Comments2, styles.icons8Position]}
            resizeMode="cover"
            source={require("../assets/icons8comments-2.png")}
          />
          <Text style={[styles.symbol1, styles.symbolTypo]}>128</Text>
        </View>
        <View style={[styles.frameGroup, styles.frameLayout]}>
          <Image
            style={[styles.frameIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/frame1.png")}
          />
          <Text style={[styles.symbol2, styles.symbolTypo]}>18</Text>
        </View>
      </View>
      <Image
        style={[styles.alertCircleIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/alertcircle.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 30,
    left: 0,
    width: 30,
    position: "absolute",
  },
  frameLayout: {
    height: 60,
    left: 0,
    width: 30,
    position: "absolute",
  },
  symbolTypo: {
    textAlign: "left",
    color: Color.color1,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    top: "66.67%",
    position: "absolute",
  },
  icons8Position: {
    left: "0%",
    right: "0%",
    width: "100%",
    position: "absolute",
  },
  placeholderIcon: {
    top: 0,
    height: 30,
  },
  frameIcon: {
    overflow: "hidden",
    top: 0,
    height: 30,
  },
  symbol: {
    width: "93.33%",
    left: "3.33%",
  },
  frameParent: {
    top: 54,
  },
  icons8Comments2: {
    height: "50%",
    top: "0%",
    bottom: "50%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  symbol1: {
    left: "6.67%",
  },
  icons8Comments2Parent: {
    height: "21.28%",
    top: "48.94%",
    bottom: "29.79%",
  },
  symbol2: {
    width: "53.33%",
    left: "23.33%",
  },
  frameGroup: {
    top: 222,
  },
  placeholderParent: {
    height: 282,
    left: 0,
    top: 0,
    width: 30,
    position: "absolute",
  },
  alertCircleIcon: {
    top: 306,
    overflow: "hidden",
  },
  groupParent: {
    top: 397,
    left: 321,
    height: 336,
    width: 30,
    position: "absolute",
  },
});

export default VideoDetailButton;
