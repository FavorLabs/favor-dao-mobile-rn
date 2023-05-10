import * as React from "react";
import { StyleSheet, View } from "react-native";
import NewsContent from "./NewsContent";
import OperationBlock from "./OperationBlock";
import { Color, Padding } from "../GlobalStyles";
import { PostInfo } from '../declare/global';

export type Props = {
  postInfo: PostInfo;
  isReTransfer?: boolean;
};

const NewsCard: React.FC<Props> = (props) => {
  const { postInfo, isReTransfer = false } = props;
  return (
    <View style={styles.feedsJoinedInner}>
      <View style={styles.groupParent}>
        <NewsContent postInfo={postInfo} isReTransfer={isReTransfer}/>
        <OperationBlock postInfo={postInfo}/>
        <View style={styles.frameChild} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedsJoinedInner: {
    paddingHorizontal: 0,
    alignItems: "center",
    alignSelf: "stretch",
  },
  groupParent: {
    paddingTop: 10,
    backgroundColor: Color.color1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
});

export default NewsCard;
