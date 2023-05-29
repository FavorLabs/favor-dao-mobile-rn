import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color, Padding } from "../GlobalStyles";
import { PostInfo } from "../declare/api/DAOApi";
import NewsCard from "./NewsCard";
import VideoBlock from "./VideoBlock";

export type Props = {
  postInfo: PostInfo;
};

const ReTransfer: React.FC<Props> = (props) => {
  const { postInfo } = props;
  return (
    <View style={styles.feedsJoinedInner}>
      {
        postInfo?.orig_type === 0 ? (
          <NewsCard postInfo={postInfo} />
        ) : postInfo?.orig_type === 1 ? (
          <VideoBlock postInfo={postInfo} isReTransfer={true}/>
        ) : (
          <></>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  feedsJoinedInner: {
    paddingHorizontal: 0,
    // paddingTop: Padding.p_3xs,
    // alignItems: "center",
    // alignSelf: "stretch",
  },
});

export default ReTransfer;
