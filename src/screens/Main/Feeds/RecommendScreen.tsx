import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";

export type Props = {};
const RecommendScreen: React.FC<Props> = (props) => {
  return (
        <View style={styles.container}>
          <PostList type={'post'} isHome={true}/>
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
