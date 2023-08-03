import * as React from "react";
import { StyleSheet, View } from "react-native";
import PostList from "../../../components/PostList";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";

const Videos = () => {
  const { feedsOfDAOId } = useSelector((state: Models) => state.global);

  return (
    <View style={styles.container}>
      {
        feedsOfDAOId &&
          <View style={styles.container}>
              <PostList type={1} daoId={feedsOfDAOId}/>
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

export default Videos;
