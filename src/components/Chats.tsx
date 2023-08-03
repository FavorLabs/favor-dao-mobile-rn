import * as React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import ChatItem from "./ChatItem";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {strings} from "../locales/i18n";

type Props = {
  daoInfo: DaoInfo
  setIsShow?: (a: boolean) => void;
  isJoin?: boolean;
}

const Chats: React.FC<Props> = (props) => {
  const { daoInfo, setIsShow, isJoin } = props;
  return (
    <View style={styles.chats}>
      <Text style={styles.title}>{strings('DAOChats.Chats')}</Text>
      <ChatItem daoInfo={daoInfo} setIsShow={setIsShow} isJoin={isJoin}/>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.size_mid,
    textAlign: "left",
    fontWeight: '600',
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
  },
  chats: {
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default Chats;
