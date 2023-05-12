import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Color} from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import DaoBriefCard from "../../../components/DaoBriefCard";
import DaoCommunityCard from "../../../components/DaoCommunityCard";
import {Page, PostInfo} from "../../../declare/api/DAOApi";
import PostApi from "../../../services/DAOApi/Post";
import {useUrl} from "../../../utils/hook";
import {sleep} from "../../../utils/util";

type Props = {};
const RecommendDAOListScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 20,
    type: -1,
    query: undefined,
  });

  const [postListArr,setPostListArr] = useState<PostInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

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

  const refreshPage = async () => {
    try {
      const pageInfo = { page: 1, page_size: 20, type:-1};
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageInfo);
      const listArr: PostInfo[] = data.data.list;
      setPostListArr([...listArr]);
      setIsLoadingMore(
        data.data.pager.total_rows > pageInfo.page * pageInfo.page_size,
      );
      setPageData((pageData) => ({ ...pageData, page: 2 }));
    } catch (e) {
      if (e instanceof Error) console.error(e)
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await sleep(2000);
    setRefreshing(false);
    await refreshPage();
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
    <View style={styles.container}>
      <FlatList
        data={postListArr}
        renderItem={({ item }) => <DaoBriefCard daoCardInfo={item}/>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.flautist}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 5,
    alignItems: 'center'
  },
  flautist: {

  },
});

export default RecommendDAOListScreen;