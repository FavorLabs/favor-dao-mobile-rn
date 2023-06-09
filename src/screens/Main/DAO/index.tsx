import React, {useRef, useState} from 'react';
import {View,  StyleSheet} from 'react-native';
import {DAOTopTabNavigator} from "../../../navigation/TopTabBar";
import { Color } from "../../../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import {updateState as searchUpdateState} from "../../../store/search";
import {useIsLogin} from "../../../utils/hook";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";

export type Props = {};
const DAOScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = [Screens.CreateVideo, Screens.CreateNews];
  const [isLogin, gotoLogin] = useIsLogin();
  const [searchValue, setSearchValue] = useState<string>('');
  const {dao} = useSelector((state: Models) => state.global);

  const getSearch = () => {
    dispatch(searchUpdateState({
      daoSearch: searchValue
    }))
  }

  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if (isLogin) {
      if (dao) {
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
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <View style={styles.frameParent}>
          <SearchHead
              tittle={'DAO'}
              frameFnc={showActionSheet}
              getSearchBlur={getSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
          />
          <DAOTopTabNavigator/>
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
  },
});

export default DAOScreen;