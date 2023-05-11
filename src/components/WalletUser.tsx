import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type Props = {};
const WalletUser: React.FC<Props> = (props) => {

  const { user } = useSelector((state: Models) => state.global);

  return (
    <View style={styles.user}>
      <Image
        style={styles.avatarIcon}
        resizeMode="cover"
        source={require("../assets/avatar.png")}
      />
      <Text style={[styles.username, styles.xc8320fTypo]}>{user?.nickname}</Text>
      <View style={[styles.addressline, styles.addresslineFlexBox]}>
        <Text style={styles.shortaddress} numberOfLines={1}>{user?.address}</Text>
        <View style={[styles.backupbutton, styles.addresslineFlexBox]}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/setting-backup-icon.png")}
          />
          <Text style={[styles.xc8320f, styles.xc8320fTypo]}>Backup</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  xc8320fTypo: {
    textAlign: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  shortaddress: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    width: 130,
  },
  addresslineFlexBox: {
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
  },
  avatarIcon: {
    width: 101,
    height: 100,
  },
  username: {
    marginTop: 6,
  },
  icon: {
    width: 15,
    height: 15,
  },
  xc8320f: {
    width: 52,
    height: 22,
    marginLeft: 6,
  },
  backupbutton: {
    backgroundColor: Color.iOSSystemFillsLightTertiary,
    width: 93,
    marginLeft: 8,
    justifyContent: "center",
  },
  addressline: {
    borderStyle: "solid",
    borderColor: "#86868a",
    borderWidth: 1,
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_11xs,
    paddingRight: Padding.p_10xs,
    paddingBottom: Padding.p_11xs,
    marginTop: 6,
  },
  user: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalletUser;
