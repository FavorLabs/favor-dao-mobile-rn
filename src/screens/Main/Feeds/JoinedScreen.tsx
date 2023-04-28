import React from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";

export type Props = {};
const JoinedScreen: React.FC<Props> = (props) => {
  return (
      // <ScrollView>
        <View style={styles.container}>
          <PostList />
        </View>
      // </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1,
  },
});

export default JoinedScreen;
