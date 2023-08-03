import * as React from "react";
import { StyleSheet, View } from "react-native";
import PostList from "../../../components/PostList";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";

const News = () => {
  const { feedsOfDAOId } = useSelector((state: Models) => state.global);

  return (
    <View style={styles.container}>
      {
        feedsOfDAOId &&
          <View style={styles.container}>
              <PostList type={0} daoId={feedsOfDAOId}/>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default News;
