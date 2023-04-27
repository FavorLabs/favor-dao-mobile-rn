import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { FeedsTopTabNavigator } from '../../../navigation/TopTabBar';
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet'
import {useNavigation} from "@react-navigation/native";

export type Props = {};
const FeedsScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const screens = ['CreateVideo','CreatePost'];

  const showActionSheet = () => {
    // @ts-ignore
    this.ActionSheet.show()
  }

  return (
    <View style={styles.container}>
      <View style={styles.frameParent}>
        <View style={[styles.titleParent, styles.selectionBg]}>
          <Text style={styles.title}>News Feed</Text>
          <View style={styles.frameGroup}>
            <View style={[styles.groupWrapper, styles.wrapperBg]}>
              <View style={styles.searchParent}>
                <Image
                    style={[styles.searchIcon, styles.parentPosition]}
                    resizeMode="cover"
                    source={require("../../../assets/search.png")}
                />
                <Text style={[styles.placeholderLabel, styles.descriptionTypo]}>
                  Search
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=> {showActionSheet.bind(this)}}>
            <View style={[styles.frameWrapper, styles.wrapperBg]}>
              <Image
                  style={styles.frameChild}
                  resizeMode="cover"
                  source={require("../../../assets/frame-50.png")}
              />
            </View>
            </TouchableOpacity>
          </View>
        </View>
        <FeedsTopTabNavigator />
      </View>
      <ActionSheet
          // @ts-ignore
          // ref={o => this.ActionSheet = o}
          title={'Create post now!'}
          options={['Video Post', 'News Post', 'cancel']}
          cancelButtonIndex={2}
          // destructiveButtonIndex={1}
          onPress={(index: number) => { /* do something */
            // @ts-ignore
            navigation.navigate(screens[index]);
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Color.color1
  },
  selectionBg: {
    backgroundColor: Color.whitesmoke_300,
    alignSelf: "stretch",
  },
  wrapperBg: {
    backgroundColor: Color.iOSSystemFillsLightTertiary,
    borderRadius: Border.br_3xs,
  },
  parentPosition: {
    left: 0,
    position: "absolute",
  },
  descriptionTypo: {
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
    letterSpacing: 0,
  },
  frameParent1Layout: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
  },
  iconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  subtitleLayout: {
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightSecondary,
  },
  lineViewBorder: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e5eb",
    borderStyle: "solid",
  },
  bottombarSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    alignSelf: "stretch",
    marginTop: 10,
  },
  likeSpaceBlock: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  imageParentSpaceBlock: {
    width: 411,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
  },
  title2Typo: {
    width: 327,
    fontFamily: FontFamily.paragraphP313,
    left: 0,
    textAlign: "left",
    letterSpacing: 0,
    position: "absolute",
  },
  descriptionPosition: {
    height: 66,
    left: 0,
    position: "absolute",
  },
  groupChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  likeFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  symbolTypo: {
    marginLeft: 6,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
    letterSpacing: 0,
  },
  daoTypo: {
    marginTop: 7,
    lineHeight: 13,
    fontSize: FontSize.capsCaps310SemiBold_size,
    textAlign: "center",
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    letterSpacing: 0,
  },
  chatTypo: {
    lineHeight: 13,
    fontSize: FontSize.capsCaps310SemiBold_size,
    color: Color.iOSSystemTintsDisableLight,
    textAlign: "center",
    fontFamily: FontFamily.headingH613,
    fontWeight: "500",
    letterSpacing: 0,
  },
  label1: {
    top: 11,
    right: 0,
    textAlign: "right",
    color: Color.accentLight,
    fontFamily: FontFamily.bodyBody17,
    letterSpacing: 0,
    lineHeight: 22,
    fontSize: FontSize.bodyBody17_size,
    position: "absolute",
  },
  label: {
    right: 16,
    bottom: 0,
    width: 164,
    position: "absolute",
    height: 44,
  },
  rightAccessory: {
    display: "none",
    height: 44,
  },
  back: {
    left: 26,
    lineHeight: 22,
    position: "absolute",
    top: 10,
    textAlign: "left",
    color: Color.accentLight,
    fontFamily: FontFamily.bodyBody17,
  },
  chevron: {
    left: 6,
    fontSize: 24,
    fontFamily: FontFamily.sFProTextMedium,
    fontWeight: "500",
    letterSpacing: -1,
    textAlign: "left",
    top: 10,
    color: Color.accentLight,
    lineHeight: 22,
    position: "absolute",
  },
  leftAccessory: {
    marginTop: 10,
    display: "none",
    height: 44,
  },
  backgroundIcon: {
    height: 140,
    width: 375,
    marginTop: 10,
    display: "none",
  },
  title: {
    fontSize: FontSize.size_15xl,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    display: "flex",
    width: 343,
    alignItems: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: -1,
    textAlign: "left",
  },
  searchIcon: {
    width: 24,
    overflow: "hidden",
    top: 0,
    height: 24,
  },
  placeholderLabel: {
    marginTop: -11,
    top: "50%",
    width: 241,
    color: Color.iOSSystemLabelsLightSecondary,
    left: 26,
    lineHeight: 22,
    position: "absolute",
    fontSize: FontSize.bodyBody17_size,
  },
  searchParent: {
    width: 267,
    height: 24,
  },
  groupWrapper: {
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_lgi,
    paddingBottom: Padding.p_7xs,
    flex: 1,
  },
  frameChild: {
    height: 22,
    width: 22,
  },
  frameWrapper: {
    padding: Padding.p_5xs,
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  frameGroup: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  titleParent: {
    paddingTop: Padding.p_29xl,
    paddingBottom: Padding.p_3xs,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_base,
  },
  recommendselected: {
    display: "none",
  },
  followunselected: {
    marginTop: 10,
    display: "none",
  },
  selection: {
    height: 60,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Color.whitesmoke_300,
  },
  previewIcon: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    height: 72,
    alignSelf: "stretch",
    width: "100%",
  },
  previewWrapper: {
    alignSelf: "stretch",
  },
  frameItem: {
    width: 64,
    height: 64,
  },
  subtitle: {
    top: 26,
    width: 114,
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
    letterSpacing: 0,
    left: 0,
    position: "absolute",
  },
  title1: {
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    lineHeight: 23,
    width: 114,
    top: 0,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
  },
  subtitleParent: {
    height: 46,
    width: 114,
  },
  label3: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.headingH613,
    color: Color.color,
    fontWeight: "500",
    letterSpacing: 0,
  },
  label2: {
    borderRadius: Border.br_base,
    backgroundColor: Color.darkorange_100,
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelWrapper: {
    alignItems: "flex-end",
    marginLeft: 119,
    justifyContent: "center",
    flex: 1,
  },
  groupParent: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 10,
  },
  description: {
    lineHeight: 21,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.paragraphP313,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    letterSpacing: 0,
    flex: 1,
  },
  ellipseParent: {
    paddingBottom: Padding.p_base,
    marginTop: -36,
    paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  frameParent1: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
    marginLeft: 10,
    flex: 1,
  },
  frameView: {
    width: 560,
    flexDirection: "row",
  },
  frameInner: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  frameContainer: {
    paddingTop: Padding.p_5xs,
    alignSelf: "stretch",
    marginTop: 10,
  },
  streamThousandsOf: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  more: {
    color: Color.accentLight,
  },
  description2: {
    lineHeight: 23,
    fontSize: FontSize.bodyBody17_size,
  },
  description1: {
    paddingVertical: 0,
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
  },
  imageIcon: {
    height: 210,
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  lineView: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e5eb",
    borderStyle: "solid",
  },
  rowUserParent: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.color1,
  },
  imageIcon1: {
    borderRadius: Border.br_5xs,
    width: 40,
    height: 40,
  },
  subtitle1: {
    top: 22,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightSecondary,
  },
  khasanShadiyarov: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontSize: FontSize.bodyBody17_size,
  },
  wasRetransferedBy: {
    fontSize: FontSize.size_xs,
    color: Color.iOSSystemTintsDisableLight,
  },
  title2: {
    lineHeight: 23,
    top: 0,
  },
  subtitleGroup: {
    height: 42,
    marginLeft: 12,
    flex: 1,
  },
  imageParent: {
    left: 0,
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  description4: {
    width: 379,
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
    letterSpacing: 0,
    top: 0,
    lineHeight: 22,
    height: 66,
    fontSize: FontSize.bodyBody17_size,
  },
  descriptionContainer: {
    alignSelf: "stretch",
    flex: 1,
  },
  description3: {
    top: 56,
    width: 411,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
  },
  groupChild: {
    height: "60.69%",
    top: "39.31%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupView: {
    height: 346,
    alignSelf: "stretch",
  },
  icons8Share1: {
    width: 20,
    height: 21,
    overflow: "hidden",
  },
  symbol: {
    color: Color.iOSSystemLabelsLightSecondary,
  },
  icons8Share1Parent: {
    top: 0,
    flexDirection: "row",
  },
  look: {
    width: 52,
    height: 21,
  },
  comments: {
    flexDirection: "row",
  },
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  like: {
    paddingTop: Padding.p_8xs,
    marginTop: 14,
    alignSelf: "stretch",
    height: 24,
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.color1,
  },
  groupContainer: {
    height: 398,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: Color.color1,
  },
  feedsJoinedInner: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
  },
  feeds: {
    color: Color.color,
    marginTop: 7,
  },
  groupGroup: {
    width: 28,
    height: 40,
    alignItems: "center",
  },
  iconMessages2: {
    height: 20,
    width: 20,
  },
  chat: {
    marginTop: 5,
  },
  iconMessages2Parent: {
    alignItems: "center",
  },
  iconHouse: {
    height: 21,
    width: 22,
  },
  dao: {
    color: Color.iOSSystemTintsDisableLight,
  },
  iconHouseParent: {
    height: 39,
    alignItems: "center",
  },
  groupIcon1: {
    width: 21,
    height: 26,
  },
  notify: {
    marginTop: 3,
  },
  groupIcon2: {
    width: 23,
    height: 22,
  },
  groupParent2: {
    width: 39,
    height: 40,
    alignItems: "center",
  },
  frameParent3: {
    flex: 1,
  },
  backgroundIcon1: {
    width: 382,
    height: 83,
    marginLeft: 10,
    display: "none",
  },
  frameParent2: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    top: "0%",
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
    height: 34,
    width: 375,
  },
  bottombar: {
    backgroundColor: Color.color2,
    alignItems: "center",
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
  },
  feedsJoined: {
    justifyContent: "center",
    width: "100%",
    flex: 1,
    backgroundColor: Color.color1,
  },
});

export default FeedsScreen;