import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType, TouchableOpacity,
} from "react-native";
import {FontSize, FontFamily, Color} from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";

type FavorDaoNavBarType = {
  title?: string;
  vector?: ImageSourcePropType;
};

const FavorDaoNavBar = ({title, vector}: FavorDaoNavBarType) => {
  const navigation = useNavigation()
  const back = () => {
    navigation.goBack();
  }
  return (
    <View style={[styles.frameParent, styles.frameParentFlexBox]}>
      <View style={[styles.frameWrapper, styles.frameParentFlexBox]}>
        <TouchableOpacity style={styles.button} onPress={back}>
          <Image
            style={styles.vectorIcon} resizeMode="cover"
            source={vector || require("../assets/vector6.png")}
          />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  vectorIcon: {
    width: 8,
    height: 14,
  },
  back: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: '400',
    color: Color.royalblue_100,
    marginLeft: 5,
  },
  frameWrapper: {
    width: 50,
  },
  titleRow: {
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    marginLeft: -60,
  },
  frameParent: {
    alignSelf: "stretch",
    // marginTop: 20,
    paddingTop: 20,
    marginHorizontal: 4
  },
})

export default FavorDaoNavBar;
