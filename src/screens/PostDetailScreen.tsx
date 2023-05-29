import React, {createRef, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import PostDetailHeader from "../components/PostDetailHeader";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useUrl, useScreenDimensions} from "../utils/hook";
import {PostInfo} from "../declare/api/DAOApi";
import PostApi from "../services/DAOApi/Post";
import NewsBlock from "../components/NewsBlock";
import QuoteBlock from "../components/QuoteBlock";
import {Color} from "../GlobalStyles";
import OperationBlock from "../components/OperationBlock";
import Comment from "../components/Comment";
import {getDebounce} from "../utils/util";
import NewsContent from "../components/NewsContent";
import VideoBlockItem from "../components/VideoBlockItem";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-toast-message";
import show = Toast.show;

const PostDetailScreen = () => {
    const url = useUrl();
    const route = useRoute();
    const {postId} = route.params as { postId: string };

    const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
    const [isReTransfer, setIsReTransfer] = useState<boolean>(false);

    const navigation = useNavigation();

    const getPostInfo = async () => {
        try {
            const {data} = await PostApi.getPostById(url, postId);
            if (data.data) {
                setPostInfo(data.data);
                if (data.data.author_dao.id) setIsReTransfer(true);
            }
        } catch (e) {
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: e.message
            });
        }
    };

    useEffect(() => {
        if (postId) {
            getPostInfo();
        }
    }, [postId]);

    if (!postInfo) return null;

    return (
      <KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={{flex:1}}>
          <View style={styles.container}>
              <View>
                  <PostDetailHeader
                    onBackPress={() => navigation.goBack()}
                    postInfo={postInfo}
                  />
              </View>
              <View style={{flex: 1, marginTop: 20}}>
                  <Comment
                    postId={postInfo.id}
                    postType={postInfo.type}
                    headerComponents={() => {
                        return <View style={styles.content}>
                            <NewsBlock postInfo={postInfo}/>
                            {
                                postInfo.orig_contents?.length ?
                                  postInfo.orig_type === 0 ? <NewsContent postInfo={postInfo} isQuote={true}/>
                                    : postInfo.orig_type === 1 ? <VideoBlockItem postInfo={postInfo} isQuote={true}/> : <></>
                                  : <></>
                            }
                            <OperationBlock postInfo={postInfo} type={0}/>
                        </View>
                    }}
                  />
              </View>
          </View>
      </KeyboardAwareScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.color1,
    },
    content: {
        marginBottom: 30
    },
    commentWrap: {
        marginTop: 30
    },
    scrollWrap: {
        flex: 1,
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

export default PostDetailScreen;
