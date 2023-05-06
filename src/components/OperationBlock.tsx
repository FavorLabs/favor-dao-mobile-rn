import * as React from "react";
import {
  Image,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";
import { PostInfo } from '../declare/global';
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet'
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUrl} from "../utils/hook";
import PostApi from '../services/DAOApi/Post';
import {getDebounce} from "../utils/util";
import { ReTransferPost } from "../declare/api/DAOApi";
import Toast from 'react-native-toast-message';

type Props = {
  postInfo: PostInfo
};

const OperationBlock: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const { id } = props.postInfo;
  const url = useUrl();

  const navigation = useNavigation<StackNavigationProp<any>>();
  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = ['', Screens.QuoteEdit];

  const [like, setLike] = useState<boolean>(false);
  const [isPostLike, setIsPostLike] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(postInfo?.upvote_count);
  const [watchCount, setWatchCount] = useState<number>(postInfo?.view_count);

  const showActionSheet = () => {
    actionSheetRef.current?.show()
  }

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if (isPostLike) {
      try {
        setIsPostLike(false);
        const { data } = await PostApi.postLike(url, id);
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
    try {
      const { data } = await PostApi.addPostView(url, id);
      if (data.data.status) setWatchCount(watchCount + 1);
    } catch (e) {}
  };

  const reTransferFun = async () => {
    try {
      const postData: ReTransferPost = {
        dao_id: '644b8ab03d02093d481d0658',
        type: 2,
        ref_id: id,
        ref_type: 0,
        visibility: 1,
      };
      const { data } = await PostApi.reTransferPost(url, postData);
      if (data.data) {
        return Toast.show({
          type: 'info',
          text1: 'reTransfer success!!',
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
    navigation.navigate(Screens.QuoteEdit,{ postId: id});
  };

  useEffect(() => {
    getPostLikeStatus()
  },[]);

  useEffect(() => {
    setIsPostLike(true);
  }, [like]);

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
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={require("../assets/icons8comments-1.png")}
        />
        <Text style={[styles.symbol, styles.symbolTypo]} numberOfLines={1}>{postInfo?.comment_count}</Text>
      </View>

      <View style={styles.look}>
        <TouchableOpacity onPress={getDebounce(postLike)} style={styles.touch}>
        <Image
          style={styles.icons8Share1}
          resizeMode="cover"
          source={ like ? require("../assets/icons8facebooklike-1.png") : require("../assets/like.png")}
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
            if(index === 1) {
              toQuoteEdit()
            } else {
              reTransferFun()
            }
          };
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
