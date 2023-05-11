import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {DAOTopTabNavigator, FeedsTopTabNavigator} from "../../../navigation/TopTabBar";
import {getDebounce} from "../../../utils/util";
import {Border, Color, FontFamily, FontSize, Padding} from "../../../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import Screens from '../../../navigation/RouteNames';
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import Toast from "react-native-toast-message";

export type Props = {};
const DAOScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState<string>('');
  const { dao } = useSelector((state: Models) => state.global);

  const getSearch = () => {
    console.log('blur')
  }

  const toCreateDao = () => {
    if(!dao) {
      // @ts-ignore
      navigation.navigate(Screens.CreateDAO)
    } else {
      Toast.show({
        type: 'error',
        text1: 'dao community already exists!'
      });
    }
  }


  return (
    // <View style={styles.container}>
    //   <DAOTopTabNavigator />
    // </View>
  <View style={styles.container}>
    <View style={styles.frameParent}>
      <View style={[styles.titleParent, styles.selectionBg]}>
        <Text style={styles.title}>DAO</Text>
        <View style={styles.frameGroup}>
          <View style={[styles.groupWrapper, styles.wrapperBg]}>
            <View style={styles.searchParent}>
              <TextInput
                style={styles.searchInput}
                placeholder={'Search'}
                value={searchValue}
                onChangeText={text => setSearchValue(text)}
                onBlur={getDebounce(getSearch)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={getDebounce(toCreateDao)}>
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
      <DAOTopTabNavigator />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
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
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Color.whitesmoke_300,
  },
});

export default DAOScreen;