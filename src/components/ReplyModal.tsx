import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    FlatList,
    Image,
    ListRenderItem,
    ActivityIndicator
} from "react-native";
import {Color} from "../GlobalStyles";
import {CommentInfo, CommentReplyRes} from "../declare/api/DAOApi";
import {getDebounce, getTime} from "../utils/util";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import Toast from "react-native-toast-message";
import PostApi from '../services/DAOApi/Post';
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import CommentItem from "./CommentItem";
import BottomSheetModal from './BottomSheetModal';

export type Props = {
    commentInfo: CommentInfo,
    sendSuccess?: (commentReply: CommentReplyRes) => void
} & React.ComponentProps<typeof BottomSheetModal>
const ReplyModal = ({visible,setVisible, commentInfo, sendSuccess}: Props) => {
    if (!commentInfo) return null;
    const avatarsResUrl = useResourceUrl('avatars');
    const {user} = useSelector((state: Models) => state.global)
    const url = useUrl();
    const [isLogin, gotoLogin] = useIsLogin();
    const [reply, setReply] = useState<string>('');
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const sendReply = async () => {
        if (!isLogin) return gotoLogin();
        if (!reply.trim()) return Toast.show({type: 'info', text1: 'Please enter your reply!'});
        if (isLoading) return ;
        try {
            setIsLoading(true);
            const {data} = await PostApi.addCommentReply(url, {
                comment_id: commentInfo.id,
                content: reply.trim(),
            });
            if (data.data) {
                const res = data.data;
                const commentReply: CommentReplyRes = {
                    id: res.id,
                    content: res.content,
                    created_on: res.created_on,
                    comment_id: res.comment_id,
                    user: user!,
                };
                sendSuccess?.(commentReply)
                setReply('');
                Toast.show({type: 'info', text1: 'reply success!'})
            }
        } catch (e) {
            if (e instanceof Error) Toast.show({type: 'error', text1: e.message});
        } finally {
            setIsLoading(false);
        }
    };
    const getCommentReplyItem: ListRenderItem<CommentReplyRes> = ({item}) => {
        return (
          <View style={styles.commentItem}>
              <Image
                style={styles.userAvatar}
                resizeMode="cover"
                source={{uri: `${avatarsResUrl}/${item.user.avatar}`}}
              />
              <View style={styles.details}>
                  <View style={styles.nameAndLike}>
                      <Text style={styles.name}>{item.user.nickname}</Text>
                  </View>
                  <Text style={styles.replyContent}>{item.content}</Text>
                  <View style={styles.replyCountTime}>
                      <TouchableOpacity
                        onPress={() => {
                            console.log('replay');
                        }}>
                          <Text style={[styles.replyCount, {
                              marginRight: 24,
                              color: Color.iOSSystemLabelsLightSecondary
                          }]}>Reply</Text>
                      </TouchableOpacity>
                      <Text style={styles.replyTime}>{getTime(item.created_on)}</Text>
                  </View>
              </View>
          </View>
        )
    };

    return <>
        <BottomSheetModal
          height={'60%'}
          isPadding={false}
          visible={visible}
          setVisible={setVisible}
        >
            <View style={{flex: 1}}>
                <View style={[styles.commentReplyWrap]}>
                    <FlatList
                      style={styles.replyModalListWrap}
                      ListHeaderComponent={
                          <View>
                              <View style={styles.currentComment}>
                                  <CommentItem commentInfo={commentInfo}/>
                              </View>
                              <Text style={styles.replyModalTitle}>Replies</Text>
                          </View>
                      }
                      data={commentInfo.replies}
                      renderItem={getCommentReplyItem}
                      keyExtractor={item => item.id}
                      ItemSeparatorComponent={() => (
                        <View style={styles.separator}/>
                      )}
                      ListEmptyComponent={<View style={styles.noReply}>
                          <Text style={styles.noReplyText}>No reply yet</Text>
                      </View>}
                    />
                </View>
                <View style={[styles.replyModalFooter]}>
                    <TextInput
                      style={styles.footerInput}
                      placeholder={'Reply...'}
                      placeholderTextColor={Color.darkslategray_400}
                      value={reply}
                      onChangeText={(value) => {
                          setReply(value);
                      }}
                    />
                    <TouchableOpacity onPress={getDebounce(() => {
                        sendReply();
                    })}>
                        {
                            isLoading ? <ActivityIndicator size="small"/> :<Text>Send</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    </>
};

const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
        backgroundColor: Color.color1,
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
    currentComment: {},
    replyModalTitle: {
        marginVertical: 10,
        fontWeight: '700'
    },
    replyModalListWrap: {
        flex: 1,
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
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: Color.color2,
    },
    footerInput: {
        flex: 1,
        marginRight: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: Color.color1
    }
})

export default ReplyModal;
