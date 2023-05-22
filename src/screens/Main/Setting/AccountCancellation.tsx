import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import TextInputBlock from "../../../components/TextInputBlock";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import FavorDaoButton from "../../../components/FavorDaoButton";
import UserApi from '../../../services/DAOApi/User';
import {useUrl} from "../../../utils/hook";
import {updateState as globalUpdateState} from "../../../store/global";
import Toast from "react-native-toast-message";
import {Color, FontFamily} from "../../../GlobalStyles";
import {
  AccountCancellationIntroduction,
  AccountCancellationOne,
  AccountCancellationTitle, AccountCancellationTwo
} from "../../../config/constants";

type Props = {};

const AccountCancellation: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url = useUrl();
  const { user } = useSelector((state: Models) => state.global);

  const [btnLoading,setBtnLoading] = useState<boolean>(false);
  const [nickName,setNickName] = useState<string>('');

  const unregister = async () => {
    if(btnLoading) return;

    setBtnLoading(true);
    try {

    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      setBtnLoading(false);
    }

  }

  useEffect(() => {
    if(user) {
      setNickName(user.nickname)
    }
  },[])

  return (
    <View style={styles.container}>
      <FavorDaoNavBar
        title="Account cancellation"
        vector={require("../../../assets/vector6.png")}
      />

      <ScrollView>
        <View style={styles.topBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{AccountCancellationTitle}</Text>
            <Image
              style={styles.accountIcon}
              resizeMode="cover"
              source={require("../../../assets/AccountIcon.png")}
            />
          </View>
          <Text style={styles.introduction}>
            {AccountCancellationIntroduction}
          </Text>
        </View>

        <View style={styles.description}>
          <Text style={[styles.descriptionText,styles.topText]}>{AccountCancellationOne}</Text>
          <Text style={styles.descriptionText}>{AccountCancellationTwo}</Text>
        </View>
      </ScrollView>

      <View style={styles.instanceParent}>
        <TouchableOpacity onPress={unregister}>
          <FavorDaoButton
            textValue="Unregister"
            frame1171275771BackgroundColor="#FF564F"
            cancelColor="#fff"
            isLoading={btnLoading}
          />
        </TouchableOpacity>
      </View>
    </View>
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
  topBlock: {
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    color: Color.iOSSystemLabelsLightPrimary,
    width: '50%',
  },
  accountIcon: {
    width: 60,
    height: 51,
    marginLeft: 10,
  },
  introduction: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#999999'
  },
  description: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Color.color1,
  },
  descriptionText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  topText: {
    marginBottom: 20
  }
})

export default AccountCancellation;