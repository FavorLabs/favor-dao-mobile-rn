import React, {useEffect, useState, useImperativeHandle, RefObject, useMemo, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput, FlatListProps, ListRenderItem, ActivityIndicator
} from 'react-native';
import {useSelector} from 'react-redux';
import PostApi from '../services/DAOApi/Post';
import {GetCommentsParams, CommentInfo, CommentReplyRes} from '../declare/api/DAOApi';
import {useUrl,useIsLogin} from "../utils/hook";
import {Color} from "../GlobalStyles";
import Toast from "react-native-toast-message";
import {getDebounce, getTime} from "../utils/util";
import Models from "../declare/storeTypes";
import CommentItem from "./CommentItem";
import ReplyModal from "./ReplyModal";

export type Props = {
    postId: string;
    postType: number;
    headerComponents?: React.ComponentType<any> | React.ReactElement | null;
};
const Comment = ({postId, postType, headerComponents = null}: Props) => {
    const {user} = useSelector((state: Models) => state.global)
    const url = useUrl();
    const [isLogin, gotoLogin] = useIsLogin();
    const [hasMore, setHasMore] = useState(true);
    const [pageData, setPageData] = useState<GetCommentsParams>({
        page: 1,
        page_size: 10,
        id: postId,
    });
    const [list, setList] = useState<CommentInfo[]>([]);
    const [comment, setComment] = useState<string>('');
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const [selectCommentIndex, setSelectCommentIndex] = useState<number>(0)

    // const replyRef = useRef<BottomSheetModal>();
    const [replyModal, setReplyModal] = useState(false);
    const loadData = async () => {
        const {data} = await PostApi.getPostComments(url, pageData);
        if (data.data.list) {
            setList((list) => [...list, ...data.data.list]);
            setHasMore(
              data.data.pager.total_rows > pageData.page * pageData.page_size,
            );
            setPageData((pageData) => ({...pageData, page: ++pageData.page}));
        }
    };

    const commentItem: ListRenderItem<CommentInfo> = ({item, index}) => {
        return <CommentItem
          style={styles.container}
          commentInfo={item}
          clickReplyHandel={() => {
              setSelectCommentIndex(index);
              setReplyModal(true);
          }}/>
    };

    const sendComment = async () => {
        if (!isLogin) return gotoLogin();
        if (!comment.trim()) return Toast.show({type: 'info', text1: 'Please enter your comment!'});
        if(isLoading) return ;
        try {
            setIsLoading(true);
            const content = {
                content: comment.trim(),
                type: postType,
                sort: 0,
            };
            const {data} = await PostApi.addPostComment(url, {
                post_id: postId,
                contents: [content],
            });
            const res = data.data
            if (res) {
                const commentInfo: CommentInfo = {
                    ...data.data,
                    user: user!,
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
                            ...content,
                        },
                    ],
                    replies: [],
                }
                setList(list => [...list, commentInfo])
                setComment('');
                Toast.show({type: 'info', text1: 'comment success!'})
            }
        } catch (e) {
            if (e instanceof Error) Toast.show({type: 'error', text1: e.message});
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = () => {
        if (hasMore) loadData();
    }
    const sendReplySuccess = (reply: CommentReplyRes) => {
        const newList = list.slice(0);
        newList[selectCommentIndex].replies.push(reply);
        setList(newList);
    }

    return <View style={{flex: 1}}>
        <FlatList
          style={styles.listWrap}
          data={list}
          renderItem={commentItem}
          onEndReached={loadMore}
          ListHeaderComponent={headerComponents}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.separator}/>
          )}
          ListEmptyComponent={
              <View style={styles.noReply}>
                  <Text style={styles.noReplyText}>No comment yet</Text>
              </View>
          }
        />
        <View style={styles.footer}>
            <TextInput
              style={styles.footerInput}
              placeholder={'Comment...'}
              placeholderTextColor={Color.darkslategray_400}
              value={comment}
              onChangeText={(value) => {
                  setComment(value);
              }}
            />
            <TouchableOpacity onPress={getDebounce(sendComment)}>
                {
                    isLoading ? <ActivityIndicator size="small"/> :<Text>Send</Text>
                }
            </TouchableOpacity>
        </View>
        <ReplyModal
          visible={replyModal}
          setVisible={setReplyModal}
          commentInfo={list[selectCommentIndex]}
          sendSuccess={sendReplySuccess}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingRight: 32,
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
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: Color.color2,
        marginTop: 10
    },
    footerInput: {
        flex: 1,
        marginRight: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: Color.color1,
    }
})

export default Comment;
