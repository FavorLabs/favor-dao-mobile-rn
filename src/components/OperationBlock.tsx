import * as React from "react";
import {
  Image,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from "react-native";
import {FontFamily, FontSize, Color, Padding} from "../GlobalStyles";
import {PostInfo} from "../declare/api/DAOApi";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet'
import Screens from "../navigation/RouteNames";
import {useNavigation, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useIsLogin, useUrl} from "../utils/hook";
import PostApi from '../services/DAOApi/Post';
import {getDebounce} from "../utils/util";
import {ReTransferPost} from "../declare/api/DAOApi";
import Toast from 'react-native-toast-message';
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type Props = {
  postInfo: PostInfo;
  type: number;
};

const OperationBlock: React.FC<Props> = (props) => {
  const { postInfo, type } = props;
  const {id} = props.postInfo;
  const url = useUrl();
  const { token } = useSelector((state: any) => state.wallet);
  const { dao } = useSelector((state: Models) => state.global);
  const [isLogin, gotoLogin] = useIsLogin();

  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;

  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = ['', Screens.QuoteEdit];

  const [like, setLike] = useState<boolean>(false);
  const [isPostLike, setIsPostLike] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(postInfo?.upvote_count);
  const [watchCount, setWatchCount] = useState<number>(postInfo?.view_count);

  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if(isLogin) {
      if(dao) {
        actionSheetRef.current?.show();
      } else {
        Toast.show({
          type: 'error',
          text1: 'please create a community!'
        });
        e.preventDefault()
      }
    } else {
      gotoLogin();
      e.preventDefault()
    }
  }

  const getPostLikeStatus = async () => {
    const {data} = await PostApi.checkPostLike(url, id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if(!isLogin) return  gotoLogin();
    if (isPostLike) {
      try {
        setIsPostLike(false);
        const {data} = await PostApi.postLike(url, id);
        if (data.data) {
          setLike(data.data.status);
          if (data.data.status) setLikeCount(likeCount + 1);
          else setLikeCount(likeCount - 1);
        }
      } catch (e) {
        setIsPostLike(true);
      }
    }
  };

  const postView = async () => {
    if (token) {
      try {
        const {data} = await PostApi.addPostView(url, id);
        if (data.data.status) setWatchCount(watchCount + 1);
      } catch (e) {}
    }
  };

  const reTransferFun = async () => {
    try {
      if (dao) {
        const postData: ReTransferPost = {
          dao_id: dao?.id,
          type: 2,
          ref_id: id,
          ref_type: 0,
          visibility: 1,
        };
        const {data} = await PostApi.reTransferPost(url, postData);
        if (data.data) {
          return Toast.show({
            type: 'info',
            text1: 'reTransfer success!!',
          })
        }
      } else {
        return Toast.show({
          type: 'error',
          text1: 'reTransfer error!!',
        })
      }
    } catch (e) {
      return Toast.show({
        type: 'error',
        text1: 'reTransfer error!!',
      })
    }
  };

  const toQuoteEdit = async () => {
    // @ts-ignore
    navigation.navigate(Screens.QuoteEdit, {postId: id});
  };

  const toPostDerail = () => {
    if(routeName !== Screens.PostDetail) {
      // @ts-ignore
      navigation.navigate(type === 0 ? Screens.PostDetail : Screens.VideoPlay,{ postId: postInfo.id});
    }
  };

  useEffect(() => {
    if (token) getPostLikeStatus()
  }, [token]);

  useEffect(() => {
    if (token) setIsPostLike(true);
  }, [like, token]);

  useEffect(() => {
    if (id) {
      postView();
    }
  }, [id]);

  return (
    <View style={styles.like}>

      <View style={styles.look}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8share-1.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]} numberOfLines={1}>{watchCount}</Text>
      </View>


      <View style={styles.look}>
        <TouchableOpacity onPress={showActionSheet} style={styles.touch}>
          <Image
            style={styles.icons8Share1}
            resizeMode="cover"
            source={require("../assets/icons8share-11.png")}
          />
          <Text style={[styles.symbol, styles.symbolTypo]} numberOfLines={1}>{postInfo?.ref_count}</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.look}>
        <TouchableOpacity onPress={toPostDerail} style={styles.touch}>
          <Image
            style={styles.icons8Share1}
            resizeMode="cover"
            source={require("../assets/icons8comments-1.png")}
          />
          <Text style={[styles.symbol, styles.symbolTypo]} numberOfLines={1}>{postInfo?.comment_count}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.look}>
        <TouchableOpacity onPress={getDebounce(postLike)} style={styles.touch}>
          <Image
            style={styles.icons8Share1}
            resizeMode="cover"
            source={like ? require("../assets/icons8facebooklike-1.png") : require("../assets/like.png")}
          />
          <Text style={[styles.symbol3, styles.symbolTypo]} numberOfLines={1}>{likeCount}</Text>
        </TouchableOpacity>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        title={'ReTransfer & Quote'}
        options={['ReTransfer', 'Quote', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index: number) => {
          if (index < screens.length) {
            if (index === 1) {
              toQuoteEdit()
            } else {
              reTransferFun()
            }
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  symbolTypo: {
    marginLeft: 6,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    // lineHeight: 20,
    // letterSpacing: 0,
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
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
  },
  look: {
    display: 'flex',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    display: 'flex',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    // alignSelf: "stretch",
    backgroundColor: Color.color1,
    height: 24,
    // paddingHorizontal: Padding.p_base,
    marginTop: 10,
    paddingTop: Padding.p_8xs,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
});

export default OperationBlock;
