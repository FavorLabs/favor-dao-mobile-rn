// @ts-ignore
import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";
import {Post, PostInfo} from "../declare/global";
import {getContent} from "../utils/util";

export type Props = {
  postInfo: PostInfo;
  isQuote?: boolean | undefined;
  isReTransfer?: boolean;
};
const NewsDescription: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer } = props;
  const { contents, orig_contents } = props.postInfo;
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);

  return (
    <View
      style={[styles.description,]}
    >
      <View style={styles.descriptionWrapper}>
        <Text
          style={[styles.description1]}
          numberOfLines={3}
          ellipsizeMode='tail'
        >
          {info[2]?.[0]?.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comeOn: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  craigLove: {
    color: Color.accentLight,
  },
  description1: {
    fontSize: FontSize.bodyBody17_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.paragraphP313,
    textAlign: "left",
  },
  descriptionWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
  description: {
    marginTop: 10,
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
  },
});

export default NewsDescription;
