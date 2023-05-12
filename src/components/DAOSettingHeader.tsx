import * as React from "react";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { FontFamily, Color, FontSize, Padding } from "../GlobalStyles";
import Back from "./Back";
import {useNavigation} from "@react-navigation/native";
import {useResourceUrl} from "../utils/hook";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {DaoInfo} from "../declare/api/DAOApi";

type Props = {
  daoBanner: string;
}
const DAOSettingHeader: React.FC<Props> = (props) => {
  const { daoBanner } = props;
  const navigation = useNavigation();
  const imagesResUrl = useResourceUrl('images');

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground
      style={[styles.expandeddaoheaderIcon, styles.maskeddaoinfoLayout]}
      resizeMode="cover"
      source={{uri: `${imagesResUrl}/${daoBanner}`}}
    >
      <View style={[styles.maskeddaoinfo, styles.maskeddaoinfoLayout]}>
        <TouchableOpacity onPress={toBack}>
          <Back />
        </TouchableOpacity>

        {/*<Image*/}
        {/*  style={styles.captionChild}*/}
        {/*  resizeMode="cover"*/}
        {/*  source={require("../assets/editDao-icon.png")}*/}
        {/*/>*/}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  maskeddaoinfo: {
    backgroundColor: Color.gray_700,
    flexDirection: "row",
    padding: Padding.p_3xs,
    alignItems: "center",
    justifyContent: "space-between",
  },
  expandeddaoheaderIcon: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  maskeddaoinfoLayout: {
    height: 90,
    alignSelf: "stretch",
  },
  captionChild: {
    width: 20,
    height: 22,
  },

});

export default DAOSettingHeader;
