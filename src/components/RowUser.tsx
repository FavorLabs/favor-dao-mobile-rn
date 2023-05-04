import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import {useResourceUrl} from "../utils/hook";
import {getTime} from "../utils/util";
import {DaoInfo} from "../declare/global";

type Props = {
  time: number;
  dao?: DaoInfo;
};

const RowUser: React.FC<Props> = (props) => {
  const { time, dao } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(time);

  return (
    <View style={styles.rowUser}>
      <View style={styles.imageParent}>
        <Image style={styles.imageIcon} resizeMode="cover" source={{uri: `${avatarsResUrl}/${dao?.avatar}`}} />
        <View style={styles.subtitleParent}>
          <Text style={[styles.subtitle, styles.titleTypo]}>{createTime}</Text>
          <Text style={[styles.title, styles.titleTypo]}>{dao?.name}</Text>
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
    borderRadius: 50,
    width: 50,
    height: 50,
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
