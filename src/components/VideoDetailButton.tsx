import * as React from "react";
import {ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet'
import {PostInfo} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl, useScreenDimensions, useUrl} from "../utils/hook";
import {useEffect, useRef, useState} from "react";
import PostApi from "../services/DAOApi/Post";
import ChunkSourceInfo from "./ChunkSourceInfo";
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {ReTransferPost} from "../declare/api/DAOApi";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import CommentModal from "./CommentModal";
import BottomSheetModal from "./BottomSheetModal";
import analytics from "@react-native-firebase/analytics";
import Favor from "../libs/favor";
import SvgIcon from "./SvgIcon";
import TransFerIcon from '../assets/svg/NewsFeed/videoTransFerIcon.svg';
import MessageInfo from '../assets/svg/NewsFeed/videoMessage.svg';
import UnLike from '../assets/svg/NewsFeed/videoUnLike.svg';
import Like from '../assets/svg/NewsFeed/like.svg';
import SourceInfoIcon from '../assets/svg/NewsFeed/sourceInfoIcon.svg';
import {strings} from "../locales/i18n";

type Props = {
  postInfo: PostInfo;
  vSrc: string;
};

const VideoDetailButton: React.FC<Props> = (props) => {
  const {postInfo, vSrc} = props;
  const url = useUrl();
  const navigation = useNavigation();
  const {dao} = useSelector((state: Models) => state.global);
  const [isLogin, gotoLogin] = useIsLogin();

  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(postInfo.upvote_count);
  const [refCount, setRefCount] = useState<number>(postInfo.ref_count);
  const [commentOnCount, setCommentOnCount] = useState<number>(postInfo.comment_count);

  const [videoHash, setVideoHash] = useState<string>('');
  const [oracleArr, setOracleArr] = useState<string[]>([]);

  const [commentModal, setCommentModal] = useState(false);
  const [sourceInfoModal, setSourceInfoModal] = useState(false);
  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = ['', Screens.QuoteEdit];
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);

  const getPostLikeStatus = async () => {
    const {data} = await PostApi.checkPostLike(url, postInfo.id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if (!isLogin) return gotoLogin();
    if (isLikeLoading) return;
    try {
      setIsLikeLoading(true);
      const {data} = await PostApi.postLike(url, postInfo.id);
      if (data.data) {
        setLike(data.data.status);
        if (data.data.status) {
          setLikeCount(likeCount + 1);
        } else {
          setLikeCount(likeCount - 1);
        }
        analytics().logEvent('like', {
          platform: Platform.OS,
          networkId: Favor.networkId,
          region: Favor.bucket?.Settings.Region,
          postId: postInfo.id,
          type: data.data.status
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: strings('OperationBlock.Toast.postLikeError'),
      })
    } finally {
      setIsLikeLoading(false);
    }
  };

  const toQuoteEdit = async () => {
    // @ts-ignore
    navigation.navigate(Screens.QuoteEdit, {postId: postInfo.id});
  };

  const reTransferFun = async () => {
    try {
      if (dao) {
        const postData: ReTransferPost = {
          dao_id: dao?.id,
          type: 0,
          ref_id: postInfo.id,
          ref_type: 0,
          visibility: 1,
        };
        const {data} = await PostApi.reTransferPost(url, postData);
        if (data.data) {
          return Toast.show({
            type: 'info',
            text1: strings('OperationBlock.Toast.reTransferSuccess'),
          })
        }
      } else {
        return Toast.show({
          type: 'error',
          text1: strings('OperationBlock.Toast.reTransferError'),
        })
      }
    } catch (e) {
      return Toast.show({
        type: 'error',
        text1: strings('OperationBlock.Toast.reTransferError'),
      })
    }
  };

  const showActionSheet = (e: { preventDefault: () => void; }) => {
    if(!isLogin) return gotoLogin();
    if (dao) {
      actionSheetRef.current?.show();
    } else {
      Toast.show({
        type: 'error',
        text1: strings('OperationBlock.Toast.noCommunity')
      });
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (postInfo && isLogin) {
      getPostLikeStatus()
    }
  }, []);

  useEffect(() => {
    if (vSrc) {
      if (vSrc.includes('?')) {
        const temp = vSrc.split('?');
        setVideoHash(temp[0]);
        setOracleArr([temp[1].split('=')[1]]);
      }
    }
  }, [vSrc]);

  return (
    <View style={styles.groupParent}>

      <View style={styles.placeholderParent}>

        <View style={[styles.threeButton]}>
          <TouchableOpacity onPress={postLike}>
            {
              isLikeLoading ? <ActivityIndicator size="small"/> :
              <SvgIcon svg={like ? <Like/> : <UnLike/>} width={30} height={30}/>
            }
          </TouchableOpacity>
          <Text style={[styles.text]}>{likeCount}</Text>
        </View>

        <View style={[styles.threeButton]}>
          <TouchableOpacity onPress={() => {
            if (!isLogin) return gotoLogin();
            setCommentModal(true)
          }}>
            <SvgIcon svg={<MessageInfo/>} width={30} height={30}/>
          </TouchableOpacity>
          <Text style={[styles.text]}>{commentOnCount}</Text>
        </View>

        <View style={[styles.threeButton]}>
          <TouchableOpacity onPress={showActionSheet}>
            <SvgIcon svg={<TransFerIcon/>} width={30} height={30}/>
          </TouchableOpacity>
          <Text style={[styles.text]}>{refCount}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => {
          if (videoHash) setSourceInfoModal(true);
        }} style={styles.circle}>
          <SvgIcon svg={<SourceInfoIcon/>} width={30} height={30}/>
        </TouchableOpacity>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        title={strings('OperationBlock.ReTransferAndQuote')}
        options={[
          strings('OperationBlock.ReTransfer'),
          strings('OperationBlock.Quote'),
          strings('OperationBlock.Cancel')
        ]}
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
      <CommentModal
        visible={commentModal}
        setVisible={setCommentModal}
        postId={postInfo.id}
        postType={postInfo.type}
      />
      <BottomSheetModal
        visible={sourceInfoModal}
        setVisible={setSourceInfoModal}
        height={'60%'}
      >
        <ChunkSourceInfo
          videoHash={videoHash}
          oracleArr={oracleArr}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderParent: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 20,
  },
  threeButton: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  text: {
    color: Color.color1,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  circle: {
    alignItems: "center",
    width: 40,
  },
  groupParent: {
    bottom: 30,
    right: 15,
    position: "absolute",
    display: 'flex',
    justifyContent: 'center',
  }
});

export default VideoDetailButton;
