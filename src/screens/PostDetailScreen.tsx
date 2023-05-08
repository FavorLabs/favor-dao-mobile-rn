import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PostDetailHeader from "../components/PostDetailHeader";
import {useNavigation, useRoute} from "@react-navigation/native";
import { useUrl } from "../utils/hook";
import { PostInfo } from "../declare/global";
import PostApi from "../services/DAOApi/Post";
import NewsBlock from "../components/NewsBlock";
import QuoteBlock from "../components/QuoteBlock";
import {Color} from "../GlobalStyles";
import OperationBlock from "../components/OperationBlock";

export type Props = {};
const PostDetailScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const route = useRoute();
  // @ts-ignore
  const { postId } = route.params;

  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);

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

  return (
    <View style={styles.container}>
      <PostDetailHeader
        onBackPress={() => navigation.goBack()}
        postInfo={postInfo}
      />
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
          </View>
        )
      }

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1,
  },
  scrollWrap: {
    flex: 1,
  }
});

export default PostDetailScreen;