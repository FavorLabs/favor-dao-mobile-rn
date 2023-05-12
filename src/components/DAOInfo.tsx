import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";

type Props = {
  daoInfo: DaoInfo;
};

const DAOInfo: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  const avatarsResUrl = useResourceUrl('avatars');

  return (
    <View style={styles.daoinfo}>
      <Image
        style={styles.userImageIcon}
        resizeMode="cover"
        // source={require("../assets/user-image.png")}
        source={{uri: `${avatarsResUrl}/${daoInfo.avatar}`}}
      />
      <View style={styles.daoname}>
        <Text style={styles.title}>{daoInfo.name}</Text>
        <Text style={styles.subtitle}>{daoInfo.follow_count} members</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userImageIcon: {
    width: 32,
    height: 32,
    borderRadius: 32,
  },
  title: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    textAlign: "left",
    color: Color.color1,
  },
  subtitle: {
    fontSize: FontSize.size_xs,
    lineHeight: 16,
    fontFamily: FontFamily.paragraphP313,
    opacity: 0.8,
    marginTop: 2,
    color: Color.color1,
  },
  daoname: {
    flex: 1,
    marginLeft: 4,
  },
  daoinfo: {
    width: 156,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DAOInfo;
