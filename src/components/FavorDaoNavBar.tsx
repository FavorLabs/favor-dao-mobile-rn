import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type Props = {
  title?: string;
  vector?: ImageSourcePropType;
};

const FavorDaoNavBar: React.FC<Props> = (props) => {
  const { title, vector } = props;

  return (
    <View style={[styles.frameParent, styles.frameParentFlexBox]}>
      <View style={[styles.frameWrapper, styles.frameParentFlexBox]}>
        <View style={styles.frameParentFlexBox}>
          { vector && <Image style={styles.vectorIcon} resizeMode="cover" source={vector} /> }
          <Text style={[styles.back, styles.backFlexBox]}>Back</Text>
        </View>
      </View>
      <Text style={[styles.title, styles.backFlexBox]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  backFlexBox: {
    textAlign: "center",
    letterSpacing: 0,
  },
  vectorIcon: {
    width: 8,
    height: 14,
  },
  back: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontFamily: FontFamily.paragraphP313,
    color: Color.royalblue_100,
    marginLeft: 5,
  },
  frameWrapper: {
    width: 48,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    marginLeft: -36,
  },
  frameParent: {
    alignSelf: "stretch",
    marginTop: 20,
  },
});

export default FavorDaoNavBar;
