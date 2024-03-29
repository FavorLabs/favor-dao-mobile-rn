import React, {useEffect, useMemo, useState} from "react";
import {Image, StyleSheet, Pressable, Text, View, TouchableOpacity} from "react-native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import {PostInfo} from "../declare/api/DAOApi";
import {getTime} from "../utils/util";
import JoinButton from "./JoinButton";
import DaoApi from "../services/DAOApi/Dao";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {strings} from "../locales/i18n";

type PostDetailHeaderType = {
  postInfo: PostInfo | null;
  /** Action props */
  onBackPress?: () => void;
};

const PostDetailHeader = ({
  onBackPress,
  postInfo,
}: PostDetailHeaderType) => {
  const url = useUrl();
  const { dao } = useSelector((state: Models) => state.global);
  const avatarsResUrl = useResourceUrl('avatars');
  const navigation = useNavigation();

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
        if(data.data.status) Toast.show({type: 'info', text1: strings('PostDetailScreen.PostDetailHeader.Toast.JoinSuccess')});
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

  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : postInfo?.dao , type : strings('FeedsOfDaoTabBar.Mixed')});
    event.stopPropagation();
  };

  useEffect(() =>  {
    if(isLogin) checkJoinStatus();
  },[postInfo?.dao.id])

  return (
    <View style={styles.postDetailHeader}>
      <Pressable style={styles.back} onPress={onBackPress}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/back1.png")}
        />
      </Pressable>
      <TouchableOpacity style={styles.centerContent} onPress={toDaoCommunity}>
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
      </TouchableOpacity>

      {
        postInfo?.dao.id !== dao?.id &&
          <JoinButton isJoin={isJoin} handle={bookmarkHandle} isLoading={btnLoading}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  titleTypo: {
    textAlign: "left",
    fontWeight: '400',
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
    fontWeight: '400',
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
    textAlign: "left",
    fontWeight: '400',
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 251,
    textAlign: "left",
    fontWeight: '400',
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
  postDetailHeader: {
    backgroundColor: Color.color1,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default PostDetailHeader;
