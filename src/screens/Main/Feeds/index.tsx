import React, {useRef, useState} from 'react';
import {View, StyleSheet } from 'react-native';
import {FeedsTopTabNavigator} from '../../../navigation/TopTabBar';
import {Color} from "../../../GlobalStyles";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Screens from "../../../navigation/RouteNames";
import {useIsLogin} from "../../../utils/hook";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import {updateState as searchUpdateState} from "../../../store/search"
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";

export type Props = {};
const FeedsScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigationProp<any>>();
  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = [Screens.CreateVideo, Screens.CreateNews];
  const [isLogin, gotoLogin] = useIsLogin();
  const { dao } = useSelector((state: Models) => state.global);
  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if(isLogin) {
      if(dao) {
        actionSheetRef.current?.show();
      } else {
        navigation.navigate(Screens.CreateDAO);
        e.preventDefault()
      }
    } else {
      gotoLogin();
      e.preventDefault()
    }
  }

  const [searchValue, setSearchValue] = useState<string>('');

  const getSearch = () => {
    dispatch(searchUpdateState({
      feedsSearch: searchValue
    }))
  }

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
      <View style={styles.frameParent}>
        <SearchHead
        tittle={'News Feed'}
        frameFnc={showActionSheet}
        getSearchBlur={getSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />
        <FeedsTopTabNavigator/>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={'Create post now!'}
        options={['Video Post', 'News Post', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index: number) => {
          if (index < screens.length) navigation.navigate(screens[index]);
        }}
      />
    </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Color.whitesmoke_300,
  }
});

export default FeedsScreen;
