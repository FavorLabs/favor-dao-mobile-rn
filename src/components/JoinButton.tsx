import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {DaoInfo} from "../declare/global";
import {getDebounce} from "../utils/util";

type Props = {
  isJoin: boolean;
  handle: () => void;
};

const JoinButton: React.FC<Props> = (props) => {
  const { isJoin, handle } = props;

  const onPress = () => {
    handle();
  };

  return (
    <TouchableOpacity onPress={getDebounce(onPress)}>
    <View style={[styles.joinButton, isJoin ? styles.joined : styles.join]}>
      <Text style={[styles.joinText, isJoin ? styles.joined : styles.join]}>
        {isJoin ? 'joined' : 'join'}
      </Text>
    </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  joinButton: {
    width: 64,
    height: 28,
    borderRadius: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  joined: {
    borderColor: '#999',
    color: '#999'
  },
  join: {
    borderColor: '#FF8D1A',
    backgroundColor: '#FF8D1A',
    color: Color.color1,
  },
  joinText: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    textAlign: 'center',
  },
});

export default JoinButton