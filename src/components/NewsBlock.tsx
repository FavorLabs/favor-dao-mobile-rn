import React, {useMemo, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {PostInfo} from "../declare/api/DAOApi";
import NewsContent from "./NewsContent";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import {getContent} from "../utils/util";

type Props = {
  postInfo: PostInfo
  isQuote?: boolean
  isReTransfer?: boolean
}

const NewsBlock: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer } = props;
  const {  contents, orig_contents } = props.postInfo;
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);

  return(
    <View>
      <NewsDescription postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
      {
        info[3] && <RotationImage postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({

});

export default NewsBlock;