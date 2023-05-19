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
  const { created_on, dao, author_dao, origCreatedAt } = props.postInfo;
  return (
    <View style={[styles.frameParent, {backgroundColor: isQuote || isReTransfer ? '#eaeaea' : '#fff'}]}>
      <RowUser
        time={isQuote ? origCreatedAt : created_on }
        daoInfo={isQuote || isReTransfer ? author_dao : dao}
      />
      <NewsBlock postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 12
  },
});

export default NewsContent;
