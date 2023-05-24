import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {getDebounce} from "../utils/util";
import {updateState as globalUpdateState} from "../store/global";
import {useDispatch} from "react-redux";
import Toast from "react-native-toast-message";

type Props = {
  isJoin: boolean;
  handle: () => void;
  isLoading?: boolean;
};

const JoinButton: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const { isJoin, handle, isLoading} = props;

  const onPress = async () => {
    await handle();
    dispatch(globalUpdateState({
      joinStatus: true,
      newsJoinStatus: true
    }));
    if(!isJoin) Toast.show({type: 'info', text1: 'join success!'});
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.joinButton, isJoin ? styles.joined : styles.join]}>
        {
          isLoading ? <ActivityIndicator size="small"/> :
            <Text style={[styles.joinText, isJoin ? styles.joined : styles.join]}>
              {isJoin ? 'joined' : 'join'}
            </Text>
        }
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