import * as React from "react";
import { StyleSheet, View } from "react-native";
import NewsContent from "./NewsContent";
import OperationBlock from "./OperationBlock";
import { Color, Padding } from "../GlobalStyles";

export type Props = {};

const NewsCard: React.FC<Props> = (props) => {
  return (
    <View style={styles.feedsJoinedInner}>
      <View style={styles.groupParent}>
        <NewsContent />
        <OperationBlock/>
        <View style={styles.frameChild} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
  groupParent: {
    backgroundColor: Color.color1,
    // height: 398,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  feedsJoinedInner: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default NewsCard;
