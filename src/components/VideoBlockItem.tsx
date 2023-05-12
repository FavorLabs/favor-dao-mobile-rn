import * as React from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { PostInfo } from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl} from "../utils/hook";
import {getContent} from "../utils/util";
import RowUser from "./RowUser";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useEffect} from "react";

type Props = {
  postInfo: PostInfo
  isReTransfer?: boolean
  isQuote?: boolean
};

const VideoBlockItem: React.FC<Props> = (props) => {
  const { postInfo, isReTransfer, isQuote } = props;
  const { contents, orig_contents, created_on, dao, author_dao } = props.postInfo;
  const imagesResUrl = useResourceUrl('images');
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);
  const navigation = useNavigation();
  const [isLogin, gotoLogin] = useIsLogin();

  const toVideoDetail = () => {
    if(postInfo.member === 1) {
      if(isLogin) {
        // @ts-ignore
        navigation.navigate(Screens.VideoPlay,{ postId: props.postInfo.id});
      } else {
        gotoLogin();
      }
    } else {
      // @ts-ignore
      navigation.navigate(Screens.VideoPlay,{ postId: props.postInfo.id});
    }
  }

  return (
    <View style={styles.rowUserParent}>
      <RowUser
        time={created_on}
        daoInfo={isQuote || isReTransfer ? author_dao : dao}
        postInfo={postInfo}
        isReTransfer={isReTransfer}
        isQuote={isQuote}
        userDao={dao}
      />
      <TouchableOpacity onPress={toVideoDetail}>

        <View style={[styles.description, styles.likeSpaceBlock]}>
          <Text style={styles.description1}>
            {info?.[1]?.[0]?.content}
          </Text>
        </View>

        <View style={[styles.imageParent, styles.likeSpaceBlock]}>
          <Image
            style={styles.imageIcon}
            resizeMode="cover"
            source={{uri:`${imagesResUrl}/${info?.[3]?.[0]?.content}`}}
          />

          { postInfo.member === 1 &&
            <View style={[styles.rectangleParent, styles.groupChildLayout]}>
              <View style={[styles.groupChild, styles.lockIconPosition]} />
                <View style={styles.subtitleParent}>
                  <Text style={styles.subtitle}>Unlock</Text>
                    <Image
                       style={[styles.lockIcon, styles.lockIconPosition]}
                       resizeMode="cover"
                       source={require("../assets/lock.png")}
                    />
                </View>
            </View>
          }


          <Image
            style={styles.playCircleIcon}
            resizeMode="cover"
            source={require("../assets/playcircle.png")}
          />

        </View>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  likeSpaceBlock: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  groupChildLayout: {
    width: 82,
    height: 24,
  },
  lockIconPosition: {
    left: 0,
    position: "absolute",
  },
  description1: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  description: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    marginTop: 14,
    flexDirection: "row",
  },
  imageIcon: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_xs,
    top: 0,
    left: 0,
    height: 24,
    width: 82,
    backgroundColor: Color.color1,
  },
  subtitle: {
    left: 21,
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.darkslategray_400,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    lineHeight: 20,
    height: 19,
    top: 0,
    position: "absolute",
    letterSpacing: 0,
  },
  lockIcon: {
    top: 1,
    width: 16,
    height: 15,
    overflow: "hidden",
  },
  subtitleParent: {
    top: 3,
    left: 7,
    width: 67,
    height: 19,
    position: "absolute",
  },
  rectangleParent: {
    top: 14,
    right: 14,
    height: 24,
    position: "absolute",
  },
  playCircleIcon: {
    top: 84,
    left: 182,
    width: 47,
    height: 43,
    overflow: "hidden",
    position: "absolute",
  },
  imageParent: {
    height: 210,
  },
  rowUserParent: {
    paddingHorizontal: 0,
    // backgroundColor: Color.color1,
    alignSelf: "stretch",
  },
});

export default VideoBlockItem;
