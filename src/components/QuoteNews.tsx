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
        <View style={[styles.description, styles.parentFrameSpaceBlock]}>
          <View style={[styles.descriptionWrapper]}>
            <NewsDescription postInfo={postInfo}/>
          </View>
        </View>
      </View>
      <View style={[styles.frameWrapper, styles.parentFrameSpaceBlock]}>
        <View style={styles.groupWrapper}>
          {
            postInfo?.orig_type === 0 ? (
              <NewsContent postInfo={postInfo} isQuote={true}/>
            ) : (
              <VideoBlockItem postInfo={postInfo} isQuote={true}/>
            )
          }

        </View>
      </View>
      <OperationBlock postInfo={postInfo}/>
      <View style={styles.frameChild} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentFrameSpaceBlock: {
    // marginTop: 10,
    // marginBottom: 10,
    alignSelf: "stretch",
  },
  likeSpaceBlock: {
    // paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
  },
  titleTypo: {
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  symbolTypo: {
    marginLeft: 6,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  groupChild: {
    height: "95.24%",
    width: "14.04%",
    right: "85.96%",
    bottom: "4.76%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  subtitle: {
    width: "81.74%",
    top: "52.38%",
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightSecondary,
    left: "18.26%",
    position: "absolute",
  },
  title: {
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    left: "18.26%",
    fontSize: FontSize.bodyBody17_size,
    top: "0%",
    position: "absolute",
  },
  ellipseParent: {
    width: 285,
    height: 42,
  },
  description1: {
    paddingHorizontal: Padding.p_base,
    lineHeight: 22,
    color: Color.iOSSystemLabelsLightPrimary,
    fontSize: FontSize.bodyBody17_size,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  descriptionWrapper: {
  },
  description: {
    flex: 1,
  },
  groupParent: {
    paddingTop: Padding.p_3xs,
  },
  groupWrapper: {
    backgroundColor: Color.whitesmoke_300,
    paddingTop: Padding.p_base,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameWrapper: {
    alignItems: "center",
    backgroundColor: Color.color1,
  },
  icons8Share1: {
    width: 20,
    height: 21,
    overflow: "hidden",
  },
  symbol: {
    color: Color.iOSSystemLabelsLightSecondary,
    marginLeft: 6,
  },
  icons8Share1Parent: {
    top: 0,
    left: 0,
    flexDirection: "row",
    position: "absolute",
  },
  look: {
    width: 52,
    height: 21,
  },
  comments: {
    flexDirection: "row",
  },
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  like: {
    height: 24,
    paddingTop: Padding.p_8xs,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Color.color1,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
  likeParent: {
    backgroundColor: Color.color1,
  },
  frameParent: {
    justifyContent: "center",
    backgroundColor: Color.color1,
  },
});

export default QuoteNews;
