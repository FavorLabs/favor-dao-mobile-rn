import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NewsContent from "./NewsContent";
import { Padding, FontSize, Color, FontFamily } from "../GlobalStyles";
import RowUser from "./RowUser";
import OperationBlock from "./OperationBlock";
import {PostInfo} from "./PostList";

type Props = {
  postInfo: PostInfo
};

const QuoteNews: React.FC<Props> = (props) => {
  const { postInfo } = props;
  return (
    <View style={[styles.frameParent, styles.parentFrameSpaceBlock]}>
      <View style={[styles.groupParent, styles.likeSpaceBlock]}>
        <RowUser
            image={require("../assets/image3.png")}
            name={'Robbie Harrison'}
            time={'2h ago'}
        />
        <View style={[styles.description, styles.parentFrameSpaceBlock]}>
          <View style={[styles.descriptionWrapper, styles.descriptionPosition]}>
            <Text style={[styles.description1, styles.descriptionPosition]}>
              I like it !
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.frameWrapper, styles.parentFrameSpaceBlock]}>
        <View style={styles.groupWrapper}>
          <NewsContent/>
        </View>
      </View>
      <OperationBlock postInfo={postInfo}/>
      <View style={styles.frameChild} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentFrameSpaceBlock: {
    marginTop: 10,
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
  descriptionPosition: {
    width: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
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
    height: "100%",
    right: "0%",
    bottom: "0%",
  },
  description: {
    height: 22,
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
