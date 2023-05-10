import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Color} from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import DaoBriefCard from "../../../components/DaoBriefCard";
import DaoCommunityCard from "../../../components/DaoCommunityCard";
import {Page, PostInfo} from "../../../declare/global";
import PostApi from "../../../services/DAOApi/Post";
import {useUrl} from "../../../utils/hook";

export type Props = {};
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
    <View style={styles.container}>
      <FlatList
        data={postListArr}
        renderItem={({ item }) => <DaoBriefCard daoCardInfo={item}/>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.flautist}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 5,
  },
  flautist: {
    alignItems: 'center',
  },
});

export default RecommendDAOListScreen;