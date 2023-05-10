import React, {createRef, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import PostDetailHeader from "../components/PostDetailHeader";
import {useNavigation, useRoute} from "@react-navigation/native";
import { useUrl, useScreenDimensions } from "../utils/hook";
import { PostInfo } from "../declare/global";
import PostApi from "../services/DAOApi/Post";
import NewsBlock from "../components/NewsBlock";
import QuoteBlock from "../components/QuoteBlock";
import {Color} from "../GlobalStyles";
import OperationBlock from "../components/OperationBlock";
import Comment from "../components/Comment";
import {getDebounce} from "../utils/util";

export type Props = {};
const PostDetailScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const route = useRoute();
  const { screenWidth, screenHeight } = useScreenDimensions();
  const headerRef = useRef<any>(null);
  const footerRef = useRef<any>(null);
  const commentRef = createRef<any>();
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  // @ts-ignore
  const { postId } = route.params;

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const navigation = useNavigation();

  const getPostInfo = async () => {
    try {
      const { data } = await PostApi.getPostById(url, postId);
      if (data.data) {
        setPostInfo(data.data);
        if (data.data.author_dao.id) setIsReTransfer(true);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  useEffect(() => {
    if (postId) {
      getPostInfo();
    }
  }, [postId]);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current?.measure((x: number, y: number, width: number, height: number) => {
        console.log('headerHeight', height);
        setHeaderHeight(height);
      });
    }
    if (footerRef.current) {
      footerRef.current?.measure((x: number, y: number, width: number, height: number) => {
        console.log('FooterHeight', height);
        setFooterHeight(height);
      });
    }
  }, [headerRef.current, footerRef.current]);

  return (
    <View style={styles.container}>
      <View ref={headerRef}>
        <PostDetailHeader
          onBackPress={() => navigation.goBack()}
          postInfo={postInfo}
        />
      </View>
      <View style={{height: screenHeight - headerHeight - footerHeight - 100}}>
        <ScrollView style={styles.scrollWrap}>
          {
            postInfo && (
              <View>
                {postInfo.type === 0 || postInfo.type === 2 ? (
                  <NewsBlock postInfo={postInfo} isReTransfer={isReTransfer}/>
                ): (
                  <QuoteBlock postInfo={postInfo}/>
                )
                }
                <OperationBlock postInfo={postInfo}/>
                <View style={styles.commentWrap}>
                  <Comment
                    onRef={commentRef}
                    postId={postInfo.id}
                    comment={comment}
                    setComment={setComment}
                    postType={postInfo.type}
                  />
                </View>
              </View>
            )
          }
        </ScrollView>
      </View>
      <View ref={footerRef} style={styles.footer}>
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
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1,
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