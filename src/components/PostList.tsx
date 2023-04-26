import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../GlobalStyles";
import NewsCard from "./NewsCard";
import DaoCardList from "./DaoCardList";
import QuoteNews from "./QuoteNews";
import VideoBlock from "./VideoBlock";

export type Props = {};

const PostList: React.FC<Props> = (props) => {
  const [postListArr,setPostListArr] = useState([
    <NewsCard />,
    <DaoCardList />,
    <NewsCard />,
    <QuoteNews />,
    <VideoBlock />
  ])

  return (
      <View>
        <FlatList
          style={styles.postList}
          data={postListArr}
          renderItem={({ item }) => item}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  postList: {

  }
})

export default PostList