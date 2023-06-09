import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {CometChatGroupListWithMessages} from '../../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index'
import {Color} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import SearchHead from "../../../components/SearchHead";
import { useFocusEffect } from "@react-navigation/native";
import {CometChat} from "@cometchat-pro/react-native-chat";
import MessageItem from "../../../components/Message/MessageItem";

const ChatScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  // const [keyword, setKeyword] = useState('');
  const limit = 10;
  const [list, setList] = useState<CometChat.Conversation[]>([]);
  const [searchList, setSearchList] = useState<CometChat.Group[]>([]);

  const conversationRequest = useMemo(() =>
    new CometChat.ConversationsRequestBuilder()
      .setConversationType('group')
      .withUserAndGroupTags(true)
      .setLimit(limit)
      .build(),[])

  const groupsRequest = useMemo(() =>
    new CometChat.GroupsRequestBuilder()
      .joinedOnly(true)
      .setLimit(limit)
      .setSearchKeyword(searchValue)
      .withTags(true)
      .build(), [searchValue])

  const dataList = useMemo(() => searchValue ? searchList:list,[searchValue])

  const getSearchInfo = async () => {
    const data = await groupsRequest.fetchNext();
    console.log(data,data.length,'getSearchInfo')
    setSearchList(data);
  }
  const getInfo = async () => {
    const data = await conversationRequest.fetchNext()
    setList(v => v.concat(data))
  }

  const getSearch = async () => {
    // await setKeyword(searchValue);
    console.log(searchValue,'searchValue')
    if(searchValue) await getSearchInfo();
  }

  useFocusEffect(
    useCallback(() => {
      setSearchValue('');
      getInfo();
    }, [])
  )

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <SearchHead
          tittle={'Chats'}
          getSearchBlur={getSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {/*<FlatList*/}
        {/*  data={dataList}*/}
        {/*  renderItem={(item) => <MessageItem avatar={item.avatar} name={item.name}/>}*/}
        {/*  keyExtractor={item => item.id}*/}
        {/*/>*/}
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
