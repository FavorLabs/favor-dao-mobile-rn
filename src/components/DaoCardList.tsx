import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../GlobalStyles";
import DaoCommunityCard from "./DaoCommunityCard";
import {Page, PostInfo} from "../declare/global";
import {useUrl} from "../utils/hook";
import PostApi from "../services/DAOApi/Post";

type Props = {};

const DaoCardList: React.FC<Props> = (props) => {
  const url = useUrl();
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 5,
    type: -1,
    query: undefined,
  });

  const [daoCardInfo,setDaoCardInfo] = useState([
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/ellipse-1.png"),
      daoName: 'Mr. Bean',
      joined: 'Joined: 50.1k',
      level: 'Level 8',
      description: 'Stream thousands of episodes, live sports, iconic movies, and exclusive originals from CBS, BET, Comedy...'
    },
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/avatar-image3.png"),
      daoName: '小廖社区',
      joined: 'Joined: 40k',
      level: 'Level 2',
      description: '这是小廖的私人社区'
    },
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/ellipse-1.png"),
      daoName: 'Mr. Bean',
      joined: 'Joined: 50.1k',
      level: 'Level 8',
      description: 'Stream thousands of episodes, live sports, iconic movies, and exclusive originals from CBS, BET, Comedy...'
    },
  ]);
  const [postListArr,setPostListArr] = useState<PostInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    try {
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      const listArr: PostInfo[] = data.data.list;
      setPostListArr(() => [...postListArr,...listArr]);
      setIsLoadingMore(
        data.data.pager.total_rows > pageData.page * pageData.page_size,
      );
      setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
    } catch (e) {
      if (e instanceof Error) console.error(e)
    }
  };

  const handleLoadMore = () => {
    if (isLoadingMore) {
      loadMore();
    }
  };

  useEffect(() => {
    loadMore();
  },[])

  return (
      <View style={styles.frameContainer}>
        <FlatList
          style={styles.postList}
          data={postListArr}
          renderItem={({ item }) => <DaoCommunityCard daoCardInfo={item} />}
          horizontal={true}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <View style={[styles.frameInner, styles.lineViewBorder]} />
      </View>
  )
}

const styles = StyleSheet.create({
  postList: {
    // backgroundColor: Color.color1
  },
  frameContainer: {
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  frameInner: {
    // marginTop: 20,
    alignSelf: "stretch",
  },
  lineViewBorder: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e5eb",
    borderStyle: "solid",
  },
})

export default DaoCardList