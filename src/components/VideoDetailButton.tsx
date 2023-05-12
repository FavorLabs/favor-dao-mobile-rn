import * as React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet'
import {PostInfo} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl, useScreenDimensions, useUrl} from "../utils/hook";
import {createRef, useEffect, useRef, useState} from "react";
import PostApi from "../services/DAOApi/Post";
import {getDebounce} from "../utils/util";
import BottomSheet from "./BottomSheet";
import Comment from "./Comment";
import ChunkSourceInfo from "./ChunkSourceInfo";
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {ReTransferPost} from "../declare/api/DAOApi";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type Props = {
    postInfo: PostInfo;
    vSrc: string;
};

const VideoDetailButton: React.FC<Props> = (props) => {
  const { postInfo, vSrc } = props;
  const url = useUrl();
  const navigation = useNavigation();
  const avatarsResUrl = useResourceUrl('avatars');
  const { screenWidth, screenHeight } = useScreenDimensions();
  const { dao } = useSelector((state: Models) => state.global);
  const [isLogin, gotoLogin] = useIsLogin();

  const commentRef = createRef<any>();

    const [like, setLike] = useState<boolean>(false);
    const [isPostLike, setIsPostLike] = useState<boolean>(true);
    const [likeCount, setLikeCount] = useState<number>(postInfo.upvote_count);
    // const [watchCount, setWatchCount] = useState<number>(postInfo.view_count);
    const [refCount, setRefCount] = useState<number>(postInfo.ref_count);
    const [commentOnCount, setCommentOnCount] = useState<number>(postInfo.comment_count);
    const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [sourceInfoDialog, setSourceInfoDialog] = useState(false);
    const [videoHash, setVideoHash] = useState<string>('');
    const [oracleArr, setOracleArr] = useState<string[]>([]);

  const actionSheetRef = useRef<ActionSheet>(null);
  const screens = ['', Screens.QuoteEdit];

  const getPostLikeStatus = async () => {
    const {data} = await PostApi.checkPostLike(url, postInfo.id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if(isLogin) {
        if (isPostLike && postInfo) {
          try {
            setIsPostLike(false);
            const {data} = await PostApi.postLike(url, postInfo.id);
            if (data.data) {
              setLike(data.data.status);
              if (data.data.status) { // @ts-ignore
                setLikeCount(likeCount + 1);
              } else { // @ts-ignore
                setLikeCount(likeCount - 1);
              }
            }
          } catch (e) {
            setIsPostLike(true);
          }
        }
    } else {
      gotoLogin();
    }
  };

  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : postInfo.author_dao.avatar ? postInfo.author_dao : postInfo.dao , type : 'Mixed'});
    event.stopPropagation();
  };

  const toQuoteEdit = async () => {
    // @ts-ignore
    navigation.navigate(Screens.QuoteEdit, {postId: postInfo.id});
  };

  const reTransferFun = async () => {
    try {
      if(dao) {
        const postData: ReTransferPost = {
          dao_id: dao?.id,
          type: 2,
          ref_id: postInfo.id,
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

  useEffect(() => {
    if (postInfo) {
      getPostLikeStatus();
    }
  }, []);

  useEffect(() => {
    setIsPostLike(true);
  }, [like]);

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
              <TouchableOpacity onPress={toDaoCommunity}>
              <View>
                  <Image
                    style={[styles.avatar]}
                    resizeMode="cover"
                    source={{uri: `${avatarsResUrl}/${postInfo.author_dao.avatar ? postInfo.author_dao.avatar : postInfo.dao.avatar}`}}
                  />
              </View>
              </TouchableOpacity>

        <View style={[styles.threeButton]}>
          <TouchableOpacity onPress={getDebounce(postLike)}>
            <Image
              style={[styles.image]}
              resizeMode="cover"
              source={like ? require("../assets/frameLiked.png") : require("../assets/frame.png")}
            />
          </TouchableOpacity>
          <Text style={[styles.text]}>{likeCount}</Text>
        </View>

        <View style={[styles.threeButton]}>
          <TouchableOpacity onPress={() => {
            if(isLogin) {
              setShowCommentDialog(true);
            } else {
              gotoLogin();
            }
          }}>
            <Image
              style={[styles.image]}
              resizeMode="cover"
              source={require("../assets/icons8comments-2.png")}
            />
          </TouchableOpacity>
          <Text style={[styles.text]}>{commentOnCount}</Text>
        </View>

              <View style={[styles.threeButton]}>
                  <TouchableOpacity onPress={showActionSheet}>
                  <Image
                    style={[styles.image]}
                    resizeMode="cover"
                    source={require("../assets/frame1.png")}
                  />
                  </TouchableOpacity>
                  <Text style={[styles.text]}>{refCount}</Text>
              </View>
          </View>
          <View>
              <TouchableOpacity onPress={() => {
                  setSourceInfoDialog(true);
              }}>
              <Image
                style={[styles.alertCircleIcon]}
                resizeMode="cover"
                source={require("../assets/alertcircle.png")}
              />
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
                ;
            }}
          />
          <BottomSheet
            show={showCommentDialog}
            children={<View style={{ width: screenWidth }}>
                <Comment
                  onRef={commentRef}
                  postId={postInfo.id}
                  comment={comment}
                  setComment={setComment}
                  postType={postInfo.type}
                />
            </View>}
            // enablePanDownToClose={false}
            // handleIndicatorStyle={{
            //     display: 'none'
            // }}
            onChange={(index) => {
                if (index === -1) {
                    setShowCommentDialog(false);
                }
            }}
            footer={
                <View style={[styles.footer, { width: screenWidth - 32 }]}>
                    <TextInput
                      style={styles.footerInput}
                      placeholder={'Comment...'}
                      placeholderTextColor={Color.darkslategray_400}
                      value={comment}
                      onChangeText={(value) => {
                          setComment(value);
                      }}
                    />
                    <TouchableOpacity onPress={getDebounce(() => {
                        console.log('send comment--', comment);
                        commentRef.current?.sendComment();
                    })}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            }
          />
          <BottomSheet
            children={<View style={[styles.sourceInfoWrap, { width: screenWidth, height: screenHeight / 2 - 80 }]}>
                <ChunkSourceInfo
                  videoHash={videoHash}
                  oracleArr={oracleArr}
                />
            </View>}
            show={sourceInfoDialog}
            onChange={(index) => {
                if (index === -1) {
                    setSourceInfoDialog(false);
                }
            }}
          />
      </View>
    );
};

const styles = StyleSheet.create({
  placeholderParent: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-between',

  },
  avatar: {
    marginBottom: 20,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  threeButton: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    // marginTop: 5,
    color: Color.color1,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },

  alertCircleIcon: {
    overflow: "hidden",
    height: 30,
    width: 30,
  },
  groupParent: {
    bottom: 30,
    right: 15,
    // height: 336,
    // width: 30,
    position: "absolute",
    display: 'flex',
    justifyContent: 'center'
  },

    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Color.color2
    },
    footerInput: {
        flex: 1,
        marginRight: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: Color.color1
    },

    sourceInfoWrap: {
        marginTop: 10,
    }
});

export default VideoDetailButton;
