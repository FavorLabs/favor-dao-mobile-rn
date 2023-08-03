import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image,} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FavorDaoButton from "../components/FavorDaoButton";
import {updateState as globalUpdateState} from "../store/global";
import {Color, FontFamily} from "../GlobalStyles";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import SvgIcon from "../components/SvgIcon";
import WaringIcon from '../assets/svg/waringIcon.svg';
import {strings} from "../locales/i18n";

const UserAgreementScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [textList,setTextList] = useState([
    {
      title: strings('UserAgreement.Introduction'),
      content: strings('UserAgreement.IntroductionText'),
    },
    {
      title: strings('UserAgreement.Eligibility'),
      content: strings('UserAgreement.EligibilityText'),
    },
    {
      title: strings('UserAgreement.UserAccount'),
      content: strings('UserAgreement.UserAccountText'),
    },
    {
      title: strings('UserAgreement.Community'),
      content: strings('UserAgreement.CommunityText'),
    },
    {
      title: strings('UserAgreement.Subscription'),
      content: strings('UserAgreement.SubscriptionText'),
    },
    {
      title: strings('UserAgreement.Incentives'),
      content: strings('UserAgreement.IncentivesText'),
    },
    {
      title: strings('UserAgreement.Warranties'),
      content: strings('UserAgreement.WarrantiesText'),
    },
    {
      title: strings('UserAgreement.Limitation'),
      content: strings('UserAgreement.LimitationText'),
    },
    {
      title: strings('UserAgreement.Indemnification'),
      content: strings('UserAgreement.IndemnificationText'),
    },
    {
      title: strings('UserAgreement.Jurisdiction'),
      content: strings('UserAgreement.JurisdictionText'),
    },
    {
      title: strings('UserAgreement.Amendments'),
      content: strings('UserAgreement.AmendmentsText'),
    },
  ])

  const confirmClick = () => {
    dispatch(globalUpdateState({
      userAgreement: true
    }));
    navigation.goBack();
  }


  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar
          title={strings('UserAgreement.title')}
        />

        <View style={styles.topBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{strings('UserAgreement.UserAgreementTitle')}</Text>
            <View  style={styles.accountIcon}>
              <SvgIcon svg={<WaringIcon/>} width={60} height={60}/>
            </View>
          </View>
          <Text style={styles.introduction}>
            {strings('UserAgreement.introduction')}
          </Text>
        </View>

        <ScrollView>
          <View style={styles.description}>
            {
              textList.map((item,index) => {
                return (
                  <View key={index} style={[styles.descriptionItem, index === textList.length -1 && {marginBottom:0}]}>
                    <Text style={styles.descriptionTitle}>{item.title}</Text>
                    <Text style={styles.descriptionContent}>{item.content}</Text>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>

        <View style={styles.instanceParent}>
          <TouchableOpacity onPress={confirmClick}>
            <FavorDaoButton
              textValue={strings('UserAgreement.ConfirmButton')}
              frame1171275771BackgroundColor="#FF564F"
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
  descriptionItem: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.iOSSystemLabelsLightPrimary,
  },
  descriptionContent: {
    fontSize: 17,
    fontWeight: '400',
    color: Color.iOSSystemLabelsLightPrimary,
  }
})

export default UserAgreementScreen;
