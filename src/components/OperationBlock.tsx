import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";
import { PostInfo } from '../declare/global';

type Props = {
  postInfo: PostInfo
};

const OperationBlock: React.FC<Props> = (props) => {
  const { postInfo } = props;
  return (
    <View style={styles.like}>
      <View style={styles.look}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8share-1.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]}>{postInfo?.view_count}</Text>
      </View>
      <View style={styles.look}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8share-11.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]}>{postInfo?.ref_count}</Text>
      </View>
      <View style={styles.look}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8comments-1.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]}>{postInfo?.comment_count}</Text>
      </View>
      <View style={styles.look}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8facebooklike-1.png")}
        />
        <Text style={[styles.symbol3, styles.symbolTypo]}>{postInfo?.upvote_count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  symbolTypo: {
    marginLeft: 6,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  icons8Share1: {
    width: 20,
    overflow: "hidden",
    height: 21,
  },
  symbol: {
    color: Color.iOSSystemLabelsLightSecondary,
  },
  look: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row",
    overflow: 'hidden',
    justifyContent: 'center',
  },
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  like: {
    alignSelf: "stretch",
    backgroundColor: Color.color1,
    height: 24,
    // paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_8xs,
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
});

export default OperationBlock;
