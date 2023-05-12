import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useIsFocused} from "@react-navigation/native";

export type Props = {};
const RecommendScreen: React.FC<Props> = (props) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {

    }
  }, [isFocused]);

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
