import * as React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";
import {PostInfo} from "../declare/global";
import {useResourceUrl, useScreenDimensions, useUrl} from "../utils/hook";
import {createRef, useEffect, useState} from "react";
import PostApi from "../services/DAOApi/Post";
import {getDebounce} from "../utils/util";
import BottomSheet from "./BottomSheet";
import Comment from "./Comment";

type Props = {
    postInfo: PostInfo
};

const VideoDetailButton: React.FC<Props> = (props) => {
    const {postInfo} = props;
    const url = useUrl();
    const avatarsResUrl = useResourceUrl('avatars');
    const { screenWidth, screenHeight } = useScreenDimensions();

    const commentRef = createRef<any>();

    const [like, setLike] = useState<boolean>(false);
    const [isPostLike, setIsPostLike] = useState<boolean>(true);
    const [likeCount, setLikeCount] = useState<number>(postInfo.upvote_count);
    // const [watchCount, setWatchCount] = useState<number>(postInfo.view_count);
    const [refCount, setRefCount] = useState<number>(postInfo.ref_count);
    const [commentOnCount, setCommentOnCount] = useState<number>(postInfo.comment_count);
    const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');

    const getPostLikeStatus = async () => {
        const {data} = await PostApi.checkPostLike(url, postInfo.id);
        if (data.data) {
            setLike(data.data.status);
        }
    };

    const postLike = async () => {
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
    };

    useEffect(() => {
        if (postInfo) {
            getPostLikeStatus();
        }
    }, []);

    useEffect(() => {
        setIsPostLike(true);
    }, [like]);

    return (
      <View style={styles.groupParent}>
          <View style={styles.placeholderParent}>
              <View>
                  <Image
                    style={[styles.avatar]}
                    resizeMode="cover"
                    source={{uri: `${avatarsResUrl}/${postInfo.author_dao.avatar ? postInfo.author_dao.avatar : postInfo.dao.avatar}`}}
                  />
              </View>

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
                      setShowCommentDialog(true);
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
                  <Image
                    style={[styles.image]}
                    resizeMode="cover"
                    source={require("../assets/frame1.png")}
                  />
                  <Text style={[styles.text]}>{refCount}</Text>
              </View>
          </View>
          <View>
              <Image
                style={[styles.alertCircleIcon]}
                resizeMode="cover"
                source={require("../assets/alertcircle.png")}
              />
          </View>
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
    }
});

export default VideoDetailButton;
