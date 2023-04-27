// @ts-ignore
import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";
import {Post, PostInfo} from "../declare/global";
import {getContent} from "../utils/util";

export type Props = {
  postInfo: PostInfo
};
const NewsDescription: React.FC<Props> = (props) => {
  const { contents } = props.postInfo;
  const info = getContent(contents);

  return (
    <View
      style={[styles.description,  ]}
    >
      <View style={styles.descriptionWrapper}>
        <Text
          style={[styles.description1, styles.descriptionPosition,]}
        >
          {/*<Text style={styles.comeOn}>{`Come on`}</Text>*/}
          {/*<Text style={styles.craigLove}>@craig_love</Text>*/}
          {/*<Text style={styles.comeOn}>*/}
          {/*  {` what are you talking about? Isn’t it a joke? please have a look at this dummy image... `}*/}
          {/*</Text>*/}
          {/*<Text style={styles.craigLove}>{`More`}</Text>*/}
          {info[2]?.[0]?.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionPosition: {
    // height: 66,
    // left: 0,
    // position: "absolute",
  },
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
    alignSelf: "stretch",
    flex: 1,
  },
  description: {
    marginTop: 10,
    // top: 56,
    // width: 411,
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    height: 66,
    // backgroundColor: 'red',
  },
});

export default NewsDescription;
