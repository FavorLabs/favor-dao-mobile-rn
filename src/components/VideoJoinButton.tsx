import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {updateState as globalUpdateState} from "../store/global";
import {useDispatch} from "react-redux";
import {strings} from "../locales/i18n";

type Props = {
  isJoin: boolean;
  handle: () => void;
  isLoading?: boolean;
};

const VideoJoinButton: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const { isJoin, handle, isLoading} = props;

  const onClick = async () => {
    if(isJoin) {
      Alert.alert(
        strings('JoinButton.alert.title'),
        strings('JoinButton.alert.message'),
        [
          {
            text: strings('JoinButton.alert.No'),
            style: 'cancel'
          },
          {
            text: strings('JoinButton.alert.Yes'),
            onPress: async () => {
              await handle();
              dispatch(globalUpdateState({
                joinStatus: true,
                newsJoinStatus: true
              }));
            }
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      await handle();
      dispatch(globalUpdateState({
        joinStatus: true,
        newsJoinStatus: true
      }));
    }
  };

  return (
    <TouchableOpacity onPress={onClick}>
      {
        isLoading ? <ActivityIndicator size="small"/> :
        !isJoin ?
          <View style={[styles.joinButton,styles.join]}>
            <Text style={[styles.joinText, styles.join]}>{strings('JoinButton.Join')}</Text>
          </View>
          :
          <Image
            style={styles.joinedIcon}
            resizeMode="cover"
            source={require('../assets/joinedIcon.png')}
          />
      }
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  joinedIcon: {
    width: 16,
    height: 16,
    borderRadius: 16
  },
  joinButton: {
    paddingHorizontal: 4,
    borderRadius: 16,
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
    textAlign: 'center',
  },
});

export default VideoJoinButton
