import React from 'react';
import {View, StyleSheet } from 'react-native';
import { Color } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";

const RecommendScreen = () => {
  const { feedsSearch } = useSelector((state: Models) => state.search);

  return (
     <View style={styles.container}>
       <PostList type={'post'} isHome={true} query={feedsSearch}/>
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1
  },
});

export default RecommendScreen;
