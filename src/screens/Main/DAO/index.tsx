import React, {useRef, useState} from 'react';
import {View,  StyleSheet} from 'react-native';
import {DAOTopTabNavigator} from "../../../navigation/TopTabBar";
import { Color } from "../../../GlobalStyles";
import {useDispatch, useSelector} from "react-redux";
import {updateState as searchUpdateState} from "../../../store/search";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";

export type Props = {};
const DAOScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState<string>('');

  const getSearch = () => {
    dispatch(searchUpdateState({
      daoSearch: searchValue
    }))
  }

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <View style={styles.frameParent}>
          <SearchHead
              tittle={'DAO'}
              getSearchBlur={getSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
          />
          <DAOTopTabNavigator/>
        </View>
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