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
  showOperate:boolean
};

const VideoBlockItem: React.FC<Props> = (props) => {
  const { postInfo, isReTransfer, isQuote ,showOperate} = props;
  const { contents, orig_contents, created_on, dao, author_dao, origCreatedAt } = props.postInfo;
  const imagesResUrl = useResourceUrl('images');
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);
  const navigation = useNavigation();
  const [isLogin, gotoLogin] = useIsLogin();

  const toVideoDetail = () => {
    if(postInfo.member === 1) {
      if(isLogin) {
        // @ts-ignore
        navigation.navigate(Screens.VideoPlay,{ postId: isQuote ? postInfo.ref_id : postInfo.id});
      } else {
        gotoLogin();
      }
    } else {
      // @ts-ignore
      navigation.navigate(Screens.VideoPlay,{ postId: isQuote ? postInfo.ref_id : postInfo.id});
    }
  }

  return (
    <View style={[styles.rowUserParent, {backgroundColor: isQuote || isReTransfer ? '#eaeaea' : '#fff'}]}>
      <RowUser
        time={isQuote ? origCreatedAt : created_on}
        daoInfo={isQuote || isReTransfer ? author_dao : dao}
        postInfo={postInfo}
        showOperate={showOperate}
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
            <View style={styles.rectangleParent}>
              <View style={styles.subtitleParent}>
                <Text style={styles.subtitle}>{ postInfo.dao.is_subscribed ? 'Unlock' : 'Locked' }</Text>
                <Image
                  style={styles.lockIcon}
                  resizeMode="cover"
                  source={postInfo.dao.is_subscribed ? require("../assets/unlock.png") : require("../assets/lock.png")}
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
  description1: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    textAlign: "left",
    fontWeight: '400',
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
  subtitle: {
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    color: Color.darkslategray_400,
    lineHeight: 20,
    letterSpacing: 0,
    marginRight: 2,
  },
  lockIcon: {
    marginLeft: 2,
    width: 15,
    height: 15,
  },
  subtitleParent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleParent: {
    top: 14,
    right: 14,
    height: 24,
    position: "absolute",
    borderRadius: Border.br_xs,
    width: 82,
    backgroundColor: Color.color1,
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
    paddingTop: 12,
    alignSelf: "stretch",
  },
});

export default VideoBlockItem;
