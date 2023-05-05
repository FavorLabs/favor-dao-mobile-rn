import React, {useMemo, useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import RowUser from "./RowUser";
import {Post, PostInfo} from "../declare/global";
import {useResourceUrl} from "../utils/hook";
import {getContent} from "../utils/util";

export type Props = {
  postInfo: PostInfo
  isQuote?: boolean
};

const NewsContent: React.FC<Props> = (props) => {
  const { created_on, dao, contents} = props.postInfo;
  const info = getContent(contents);

  return (
    <View style={styles.frameParent}>
      <RowUser
        time={created_on}
        dao={dao}
      />
      <NewsDescription postInfo={props.postInfo}/>
      {
        info[3] && <RotationImage postInfo={props.postInfo}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    height: 338,
  },
});

export default NewsContent;
