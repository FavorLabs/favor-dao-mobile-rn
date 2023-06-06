import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image,} from "react-native";
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
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";

type Props = {};

const UserAgreementScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [textList,setTextList] = useState([
    {
      title: "1.Introduction",
      content: "Welcome to FavorDAO, a decentralized, community-driven Web3 toolbox that provides cryptocurrency investment advice and community management tools. By using our services, you agree to these terms of service, which govern your use of the platform.",
    },
    {
      title: "2.Eligibility",
      content: "To use FavorDAO, you must be at least 18 years old and have the legal capacity to enter into a contract. By using our services, you represent and warrant that you meet these eligibility requirements.",
    },
    {
      title: "3.User Account",
      content: "To use our services, you must create a user account using a digital wallet. You are responsible for maintaining the security of your account and any associated passwords or private keys. You agree to notify us immediately if you suspect any unauthorized use of your account.",
    },
    {
      title: "4.Community Creation and Management",
      content: "FavorDAO allows users to create and manage decentralized autonomous organizations (DAOs) within the platform. You agree to comply with all applicable laws and regulations in creating and managing your DAO, and to assume full responsibility for all actions taken by your DAO.",
    },
    {
      title: "5.Content Creation and Subscription",
      content: "FavorDAO allows users to create and publish content, and to offer subscriptions to their content. You agree to comply with all applicable laws and regulations in creating and publishing your content, and to assume full responsibility for the accuracy and legality of your content.",
    },
    {
      title: "6.Rewards and Incentives",
      content: "FavorDAO provides various tools for users to earn rewards and incentives, including subscription fees, airdrops, and promotional tasks. You agree to comply with all applicable laws and regulations in earning rewards and incentives, and to assume full responsibility for any tax liabilities arising from such rewards and incentives.",
    },
    {
      title: "7.Disclaimer of Warranties",
      content: 'FavorDAO provides its services on an "as is" and "as available" basis, without any warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted or error-free, and we disclaim any warranties of merchantability, fitness for a particular purpose, and non-infringement.',
    },
    {
      title: "8.Limitation of Liability",
      content: "In no event shall FavorDAO be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses.",
    },
    {
      title: "9.Indemnification",
      content: "You agree to indemnify and hold FavorDAO and its affiliates, officers, agents, and employees harmless from any claim or demand, including reasonable attorneys' fees, arising out of or in connection with your use of our services, your content, or your violation of these terms of service.",
    },
    {
      title: "10.Governing Law and Jurisdiction",
      content: "These terms of service shall be governed by and construed in accordance with the laws of the jurisdiction in which FavorDAO is incorporated. Any dispute arising out of or in connection with these terms of service shall be resolved exclusively in the courts of that jurisdiction.",
    },
    {
      title: "11.Amendments",
      content: "FavorDAO reserves the right to amend these terms of service at any time and without prior notice. Your continued use of our services after any such amendments shall constitute your acceptance of the amended terms of service.",
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
            {
              textList.map((item,index) => {
                return (
                  <View key={index} style={[styles.descriptionItem, index=== textList.length -1 && {marginBottom:0}]}>
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
              textValue="Confirm"
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