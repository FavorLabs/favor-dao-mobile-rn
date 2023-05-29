import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { DAOTopTabNavigator } from "../../../navigation/TopTabBar";
import {getDebounce} from "../../../utils/util";
import {Border, Color, FontFamily, FontSize, Padding} from "../../../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import Toast from "react-native-toast-message";
import {updateState as searchUpdateState} from "../../../store/search";
import {useIsLogin} from "../../../utils/hook";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';

export type Props = {};
const DAOScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = [Screens.CreateVideo, Screens.CreateNews];
  const [isLogin, gotoLogin] = useIsLogin();
  const [searchValue, setSearchValue] = useState<string>('');
  const { dao } = useSelector((state: Models) => state.global);

  const getSearch = () => {
    dispatch(searchUpdateState({
      daoSearch: searchValue
    }))
  }

  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if(isLogin) {
      if(dao) {
        actionSheetRef.current?.show();
      } else {
        // @ts-ignore
        navigation.navigate(Screens.CreateDAO);
        e.preventDefault()
      }
    } else {
      gotoLogin();
      e.preventDefault()
    }
  }

  return (
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
          <TouchableOpacity onPress={showActionSheet}>
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
    <ActionSheet
      ref={actionSheetRef}
      title={'Create post now!'}
      options={['Video Post', 'News Post', 'Cancel']}
      cancelButtonIndex={2}
      onPress={(index: number) => {
        if (index < screens.length) { // @ts-ignore
          navigation.navigate(screens[index]);
        }
      }}
    />
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
    fontWeight: '400',
    textAlign: "left",
    letterSpacing: 0,
  },
  title: {
    fontSize: FontSize.size_15xl,
    lineHeight: 41,
    fontWeight: "700",
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