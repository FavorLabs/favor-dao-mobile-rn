import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useRoute} from "@react-navigation/native";
import DaoInfoHeader from "../../../components/DaoInfoHeader";

type Props ={};

const Videos: React.FC<Props> = (props) => {
  const route = useRoute();
  // @ts-ignore
  const { daoInfo } = route.params;

  return (
    <View style={styles.container}>
      {
        daoInfo &&
          <View>
              <PostList type={1} daoId={daoInfo.id}/>
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