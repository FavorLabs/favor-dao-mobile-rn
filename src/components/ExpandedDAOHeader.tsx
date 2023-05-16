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
import {DaoInfo} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl} from "../utils/hook";
import {getDebounce} from "../utils/util";
import {useEffect, useState} from "react";
import DaoInfoHeader from "./DaoInfoHeader";
import PublishContainer from "./PublishContainer";
import Chats from "./Chats";
import BottomSheet from "./BottomSheet";

type Props = {
  daoInfo: DaoInfo;
};

const ExpandedDAOHeader: React.FC<Props> = (props) => {
  const { daoInfo } = props;
  const navigation = useNavigation();
  const [isLogin, gotoLogin] = useIsLogin()

  const imagesResUrl = useResourceUrl('images');
  const [isShow,setIsShow] = useState<boolean>(false);

  const toBack = () => {
    navigation.goBack();
  }

  const toFeedsOfDao = () => {
    if(!isLogin) return gotoLogin();
    setIsShow(true);
  }

  useEffect(() => {
    setIsShow(false);
  },[])

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

        <TouchableOpacity onPress={getDebounce(toFeedsOfDao)}>
        <BtnChatToggle />
        </TouchableOpacity>

      </View>

      <BottomSheet show={isShow}>
        <DaoInfoHeader daoInfo={daoInfo}/>
        <View style={styles.channelDao}>
          <PublishContainer daoInfo={daoInfo}/>
          <Chats/>
        </View>
      </BottomSheet>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  channelDao: {
    flex: 1,
    padding: Padding.p_xs,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: Color.color1,
  },
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
