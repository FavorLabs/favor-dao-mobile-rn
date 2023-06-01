import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import TextInputBlock from "../../../components/TextInputBlock";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import FavorDaoButton from "../../../components/FavorDaoButton";
import UserApi from '../../../services/DAOApi/User';
import {useUrl} from "../../../utils/hook";
import {updateState as globalUpdateState} from "../../../store/global";
import Toast from "react-native-toast-message";
import {hasWhiteSpace} from "../../../utils/util";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";

type Props = {};

const ModifyName: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url = useUrl();
  const {user} = useSelector((state: Models) => state.global);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>('');

  const confirmDisable = useMemo(() => {
    return !(
      nickName
    )
  }, [nickName]);

  const changeName = async () => {
    if (btnLoading) return;
    if (confirmDisable) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter the user name',
      })
    }
    if (hasWhiteSpace(nickName)) {
      return Toast.show({
        type: 'error',
        text1: 'No spaces allowed in user name!',
      })
    }
    if (user?.nickname === nickName){
      return Toast.show({
        type: 'error',
        text1: 'Nickname duplication!',
      })
    }

    setBtnLoading(true);
    try {
      const {data} = await UserApi.changeNickName(url, nickName);
      if (data.msg === 'success') {
        setNickName(nickName);
        dispatch(globalUpdateState({
          // @ts-ignore
          user: {...user, nickname: nickName}
        }));
        Toast.show({
          type: 'info',
          text1: 'modify name success!'
        });
        navigation.goBack();
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({
        type: 'error',
        text1: e.message
      });
      setBtnLoading(false);
    }

  }

  useEffect(() => {
    if (user) {
      setNickName(user.nickname)
    }
  }, [])

  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar
          title="Modify name"
          vector={require("../../../assets/vector6.png")}
        />
        <ScrollView>
          <TextInputBlock
            title={'Modify name'}
            value={nickName}
            setValue={setNickName}
            placeholder={'Please enter a name'}
          />
        </ScrollView>
        <View style={[styles.instanceParent, confirmDisable && {opacity: 0.5}]}>
          <TouchableOpacity onPress={changeName}>
            <FavorDaoButton
              textValue="Confirm"
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
              isLoading={btnLoading}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  instanceParent: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
})

export default ModifyName;