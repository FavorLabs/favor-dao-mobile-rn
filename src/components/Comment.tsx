import React, {useEffect, useState, useImperativeHandle, RefObject, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput
} from 'react-native';
import PostApi from '../services/DAOApi/Post';
import {GetCommentsParams, CommentInfo, CommentReplyRes} from '../declare/api/DAOApi';
import { useUrl, useResourceUrl, useScreenDimensions } from "../utils/hook";
import {Color} from "../GlobalStyles";
import Toast from "react-native-toast-message";
import BottomSheet from '../components/BottomSheet';
import {getTime} from "../utils/util";

export type Props = {
  onRef: RefObject<{
    sendComment: () => void;
  }>;
  postId: string;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  postType: number;
};
type CommentListMap = {
  [key: number]: CommentInfo;
};
type ReplyToComment = {
  item: CommentInfo;
  idx: number;
};
const Comment: React.FC<Props> = (props) => {
  const { onRef, postId, comment, setComment, postType } = props;
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const { screenWidth, screenHeight } = useScreenDimensions();

  const [commentListMap, setCommentListMap] = useState<CommentListMap>({});
  const [hasMore, setHasMore] = useState(true);
  const [pageData, setPageData] = useState<GetCommentsParams>({
    page: 1,
    page_size: 10,
    id: postId,
  });
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replyToComment, setReplyToComment] = useState<ReplyToComment | null>(null);
  const [reply, setReply] = useState<string>('');

  const user = {
    address: "0x23dd8961b9dcff32a2b8330f67298e16834ee0ee",
    avatar: "default_avatar_emily",
    id: "6459b9e4754c2762814b79d8",
    nickname :"0x23dd8961",
  };
  // const { user } = useSelector((state: Models) => state.global);

  const loadMore = async () => {
    try {
      const { data } = await PostApi.getPostComments(url, pageData);
      if (data.data.list) {
        setCommentListMap({ ...commentListMap, ...data.data.list });
        setHasMore(
          data.data.pager.total_rows > pageData.page * pageData.page_size,
        );
        setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({ type: 'error', text1: e.message });
      setHasMore(false);
    }
  };

  const sendDisable = useMemo(() => {
    return !comment.trim();
  }, [comment]);

  const sendReplyDisable = useMemo(() => {
    return !reply.trim();
  }, [reply]);

  const sendComment = async () => {
    if (sendDisable) return Toast.show({ type: 'info', text1: 'Please enter your comment!' });
    try {
      const { data } = await PostApi.addPostComment(url, {
        post_id: postId,
        contents: [
          {
            content: comment,
            type: postType,
            sort: 0,
          },
        ],
      });
      if (data.data) {
        const res = data.data;
        const commentFill: CommentInfo = {
          id: res.id,
          post_id: res.post_id,
          address: res.address,
          user: {
            id: user?.address as string,
            address: user?.address as string,
            avatar: user?.avatar as string,
            nickname: user?.nickname as string,
            role: ''
          },
          contents: [
            {
              id: res.id,
              created_on: res.created_on,
              modified_on: res.modified_on,
              deleted_on: res.deleted_on,
              is_del: res.is_del,
              comment_id: res.id,
              post_id: res.post_id,
              address: res.address,
              content: comment,
              type: postType,
              sort: 0,
            },
          ],
          replies: [],
          created_on: res.created_on,
          modified_on: res.modified_on,
        };
        setCommentListMap({
          ...commentListMap,
          [Object.keys(commentListMap).length]: commentFill,
        });
        setComment('');
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({ type: 'error', text1: e.message });
    }
  };

  const sendReply = async () => {
    if (sendReplyDisable) return Toast.show({ type: 'info', text1: 'Please enter your reply!' });
    try {
      const currentReply = replyToComment as ReplyToComment;
      const { data } = await PostApi.addCommentReply(url, {
        comment_id: currentReply.item.id,
        content: reply,
      });
      if (data.data) {
        const res = data.data;
        const commentReplyFill: CommentReplyRes = {
          id: res.id,
          content: res.content,
          created_on: res.created_on,
          comment_id: res.comment_id,
          user: {
            id: user?.address as string,
            address: user?.address as string,
            avatar: user?.avatar as string,
            nickname: user?.nickname as string,
            role: ''
          },
        };
        setReplyToComment({
          idx: currentReply.idx,
          item: {
            ...commentListMap[currentReply.idx],
            replies: [
              ...commentListMap[currentReply.idx].replies,
              commentReplyFill,
            ],
          }
        });
        setCommentListMap({
          ...commentListMap,
          [currentReply.idx]: {
            ...commentListMap[currentReply.idx],
            replies: [
              ...commentListMap[currentReply.idx].replies,
              commentReplyFill,
            ],
          },
        });
        setReply('');
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({ type: 'error', text1: e.message });
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      loadMore();
    }
  };

  const getCommentItem = (item: CommentInfo, idx: number) => {
    return (
      <View style={styles.commentItem}>
        <Image
          style={styles.userAvatar}
          resizeMode="cover"
          source={{uri: `${avatarsResUrl}/${item?.user?.avatar}`}}
        />
        <View style={styles.details}>
          <View style={styles.nameAndLike}>
            <Text style={styles.name}>{ item?.user?.nickname }</Text>
            {/*<View style={styles.likeOrDislike}></View>*/}
          </View>
          <Text style={styles.replyContent}>{ item?.contents[0]?.content }</Text>
          <View style={styles.replyCountTime}>
            <View style={styles.replyCountWrap}>
              <TouchableWithoutFeedback onPress={() => {
                setReplyToComment({ item: item, idx });
                setShowReply(true);
              }}>
                <Text style={styles.replyCount}>{ item?.replies?.length } Replies</Text>
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.replyTime}>{ getTime(item?.created_on) }</Text>
          </View>
        </View>
      </View>
    )
  };

  const getCommentReplyItem = (item: CommentReplyRes) => {
    return (
      <View style={styles.commentItem}>
        <Image
          style={styles.userAvatar}
          resizeMode="cover"
          source={{uri: `${avatarsResUrl}/${item?.user?.avatar}`}}
        />
        <View style={styles.details}>
          <View style={styles.nameAndLike}>
            <Text style={styles.name}>{ item?.user?.nickname }</Text>
            {/*<View style={styles.likeOrDislike}></View>*/}
          </View>
          <Text style={styles.replyContent}>{ item?.content }</Text>
          <View style={styles.replyCountTime}>
            <TouchableWithoutFeedback onPress={() => {
              console.log('replay');
            }}>
              <Text style={[styles.replyCount, { marginRight: 24, color: Color.iOSSystemLabelsLightSecondary }]}>Reply</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.replyTime}>{ getTime(item?.created_on) }</Text>
          </View>
        </View>
      </View>
    )
  };

  const commentReplyEle = <View style={[styles.commentReplyWrap, { width: screenWidth }]}>
    <TouchableOpacity onPress={() => { setShowReply(false) }}>
      <View style={styles.closeReplyBtn}>
        <Text style={styles.closeReplyBtnText}>x</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.replyModalDetail}>
      <View style={styles.currentComment}>{ replyToComment && getCommentItem(replyToComment.item, replyToComment.idx) }</View>
      <Text style={styles.replyModalTitle}>Replies</Text>
      { replyToComment?.item?.replies.length ? <>
        <FlatList
          style={styles.replyModalListWrap}
          data={replyToComment.item.replies}
          renderItem={({item}) => getCommentReplyItem(item)}
          keyExtractor={item => item.id}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />
      </> : <>
        <View style={styles.noReply}>
          <Text style={styles.noReplyText}>No reply yet</Text>
        </View>
      </> }
    </View>
  </View>

  useImperativeHandle(onRef, () => ({
    sendComment
  }))

  useEffect(() => {
    loadMore();
  },[])

  useEffect(() => {
    console.log('commentListMap change', Object.values(commentListMap).length)
  }, [commentListMap]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listWrap}
        data={Object.values(commentListMap)}
        /* @ts-ignore */
        renderItem={({item, index}) => getCommentItem(item, index)}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
      <BottomSheet
        show={showReply}
        children={commentReplyEle}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          display: 'none'
        }}
        footer={
          <View style={[styles.replyModalFooter, { width: screenWidth - 32 }]}>
            <TextInput
              style={styles.footerInput}
              placeholder={'Reply...'}
              placeholderTextColor={Color.darkslategray_400}
              value={reply}
              onChangeText={(value) => {
                setReply(value);
              }}
            />
            <TouchableOpacity onPress={() => {
              console.log('send reply--', reply);
              sendReply();
            }}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingRight: 32
  },
  listWrap: {},
  separator: {
    marginVertical: 12
  },

  commentItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  details: {
    flex: 1,
    marginLeft: 16
  },
  nameAndLike: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.24
  },
  // likeOrDislike: {},
  replyContent: {
    marginVertical: 6,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.24
  },
  replyCountTime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  replyCountWrap: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginRight: 16,
    backgroundColor: Color.whitesmoke_200,
    borderRadius: 20
  },
  replyCount: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 23,
    letterSpacing: -0.4
  },
  replyTime: {
    color: Color.iOSSystemLabelsLightSecondary
  },

  commentReplyWrap: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 50,
    backgroundColor: Color.color1
  },
  closeReplyBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color.darkslategray_300
  },
  closeReplyBtnText: {
    color: Color.iOSSystemLabelsLightSecondary
  },
  replyModalDetail: {
    marginTop: 16
  },
  currentComment: {},
  replyModalTitle: {
    marginTop: 10,
    fontWeight: '700'
  },
  replyModalListWrap: {
    marginTop: 12
  },
  noReply: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  noReplyText: {
    fontSize: 16,
    color: Color.color4
  },

  replyModalFooter: {
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
})

export default Comment;