import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";

type Props = {
  image: any;
  name: string;
  time: string;
};

const RowUser: React.FC<Props> = (props) => {
  const { image, name, time } = props
  return (
    <View style={styles.rowUser}>
      <View style={styles.imageParent}>
        <Image style={styles.imageIcon} resizeMode="cover" source={image} />
        <View style={styles.subtitleParent}>
          <Text style={[styles.subtitle, styles.titleTypo]}>{time}</Text>
          <Text style={[styles.title, styles.titleTypo]}>{name}</Text>
        </View>
      </View>
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
    width: 38,
    height: 40,
  },
  subtitle: {
    top: 22,
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 293,
  },
  title: {
    top: 0,
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 175,
  },
  subtitleParent: {
    height: 42,
    marginLeft: 12,
    width: 293,
  },
  imageParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowUser: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
  },
});

export default RowUser;
