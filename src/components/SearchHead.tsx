import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {Border, Color, FontSize, Padding} from "../GlobalStyles";
import {getDebounce} from "../utils/util";
import Screens from "../navigation/RouteNames";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';
import {useIsLogin} from "../utils/hook";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import SvgIcon from "./SvgIcon";
import SearchAddIcon from '../assets/svg/NewsFeed/searchAddIcon.svg'

export type Props = {
  tittle: string;
  getSearchBlur: () => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
  unFrameStatus?: boolean
};

const SearchHead: React.FC<Props> = (props) => {
  const screens = [Screens.CreateVideo, Screens.CreateNews];
  const navigation = useNavigation<StackNavigationProp<any>>();
  const actionSheetRef = useRef<ActionSheet>(null);
  const [isLogin, gotoLogin] = useIsLogin();
  const {tittle, getSearchBlur, searchValue, setSearchValue, unFrameStatus} = props;
  const {dao} = useSelector((state: Models) => state.global);
  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if (!isLogin) return gotoLogin();
    if (dao) {
      actionSheetRef.current?.show();
    } else {
      // @ts-ignore
      navigation.navigate(Screens.CreateDAO);
      e.preventDefault()
    }
  }

  return (
    <View style={[styles.titleParent, styles.selectionBg]}>
      <Text style={styles.title}>{tittle}</Text>
      <View style={styles.frameGroup}>
        <View style={[styles.groupWrapper, styles.wrapperBg]}>
            <TextInput
              style={styles.searchInput}
              placeholder={'Search'}
              value={searchValue}
              onChangeText={text => setSearchValue(text)}
              onBlur={getDebounce(getSearchBlur)}
            />
        </View>
        <TouchableOpacity onPress={showActionSheet}>
          <View style={[styles.frameWrapper, styles.wrapperBg, {display: unFrameStatus ? 'none' : 'flex'}]}>
            <SvgIcon svg={<SearchAddIcon/>} width={22} height={22}/>
          </View>
        </TouchableOpacity>
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
  title: {
    fontSize: FontSize.size_15xl,
    fontWeight: "700",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: -1,
    textAlign: "left",
  },
  groupWrapper: {
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_lgi,
    paddingBottom: Padding.p_7xs,
    flex: 1,
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
  }
});

export default SearchHead;