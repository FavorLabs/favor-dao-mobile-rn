import React, {useMemo, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import RowUser from "./RowUser";
import {Post, PostInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";
import {getContent} from "../utils/util";
import {useNavigation, useRoute} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import NewsBlock from "./NewsBlock";

export type Props = {
  postInfo: PostInfo
  isQuote?: boolean
  isReTransfer?: boolean
};

const NewsContent: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer } = props;
  const { created_on, dao, contents, orig_contents, author_dao } = props.postInfo;
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);

  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;

  const toPostDerail = () => {
    if(routeName !== Screens.PostDetail) {
    // @ts-ignore
    navigation.navigate(Screens.PostDetail,{ postId:  isQuote ? props.postInfo.ref_id : props.postInfo.id});
    }
  };

  return (
    <TouchableOpacity onPress={toPostDerail}>
    <View style={styles.frameParent}>
      <RowUser
        time={created_on}
        daoInfo={isQuote || isReTransfer ? author_dao : dao}
        isReTransfer={isReTransfer}
        postInfo={props.postInfo}
        userDao={dao}
      />
      <NewsBlock postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default NewsContent;
