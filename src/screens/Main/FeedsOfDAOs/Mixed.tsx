import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useRoute} from "@react-navigation/native";

type Props ={};

const Mixed: React.FC<Props> = (props) => {
  const route = useRoute();
  // @ts-ignore
  const { daoInfo } = route.params;

  return (
    <View style={styles.container}>
      {
        daoInfo &&
          <View style={styles.postList}>
            <PostList type={'post'} daoId={daoInfo.id}/>
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