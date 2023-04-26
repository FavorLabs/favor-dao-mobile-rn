// @ts-ignore
import React, {useMemo, useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import RowUser from "./RowUser";

export type Props = {};

const NewsContent: React.FC<Props> = (props) => {
  const [imageArr,setImageArr] = useState<any[]>([
      require("../assets/image4.png"),
      require("../assets/image4.png"),
  ])

  return (
    <View style={styles.frameParent}>
      <RowUser
          image={require("../assets/image.png")}
          name={'Khasan Shadiyarov'}
          time={'1h ago'}
      />
      <NewsDescription />
      <RotationImage imageArr={imageArr}/>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
    left: 0,
    position: "absolute",
  },
  imageIcon: {
    borderRadius: Border.br_5xs,
    width: 40,
    height: 40,
  },
  subtitle: {
    top: 22,
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 327,
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 206,
    top: 0,
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  subtitleParent: {
    flex: 1,
    height: 42,
    marginLeft: 12,
  },
  imageParent: {
    width: 411,
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    alignItems: "center",
    left: 0,
    position: "absolute",
    top: 0,
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    height: 346,
  },
});

export default NewsContent;
