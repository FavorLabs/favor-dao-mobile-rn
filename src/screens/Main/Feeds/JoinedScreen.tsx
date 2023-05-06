import React from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";

export type Props = {};
const JoinedScreen: React.FC<Props> = (props) => {
  return (
        <View style={styles.container}>
          <PostList type={'post'} focus/>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1,
  },
});

export default JoinedScreen;
