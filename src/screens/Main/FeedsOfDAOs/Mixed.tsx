import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";

const Mixed = () => {
  const { feedsOfDAOId } = useSelector((state: Models) => state.global);

  return (
    <View style={styles.container}>
      {
        feedsOfDAOId &&
          <View style={styles.postList}>
            <PostList type={'post'} daoId={feedsOfDAOId}/>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  daoUnderLine: {
    backgroundColor: Color.color1,
    borderBottomWidth: 1,
    borderColor: '#E6E5EB',
  },
  postList: {
    flex: 1,
  },
});

export default Mixed;
