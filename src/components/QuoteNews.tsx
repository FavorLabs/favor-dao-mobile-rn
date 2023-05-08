import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NewsContent from "./NewsContent";
import { Padding, FontSize, Color, FontFamily } from "../GlobalStyles";
import RowUser from "./RowUser";
import OperationBlock from "./OperationBlock";
import { PostInfo } from '../declare/global';
import NewsDescription from "./NewsDescription";
import VideoBlock from "./VideoBlock";
import VideoBlockItem from "./VideoBlockItem";
import QuoteBlock from "./QuoteBlock";

type Props = {
  postInfo: PostInfo
};

const QuoteNews: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const { dao, created_on} = props.postInfo;
  return (
    <View style={[styles.frameParent]}>
      <View style={[styles.groupParent, styles.likeSpaceBlock]}>
        <RowUser time={created_on} dao={dao}/>
      </View>
      <QuoteBlock postInfo={postInfo}/>
      <OperationBlock postInfo={postInfo}/>
      <View style={styles.frameChild} />
    </View>
  );
};

const styles = StyleSheet.create({
  likeSpaceBlock: {
    // paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
  },
  groupParent: {
    paddingTop: Padding.p_3xs,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
  frameParent: {
    justifyContent: "center",
    backgroundColor: Color.color1,
  },
});

export default QuoteNews;
