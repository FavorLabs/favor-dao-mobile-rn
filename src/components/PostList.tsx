import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../GlobalStyles";
import { Page, PostInfo } from '../declare/global';
import PostApi from '../services/DAOApi/Post';
import { useUrl } from '../utils/hook';
import { isMobile, sleep } from '../utils/util';
import NewsCard from "./NewsCard";
import DaoCardList from "./DaoCardList";
import QuoteNews from "./QuoteNews";
import VideoBlock from "./VideoBlock";

export type Props = {
  type?: number | string;
  daoId?: string;
  focus?: boolean;
  query?: string;
};

export type Info = {
  view_count: number;
  upvote_count: number;
  comment_count: number;
  ref_count: number;
}

const PostList: React.FC<Props> = (props) => {
  const { type, daoId, focus = false, query } = props;
  // const url = useUrl();

  const [list, setList] = useState<PostInfo[]>([]);
  const [postInfo, setPostInfo] = useState<Info>({
    view_count: 214,
    upvote_count: 1200,
    comment_count: 116,
    ref_count: 241
  });
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 5,
    type,
    query,
  });
  const [postListArr,setPostListArr] = useState<PostInfo[]>([])

  const loadMore = async () => {
    const url = 'http://192.168.100.250:1609/group/http/dao-backend-local/favordao/v1';
    try {
      const request = focus ? (params: Page) => PostApi.getFollow(url, params)
        : daoId
        ? (params: Page) => PostApi.getPostListByDaoId(url, daoId, params)
        : (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      const listArr: PostInfo[] = data.data.list;
      setPostListArr(() => [...postListArr,...listArr]);
      setList((list) => [...list, ...listArr]);
      setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  };

  // useEffect(() => {
  //   loadMore();
  // },[])

  const renderItem = (item:PostInfo)=>{
    if(item.type === -1){
      return <DaoCardList />;
    } else if(item.type === 0) {
      return <NewsCard postInfo={item}/>
    } else if(item.type === 1) {
      return <VideoBlock postInfo={item}/>
    } else if(item.type === 2) {
      return <NewsCard postInfo={item}/>
    } else if(item.type === 3) {
      return <QuoteNews postInfo={item}/>
    }

  }

  return (
      <View onLayout={loadMore}>
        <FlatList
          style={styles.postList}
          data={postListArr}
          // @ts-ignore
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  postList: {

  }
})

export default PostList