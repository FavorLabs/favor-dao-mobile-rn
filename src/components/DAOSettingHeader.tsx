import * as React from "react";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { FontFamily, Color, FontSize, Padding } from "../GlobalStyles";
import Back from "./Back";
import {useNavigation} from "@react-navigation/native";
import {useResourceUrl} from "../utils/hook";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {DaoInfo} from "../declare/api/DAOApi";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type Props = {
  daoBanner: string;
}
const DAOSettingHeader: React.FC<Props> = (props) => {
  const { top } = useSafeAreaInsets();
  const { daoBanner } = props;
  const navigation = useNavigation();
  const imagesResUrl = useResourceUrl('images');

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground
      style={[styles.imageBack, {height: top + 40}]}
      resizeMode="cover"
      source={{uri: `${imagesResUrl}/${daoBanner}`}}
    >
      <View style={[styles.maskedDaoInfo, {height: top + 40}]}>
        <TouchableOpacity onPress={toBack} style={styles.back}>
          <Back />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    padding: Padding.p_3xs,
  },
  maskedDaoInfo: {
    backgroundColor: Color.gray_700,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  imageBack: {
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
});

export default DAOSettingHeader;
