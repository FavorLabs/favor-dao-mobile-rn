import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ChatChannel from "../../../components/RedPacket/ChatChannel";
import {Color, FontFamily, Padding, FontSize, Border} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import SvgIcon from "../../../components/SvgIcon";
import ClaimDetailsRight from "../../../assets/svg/claimDetailsRight.svg";

const ClaimDetails = () => {



  return (
    <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FavorDaoNavBar title={'Claim Details'} rightComponent={
            <TouchableOpacity style={styles.right}>
              <SvgIcon svg={<ClaimDetailsRight/>}/>
            </TouchableOpacity>
          }/>
        </View>
        <ScrollView>
          <View style={[styles.redUser]}>
            <View style={styles.frameContainer}>
              <View style={[styles.imageWrapper, styles.wrapperSpaceBlock]}>
                <Image
                  style={[styles.imageIcon, styles.iconLayout]}
                  resizeMode="cover"
                  source={require("../../../assets/redUserImage.png")}
                />
              </View>
              <Text style={[styles.andrewParker, styles.titleTypo]}>Andrew Parker</Text>
              <Text style={[styles.mayYouBe, styles.title1Typo]}>
                May you be happy and prosperous!
              </Text>
            </View>
            <View style={styles.favt}>
              <Text style={styles.favtNumber}>2.0 <Text style={styles.favtText}>FavT</Text></Text>
            </View>
          </View>

          <View style={styles.frameView}>
            <View style={[styles.titleWrapper, styles.frameGroupFlexBox]}>
              <Text style={styles.title1Typo}>Received：8/10</Text>
            </View>
            <View style={styles.chatchannelParent}>
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Henry Arthur"
                isLuckKing={true}
                amount={2.0}
                time={'2023-05-06 11:11:11'}
              />
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Flores Juanita"
                record={'1/1'}
                amount={1.0}
                time={'2023-05-06 11:11:11'}
              />
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Miles Esther"
                amount={1.0}
                time={'2023-05-06 11:11:11'}
              />
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Miles Esther"
                amount={1.0}
                time={'2023-05-06 11:11:11'}
              />
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Miles Esther"
                amount={1.0}
                time={'2023-05-06 11:11:11'}
              />
              <ChatChannel
                avatar={require("../../../assets/notification.png")}
                channelName="Miles Esther"
                amount={1.0}
                time={'2023-05-06 11:11:11'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Color.color2
  },
  right: {
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color1,
  },
  frameParentFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  back1FlexBox: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
  },
  titleTypo: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "600",
    textAlign: "left",
    letterSpacing: 0,
  },
  wrapperSpaceBlock: {
    padding: Padding.p_3xs,
    flexDirection: "row",
  },
  frameGroupFlexBox: {
    paddingVertical: Padding.p_3xs,
    alignSelf: "stretch",
    alignItems: "center",
  },
  iconLayout: {
    height: 50,
    width: 50,
  },
  title1Typo: {
    color: '#999999',
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontWeight: '400',
  },
  channelnameTypo: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    color: Color.iOSSystemLabelsLightPrimary,
    fontSize: FontSize.bodyBody17_size,
  },
  chevronLeftIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  back1: {
    color: Color.color2,
    fontFamily: FontFamily.paragraphP313,
    fontSize: FontSize.bodyBody17_size,
  },
  back: {
    width: 63,
    flexDirection: "row",
  },
  title: {
    marginLeft: 56,
    fontSize: FontSize.size_xl,
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    lineHeight: 22,
    flex: 1,
  },
  backParent: {
    paddingLeft: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  vectorIcon: {
    width: 18,
    height: 18,
  },
  vectorWrapper: {
    borderRadius: Border.br_xl,
    width: 38,
    backgroundColor: Color.color,
  },
  frameParent: {
    paddingRight: Padding.p_base,
    alignItems: "center",
    flex: 1,
  },
  placeholder: {
    marginLeft: -99,
    fontSize: FontSize.size_xl,
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    lineHeight: 22,
    width: 63,
  },
  simpleheader: {
    // height: 90,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_5xs,
    alignItems: "flex-end",
    alignSelf: "stretch",
    backgroundColor: Color.color4,
  },
  imageIcon: {
    borderRadius: Border.br_5xs,
  },
  imageWrapper: {
    borderRadius: 75,
    backgroundColor: '#FF8D1A',
  },
  andrewParker: {
    marginTop: 5,
    fontSize: FontSize.bodyBody17_size,
  },
  mayYouBe: {
    marginTop: 5,
  },
  frameContainer: {
    alignItems: "center",
  },
  favtNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: '#FF8D1A',
    marginRight: 10,
  },
  favtText: {
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    color: '#FF8D1A',
  },
  favt: {
    display: "flex",
    flexDirection: 'row',
  },
  redUser: {
    paddingVertical: 20,
    backgroundColor: Color.color2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  titleWrapper: {
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.color1,
  },
  vectorIcon1: {
    width: 23,
    height: 25,
    display: "none",
  },
  iconwithbackground: {
    borderRadius: 25,
    backgroundColor: Color.color2,
    display: "none",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  channelname: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
    flex: 1,
  },
  lastmsgtime: {
    width: 70,
    marginLeft: 12,
    textAlign: "right",
    lineHeight: 18,
  },
  channelnamelLasttime: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  messageinfo: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    flex: 1,
  },
  lastmessage: {
    width: 202,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  chatchannelParent: {
    alignSelf: "stretch",
  },
  channelinfoChild: {
    borderStyle: "solid",
    borderColor: "#c1c1c4",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 12,
    alignSelf: "stretch",
  },
  channelinfo: {
    marginLeft: 10,
    flex: 1,
  },
  channelitemwithseperator: {
    marginLeft: 8,
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
  frameView: {
    alignItems: "center",
  },
  background: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  seperator: {
    marginLeft: -66.5,
    bottom: 10,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.iOSSystemLabelsLightPrimary,
    width: 134,
    height: 5,
    position: "absolute",
  },
  homeIndicator: {
    width: 375,
    height: 34,
    marginTop: 20,
  },
});

export default ClaimDetails;
