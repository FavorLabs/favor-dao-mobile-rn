import * as React from "react";
import {
  StyleSheet,
  View,
  ImageBackground, TouchableOpacity,
} from "react-native";
import Back from "./Back";
import DAOInfo from "./DAOInfo";
import BtnChatToggle from "./BtnChatToggle";
import { Color, Padding } from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import {DaoInfo} from "../declare/global";
import {useResourceUrl} from "../utils/hook";

type Props = {
  daoInfo: DaoInfo;
};

const ExpandedDAOHeader: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  const navigation = useNavigation();

  const imagesResUrl = useResourceUrl('images');

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground
      style={[styles.expandeddaoheaderIcon, styles.maskeddaoinfoLayout]}
      resizeMode="cover"
      source={{uri: `${imagesResUrl}/${daoInfo.banner}`}}
    >
      <View style={[styles.maskeddaoinfo, styles.maskeddaoinfoLayout]}>
        <TouchableOpacity onPress={toBack}>
        <Back />
        </TouchableOpacity>
        <DAOInfo daoInfo={daoInfo}/>
        <BtnChatToggle />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  maskeddaoinfoLayout: {
    height: 90,
    alignSelf: "stretch",
  },
  maskeddaoinfo: {
    backgroundColor: Color.gray_700,
    flexDirection: "row",
    padding: Padding.p_3xs,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  expandeddaoheaderIcon: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default ExpandedDAOHeader;
