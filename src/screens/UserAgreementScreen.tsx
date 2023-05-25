import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, } from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import FavorDaoButton from "../components/FavorDaoButton";
import {useUrl} from "../utils/hook";
import {updateState as globalUpdateState} from "../store/global";
import {Color, FontFamily} from "../GlobalStyles";

type Props = {};

const UserAgreementScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const confirmClick = () => {
    dispatch(globalUpdateState({
      userAgreement: true
    }));
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <FavorDaoNavBar
        title="User agreement"
        vector={require("../assets/vector6.png")}
      />

        <View style={styles.topBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>User agreement</Text>
            <Image
              style={styles.accountIcon}
              resizeMode="cover"
              source={require("../assets/waringIcon.png")}
            />
          </View>
          <Text style={styles.introduction}>
            Please read the following user agreement carefully
          </Text>
        </View>

      <ScrollView>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            1. Respect for others: When posting remarks or comments on the social software, please be careful not to offend or hurt other users. Please avoid making any uncomfortable or offensive comments.
          </Text>
          <Text style={styles.descriptionText}>
            2. Protect privacy: Please do not disclose sensitive personal information such as addresses, phone numbers or bank account information. Any content posted on social media should be public or consistent with your privacy settings.
          </Text>
          <Text style={styles.descriptionText}>
            3. Compliance: Please follow the rules for using social media platforms and do not post illegal, fraudulent or deceptive information. If you find that another user has violated the rules, please report it to the platform in a timely manner.
          </Text>
          <Text style={styles.descriptionText}>
            4. Do not share false information: Please do not spread false information, including rumors, false news and inaccurate comments. This may cause harm to other users and lead to unnecessary panic and confusion.
          </Text>
          <Text style={styles.descriptionText}>
            5. Pay attention to account security: Please protect your helper and password, and avoid using weak passwords and public networks.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.instanceParent}>
        <TouchableOpacity onPress={confirmClick}>
          <FavorDaoButton
            textValue="Confirm"
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
    maxWidth: '50%'
  },
  accountIcon: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
  introduction: {
    marginTop: 5,
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
    marginBottom: 20,
  },
})

export default UserAgreementScreen;