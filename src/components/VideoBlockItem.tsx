import * as React from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {FontSize, FontFamily, Color, Padding, Border} from "../GlobalStyles";
import {PostInfo} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl} from "../utils/hook";
import {getContent} from "../utils/util";
import RowUser from "./RowUser";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useEffect, useMemo, useState} from "react";
import SvgIcon from "./SvgIcon";
import Lock from "../assets/svg/NewsFeed/lock.svg";
import UnLock from "../assets/svg/NewsFeed/unlock.svg"
import PlayCircle from "../assets/svg/NewsFeed/playCircle.svg"
import {strings} from "../locales/i18n";

type Props = {
  postInfo: PostInfo
  isReTransfer?: boolean
  isQuote?: boolean
  showOperate: boolean
};

const VideoBlockItem: React.FC<Props> = (props) => {
  const {postInfo, isReTransfer, isQuote, showOperate} = props;
  const {contents, orig_contents, created_on, dao, author_dao, origCreatedAt} = props.postInfo;
  const imagesResUrl = useResourceUrl('images');
  const [isSubscribedStatus, setIsSubscribedStatus] = useState(false);
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);
  const navigation = useNavigation();
  const [isLogin, gotoLogin] = useIsLogin();

  const memberStatus = useMemo(() => isReTransfer || isQuote ? postInfo.orig_member : postInfo.member, [])

  const toVideoDetail = () => {
    if (isLogin || memberStatus === 0) {
      // @ts-ignore
      navigation.navigate(Screens.VideoPlay, {postId: isQuote ? postInfo.ref_id : postInfo.id});
    } else {
      gotoLogin();
    }
  }
  useEffect(() => {
    if (isReTransfer || isQuote) {
      setIsSubscribedStatus(postInfo.author_dao.is_subscribed)
    } else {
      setIsSubscribedStatus(postInfo.dao.is_subscribed)
    }
  }, [])

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
            source={{uri: `${imagesResUrl}/${info?.[3]?.[0]?.content}`}}
          />

          {memberStatus === 1 &&
              <View style={styles.rectangleParent}>
                  <View style={styles.subtitleParent}>
                      <Text style={styles.subtitle}>{isSubscribedStatus ? strings('VideoBlockItem.Unlock') : strings('VideoBlockItem.Locked')} </Text>
                      <SvgIcon svg={isSubscribedStatus ? <UnLock/> : <Lock/>} width={15}/>
                  </View>
              </View>
          }

          <View style={styles.playBlock}>
            <SvgIcon svg={<PlayCircle/>} width={40} height={40}/>
          </View>

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
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  subtitle: {
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    color: Color.darkslategray_400,
    letterSpacing: 0,
    marginRight: 4,
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
  playBlock: {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40,
    position: "absolute",
    alignItems: "center",
    justifyContent: 'center'
  },
  imageParent: {
    height: 210,
    position: "relative",
  },
  rowUserParent: {
    paddingHorizontal: 0,
    paddingTop: 12,
    alignSelf: "stretch",
  },
});

export default VideoBlockItem;
