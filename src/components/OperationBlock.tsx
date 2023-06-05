import * as React from "react";
import {
  ActivityIndicator,
  Image, Platform,
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
import analytics from "@react-native-firebase/analytics";
import Favor from "../libs/favor";

type Props = {
  postInfo: PostInfo;
  type: number;
};

const OperationBlock: React.FC<Props> = (props) => {
  const {postInfo, type} = props;
  const {id, ref_id, contents} = props.postInfo;
  const url = useUrl();
  // const { token } = useSelector((state: any) => state.wallet);
  const {dao} = useSelector((state: Models) => state.global);
  const [isLogin, gotoLogin] = useIsLogin();

  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;

  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = ['', Screens.QuoteEdit];

  const [postId, setPostId] = useState<string>('');
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(postInfo?.upvote_count);
  const [watchCount, setWatchCount] = useState<number>(postInfo?.view_count);
  const [refCount, setRefCount] = useState<number>(postInfo.ref_count);
  const [commentOnCount, setCommentOnCount] = useState<number>(postInfo.comment_count);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);

  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if (isLogin) {
      if (dao) {
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
    const {data} = await PostApi.checkPostLike(url, postId);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if (!isLogin) return gotoLogin();
    if (isLikeLoading) return;
    try {
      setIsLikeLoading(true);
      const {data} = await PostApi.postLike(url, postId);
      if (data.data) {
        setLike(data.data.status);
        if (data.data.status) setLikeCount(likeCount + 1);
        else setLikeCount(likeCount - 1);
        analytics().logEvent('like', {
          platform: Platform.OS,
          networkId: Favor.networkId,
          region: Favor.bucket?.Settings.Region,
          postId: postId,
          type: data.data.status
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'post like error',
      })
    } finally {
      setIsLikeLoading(false);
    }
  };

  const postView = async () => {
    try {
      const {data} = await PostApi.addPostView(url, postId);
      if (data.data.status) setWatchCount(watchCount + 1);
    } catch (e) {
    }
  };

  const reTransferFun = async () => {
    if (!isLogin) return gotoLogin();
    try {
      if (dao) {
        const postData: ReTransferPost = {
          dao_id: dao?.id,
          type: 0,
          ref_id: postId,
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
    if (!isLogin) return gotoLogin();
    // @ts-ignore
    navigation.navigate(Screens.QuoteEdit, {postId: postId});
  };

  const toPostDerail = () => {
    if (routeName !== Screens.PostDetail) {
      // @ts-ignore
      navigation.navigate(type === 0 ? Screens.PostDetail : Screens.VideoPlay, {postId: postId});
    }
  };

  useEffect(() => {
    if (isLogin && postId) {
      postView();
      getPostLikeStatus();
    }
  }, [postId]);

  useEffect(() => {
    if (contents) {
      setPostId(id);
    } else {
      setPostId(ref_id);
    }
  }, [])

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
        <TouchableOpacity onPress={postLike} style={styles.touch}>
          {
            isLikeLoading ? <ActivityIndicator size="small"/> :
              <Image
                style={styles.icons8Share1}
                resizeMode="cover"
                source={like ? require("../assets/icons8facebooklike-1.png") : require("../assets/like.png")}
              />
          }
          <Text style={[like ? styles.symbol3 : styles.symbol, styles.symbolTypo]} numberOfLines={1}>{likeCount}</Text>
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
    fontWeight: '400',
    fontSize: FontSize.size_mini,
  },
  icons8Share1: {
    width: 20,
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
    backgroundColor: Color.color1,
    marginTop: 10,
    paddingTop: Padding.p_8xs,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
});

export default OperationBlock;
