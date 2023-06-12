import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {CometChatGroupListWithMessages} from '../../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index'
import {Color} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";
import { useFocusEffect } from "@react-navigation/native";
import {CometChat} from "@cometchat-pro/react-native-chat";
import MessageItem from "../../../components/Message/MessageItem";
import {getChatsAvatarUrl, getChatsDaoName} from "../../../utils/util";

type DataList = {
  avatar: string;
  name: string;
  createdAt: number;
  lastUserName: string;
  content: string;
  unreadCount: number;
  daoName: string
}

const ChatScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const limit = 10;
  const [list, setList] = useState<DataList[]>([]);
  // const [searchList, setSearchList] = useState<CometChat.Group[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchRefresh, setSearchRefresh] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const conversationRequest = useMemo(() =>
    new CometChat.ConversationsRequestBuilder()
      .setConversationType('group')
      .withUserAndGroupTags(true)
      .setLimit(limit)
      .build(),[isRefresh])

  const groupsRequest = useMemo(() =>
    new CometChat.GroupsRequestBuilder()
      .joinedOnly(true)
      .setLimit(limit)
      .setSearchKeyword(searchValue)
      .withTags(true)
      .build(), [searchRefresh])

  const getSearchInfo = async (refresh?: boolean) => {
    try {
      const data = await groupsRequest.fetchNext();
      let dataList:DataList[] = [];
      data.map(item => {
        let obj = {
          // @ts-ignore
          avatar: getChatsAvatarUrl(item.icon),
          name: item.getName(),
          // @ts-ignore
          createdAt: item.updatedAt,
          lastUserName: '',
          content: '',
          // @ts-ignore
          unreadCount: 0,
          daoName: getChatsDaoName(item.getTags()[0] as string),
        };
        dataList.push(obj)
      })
      refresh ? await setList(dataList) : await setList(v => v.concat(dataList));
      await setIsLoadingMore(data.length >= limit)
    } catch(e) {
      if(e instanceof Error) console.error(e.message)
    }
  }

  const getInfo = async (refresh?: boolean) => {
    try {
      const data = await conversationRequest.fetchNext()
      let dataList:DataList[] = [];
      data.map(item => {
        // @ts-ignore
        let obj = {
          // @ts-ignore
          avatar: getChatsAvatarUrl(item.getConversationWith().icon),
          name: item.getConversationWith().getName(),
          createdAt: item.getLastMessage() ? item.getLastMessage().updatedAt : 0,
          lastUserName: item.getLastMessage() ? item.getLastMessage().name : '',
          content: item.getLastMessage() ? item.getLastMessage().text : '',
          // @ts-ignore
          unreadCount: item.unreadMessageCount,
          daoName: getChatsDaoName(item.getConversationWith().getTags()[0] as string),
        };
        dataList.push(obj)
      })
      refresh ? await setList(dataList) : await setList(v => v.concat(dataList));
      await setIsLoadingMore(data.length >= limit)
    } catch(e) {
      if(e instanceof Error) console.error(e.message)
    }
  }

  const getSearch = async () => {
    await onRefresh();
  }

  const init = () => {
    setIsLoadingMore(true);
    setLoading(false);
  }

  const handleLoadMore = async () => {
    if (isLoadingMore && !loading) {
      setLoading(true);
      searchValue ? await getSearchInfo() : await getInfo();
      setLoading(false);
    }
  };

  const toChatsDetail = (daoName: string) => {
    console.log(daoName,'daoName')
  }

  useEffect(()=> {
    searchValue ? getSearchInfo(true) : getInfo(true);
  },[conversationRequest,groupsRequest])

  const onRefresh = async () => {
    await init();
    setRefreshing(true);
    searchValue ? await setSearchRefresh(!searchRefresh) : await setIsRefresh(!isRefresh)
    setRefreshing(false);
  };

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <SearchHead
          tittle={'Chats'}
          getSearchBlur={getSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <FlatList
          data={list}
          renderItem={({item}) => <MessageItem
            avatar={item.avatar}
            name={item.name}
            createdAt={item.createdAt}
            lastUserName={item.lastUserName}
            content={item.content}
            unreadCount={item.unreadCount}
            navigationFn={() =>toChatsDetail(item.daoName)}
          />}
          keyExtractor={(item, index) => `conversation-${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => (
            <>
              {
                loading &&
                  <View style={styles.footer}>
                      <ActivityIndicator size="large"/>
                  </View>
              }
            </>
          )}
        />
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ChatScreen;
