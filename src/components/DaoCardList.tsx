import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../GlobalStyles";
import DaoCommunityCard from "./DaoCommunityCard";
import {Page, PostInfo} from "../declare/api/DAOApi";
import {useUrl} from "../utils/hook";
import PostApi from "../services/DAOApi/Post";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/global";
import Toast from "react-native-toast-message";

type Props = {
  refreshing: boolean;
};

const DaoCardList: React.FC<Props> = (props) => {
  const url = useUrl();
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState<Page>({
    page: 1,
    page_size: 5,
    type: -1,
    query: undefined,
  });


  const [postListArr,setPostListArr] = useState<PostInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { daoListStatus } = useSelector((state: Models) => state.global);

  const loadMore = async () => {
    try {
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageData);
      // @ts-ignore
      const listArr: PostInfo[] = data.data.list;
      setPostListArr(() => [...postListArr,...listArr]);
      setIsLoadingMore(
        data.data.pager.total_rows > pageData.page * pageData.page_size,
      );
      setPageData((pageData) => ({ ...pageData, page: ++pageData.page }));
    } catch (e) {
      if (e instanceof Error)
        Toast.show({
          type: 'error',
          // @ts-ignore
          text1: e.message,
        });
    }
  };

  const refresh = async () => {
    const pageInfo = {
      page: 1,
      page_size: 5,
      type: -1,
      query: undefined,
    };
    try {
      const request = (params: Page) => PostApi.getPostListByType(url, params);
      const { data } = await request(pageInfo);
      // @ts-ignore
      const listArr: PostInfo[] = data.data.list;
      setPostListArr(() => [...listArr]);
      setIsLoadingMore(
        data.data.pager.total_rows > pageInfo.page * pageInfo.page_size,
      );
      setPageData((pageData) => ({ ...pageData, page: 2 }));
    } catch (e) {
      if (e instanceof Error)
        Toast.show({
          type: 'error',
          // @ts-ignore
          text1: e.message,
        });
    }
  };

  const handleLoadMore = () => {
    if (isLoadingMore) {
      loadMore();
    }
  };

  useEffect(() => {
    if(!props.refreshing) {
      refresh();
    }
  },[props.refreshing])

  useEffect(()=> {
    if(daoListStatus) {
      refresh();
      dispatch(globalUpdateState({
        daoListStatus: false
      }))
    }
  },[daoListStatus])

  return (
      <View style={styles.frameContainer}>
        <FlatList
          data={postListArr}
          renderItem={({ item }) => <View style={styles.daoBlock}><DaoCommunityCard daoCardInfo={item} /></View>}
          horizontal={true}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          // keyExtractor={item => item.id}
        />
        <View style={[styles.frameInner, styles.lineViewBorder]} />
      </View>
  )
}

const styles = StyleSheet.create({
  daoBlock: {
    width: 240,
    height: 240,
    marginRight: 10,
    marginBottom: 20,
  },
  frameContainer: {
    paddingLeft: 10,
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
    backgroundColor: '#fff'
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