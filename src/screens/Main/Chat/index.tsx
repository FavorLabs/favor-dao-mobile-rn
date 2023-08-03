import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {Color} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {CometChat} from "@cometchat-pro/react-native-chat";
import MessageItem from "../../../components/Message/MessageItem";
import {getChatsAvatarUrl, getChatsDaoName} from "../../../utils/util";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import Screens from "../../../navigation/RouteNames";
import {DataList} from "../../../declare/api/DAOApi";
import NoDataShow from "../../../components/NoDataShow";
import {strings} from "../../../locales/i18n";

const ChatScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState<string>('');
  const {user} = useSelector((state: Models) => state.global);
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
      .build(), [isRefresh, user?.id])

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
      let dataList: DataList[] = data.map(item => ({
        avatar: getChatsAvatarUrl(item.getIcon()),
        name: item.getName(),
        createdAt: 0,
        lastUserName: '',
        content: '',
        unreadCount: 0,
        daoName: getChatsDaoName(item.getTags()[0] as string),
        guid: item.getGuid(),
      }));
      refresh ? await setList(dataList) : await setList(v => v.concat(dataList));
      await setIsLoadingMore(data.length >= limit)
    } catch (e) {
      if (e instanceof Error) console.error(e.message)
    }
  }

  const getInfo = async (refresh?: boolean) => {
    try {
      const data = await conversationRequest.fetchNext()
      let dataList: DataList[] = data.map(item => ({
        avatar: getChatsAvatarUrl((item.getConversationWith() as CometChat.Group).getIcon()),
        name: item.getConversationWith().getName(),
        createdAt: item.getLastMessage() ? item.getLastMessage().updatedAt : 0,
        lastUserName: item.getLastMessage() && item.getLastMessage().text ? item.getLastMessage().sender.name : '',
        content: item.getLastMessage() ? item.getLastMessage().text : '',
        unreadCount: item.getUnreadMessageCount(),
        daoName: getChatsDaoName(item.getConversationWith().getTags()[0] as string),
        guid: (item.getConversationWith() as CometChat.Group).getGuid(),
      }))
      refresh ? await setList(dataList) : await setList(v => v.concat(dataList));
      await setIsLoadingMore(data.length >= limit)
    } catch (e) {
      if (e instanceof Error) console.error(e.message)
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

  const toChatsDetail = async (item: DataList) => {
    CometChat.markAsRead(item.guid, CometChat.RECEIVER_TYPE.GROUP);
    // @ts-ignore
    navigation.navigate(Screens.ChatInDAO, {info: item});
  }

  useEffect(() => {
    if (!user) setSearchValue('');
  }, [user])

  // useEffect(() => {
  //   searchValue ? getSearchInfo(true) : getInfo(true);
  // }, [conversationRequest, groupsRequest])

  useFocusEffect(
    useCallback(() => {
      searchValue ? getSearchInfo(true) : getInfo(true);
      return () => {
        searchValue ? setSearchRefresh(!searchRefresh) : setIsRefresh(!isRefresh)
      };
    }, [searchRefresh,isRefresh])
  )

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
          tittle={strings('Chat.title')}
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
            navigationFn={() => toChatsDetail(item)}
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
          ListEmptyComponent={(!list.length && !refreshing) ?
            <View style={styles.noData}>
              <NoDataShow
                title={strings('Chat.noDataTitle')}
                image={require('../../../assets/chatGroupNoData.png')}
                description={strings('Chat.noDataDescription')}
              />
            </View> : null
          }
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
  noData: {
    flex: 1,
    marginTop: '40%',
  },
});

export default ChatScreen;
