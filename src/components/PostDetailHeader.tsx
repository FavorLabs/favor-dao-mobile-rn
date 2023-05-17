import React, {useEffect, useMemo, useState} from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import {PostInfo} from "../declare/api/DAOApi";
import {getTime} from "../utils/util";
import JoinButton from "./JoinButton";
import DaoApi from "../services/DAOApi/Dao";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type PostDetailHeaderType = {
  postInfo: PostInfo | null;

  /** Style props */
  postDetailHeaderWidth?: number | string;
  postDetailHeaderPaddingHorizontal?: number | string;
  postDetailHeaderAlignSelf?: string;

  /** Action props */
  onBackPress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const PostDetailHeader = ({
  onBackPress,
  postDetailHeaderWidth,
  postDetailHeaderPaddingHorizontal,
  postDetailHeaderAlignSelf,
  postInfo,
}: PostDetailHeaderType) => {
  const url = useUrl();
  const { dao } = useSelector((state: Models) => state.global);
  const avatarsResUrl = useResourceUrl('avatars');

  const createTime = getTime(postInfo ? postInfo?.created_on : 0);
  const [isJoin, setIsJoin] = useState(false);
  const [btnLoading,setBtnLoading] = useState<boolean>(false);
  const [isLogin, gotoLogin] = useIsLogin();

  const bookmarkHandle = async () => {
    if(!isLogin) return gotoLogin();
    if (btnLoading) return ;
    if(postInfo?.dao.id){
      setBtnLoading(true)
      try {
        const { data } = await DaoApi.bookmark(url, postInfo.dao.id);
        setIsJoin(data.data.status);
        setBtnLoading(false)
      } catch (e) {
        if (e instanceof Error) console.error(e.message);
        setBtnLoading(false)
      }
    }
  };

  const checkJoinStatus = async () => {
    if(postInfo?.dao.id)
    try {
      const { data } = await DaoApi.checkBookmark(url, postInfo.dao.id);
      setIsJoin(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  useEffect(() =>  {
    if(isLogin) checkJoinStatus();
  },[postInfo?.dao.id])

  const postDetailHeaderStyle = useMemo(() => {
    return {
      ...getStyleValue("width", postDetailHeaderWidth),
      ...getStyleValue("paddingHorizontal", postDetailHeaderPaddingHorizontal),
      ...getStyleValue("alignSelf", postDetailHeaderAlignSelf),
    };
  }, [
    postDetailHeaderWidth,
    postDetailHeaderPaddingHorizontal,
    postDetailHeaderAlignSelf,
  ]);

  return (
    <View style={[styles.postdetailHeader, postDetailHeaderStyle]}>
      <Pressable style={styles.back} onPress={onBackPress}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/back1.png")}
        />
      </Pressable>
      <Image
        style={styles.imageIcon}
        resizeMode="cover"
        source={{uri: `${avatarsResUrl}/${postInfo?.dao.avatar}`}}
      />
      <View style={styles.info}>
        <Text style={[styles.title, styles.titleTypo]} numberOfLines={1}>
          {postInfo?.dao.name}
        </Text>
        <Text style={[styles.subtitle, styles.titleTypo]} numberOfLines={1}>
          {createTime}
        </Text>
      </View>

      {
        postInfo?.dao.id !== dao?.id &&
          <JoinButton isJoin={isJoin} handle={bookmarkHandle} isLoading={btnLoading}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  join1FlexBox: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_xs,
    width: 64,
    borderRadius: Border.br_lg,
    paddingVertical: Padding.p_9xs,
    alignItems: "center",
    flexDirection: "row",
  },
  joinTypo: {
    textAlign: "center",
    fontSize: FontSize.paragraphP313_size,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 23,
    letterSpacing: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  back: {
    width: 24,
    height: 24,
  },
  imageIcon: {
    borderRadius: 40,
    width: 40,
    height: 40,
    marginLeft: 12,
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary,
    width: 158,
    lineHeight: 23,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 251,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  join: {
    color: Color.color3,
  },
  joined: {
    borderStyle: "solid",
    borderColor: "#8a8a8e",
    borderWidth: 1,
    display: "none",
  },
  join2: {
    color: Color.color,
  },
  join1: {
    backgroundColor: Color.color2,
    marginLeft: 10,
  },
  follow: {
    borderRadius: Border.br_29xl,
    overflow: "hidden",
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_9xs,
    marginLeft: 12,
    flexDirection: "row",
  },
  postdetailHeader: {
    alignSelf: "stretch",
    backgroundColor: Color.color1,
    height: 90,
    paddingTop: Padding.p_29xl,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default PostDetailHeader;
