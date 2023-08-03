import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FeedsTopTabNavigator} from '../../../navigation/TopTabBar';
import {Color} from "../../../GlobalStyles";
import {useDispatch} from "react-redux";
import {updateState as searchUpdateState} from "../../../store/search"
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";
import {strings} from "../../../locales/i18n";

const FeedsScreen = () => {
  const dispatch = useDispatch()

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
            tittle={strings('Feeds.title')}
            getSearchBlur={getSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <FeedsTopTabNavigator/>
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
  }
});

export default FeedsScreen;
