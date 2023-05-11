import React, {useMemo, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {PostInfo} from "../declare/global";
import NewsContent from "./NewsContent";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import {getContent} from "../utils/util";
import VideoBlockItem from "./VideoBlockItem";
import {Color, Padding} from "../GlobalStyles";
import Screens from "../navigation/RouteNames";
import {useNavigation, useRoute} from "@react-navigation/native";

type Props = {
  postInfo: PostInfo
}

const QuoteBlock: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;

  const toPostDerail = (event: { stopPropagation: () => void; }) => {
    if(routeName !== Screens.PostDetail) {
      // @ts-ignore
      navigation.navigate(Screens.PostDetail,{ postId: props.postInfo.id});
      event.stopPropagation();
    }
  };

  return(
    <View>
      <TouchableOpacity onPress={toPostDerail}>
      <View style={[styles.descriptionWrapper]}>
        <NewsDescription postInfo={postInfo}/>
      </View>
      </TouchableOpacity>
      <View style={styles.groupWrapper}>
        {
          postInfo?.orig_type === 0 ? (
            <NewsContent postInfo={postInfo} isQuote={true}/>
          ) : (
            <VideoBlockItem postInfo={postInfo} isQuote={true}/>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionWrapper: {
    flex: 1,
  },
  groupWrapper: {
    backgroundColor: Color.whitesmoke_300,
    paddingTop: Padding.p_base,
    justifyContent: "center",
    alignSelf: "stretch",
  },
});

export default QuoteBlock;