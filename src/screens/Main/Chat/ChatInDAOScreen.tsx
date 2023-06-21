import * as React from "react";
import {StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl} from "react-native";
import ExpandedDAOHeader from "../../../components/ExpandedDAOHeader";
import {useRoute} from "@react-navigation/native";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {DaoInfo} from "../../../declare/api/DAOApi";
import MessageInputer from "../../../components/RedPacket/MessageInputer";
import DaoApi from "../../../services/DAOApi/Dao";
import {useUrl} from "../../../utils/hook";
import {useEffect, useMemo, useRef, useState} from "react";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {Color, FontSize} from "../../../GlobalStyles";
import ChatNameBox from "../../../components/RedPacket/ChatNameBox";
import {getTime} from "../../../utils/util";

const ChatInDAOScreen = () => {
    const limit = 10;
    const route = useRoute();
    // @ts-ignore
    const {info} = route.params;
    const url = useUrl();
    const [daoInfo, setDaoInfo] = useState<DaoInfo>();
    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<CometChat.BaseMessage[]>([]);

    const messagesRequest = useMemo(() =>
        new CometChat.MessagesRequestBuilder()
          .setGUID(info.guid).setLimit(limit).build()
      , [info.guid])

    const getDaoInfo = async () => {
        try {
            const {data} = await DaoApi.getById(url, info.name);
            if (data.data) {
                setDaoInfo(data.data);
            }
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
        }
    }

    const getMessageInfo = async () => {
        try {
            const data: CometChat.BaseMessage[] = await messagesRequest.fetchPrevious();
            await setMessageList(data.reverse());
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message)
            }
        }
    }

    const handleLoadMore = async () => {
        if (messageList.length < limit) return;
        if (!loading) setLoading(true);
        try {
            const data: CometChat.BaseMessage[] = await messagesRequest.fetchPrevious();
            setMessageList([...messageList, ...data.reverse()]);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const renderItem = (item: CometChat.BaseMessage, index: number) => {
        // @ts-ignore
        const newTime = new Date(item.updatedAt).getTime();
        // @ts-ignore
        const prevTime = index < messageList.length - 1 ? new Date(messageList[index + 1].updatedAt).getTime() : null;
        let isShowTime = true;

        if (prevTime) {
            const diffMs = Math.abs(newTime - prevTime);
            const diffMins = Math.floor(diffMs / 60);
            if (diffMins < 2) {
                isShowTime = false;
            }
        }

        return (
          <>
              <ChatNameBox messageInfo={item} isShowTime={isShowTime}/>
          </>
        )
    }

    useEffect(() => {
        getDaoInfo();
        getMessageInfo();
    }, []);

    useEffect(() => {
        const listenerID = info.guid;

        CometChat.addMessageListener(
          listenerID,
          new CometChat.MessageListener({
              onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
                  // @ts-ignore
                  if (textMessage.getReceiver().guid === info.guid) {
                      setMessageList(v => [textMessage, ...v])
                  }
              },
              onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
                  // @ts-ignore
                  if (mediaMessage.getReceiver().guid === info.guid) {
                      setMessageList(v => [mediaMessage, ...v])
                  }
              },
              onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
                  // @ts-ignore
                  if (customMessage.getReceiver().guid === info.guid) {
                      setMessageList(v => [customMessage, ...v])
                  }
              }
          }),
        );

        return () => {
            CometChat.removeMessageListener(listenerID);
        };
    }, []);

    useEffect(() => {
        const message = messageList[0];
        if (message) {
            CometChat.markAsRead(
              message.getId(),
              message.getReceiverId(),
              message.getReceiverType(),
              message.getSender().getUid(),
            )
        }
    }, [messageList[0]])


    if (!messageList.length || !daoInfo) return <View style={styles.loadingContent}><Text
      style={styles.loading}>loading...</Text></View>

    return (
      <BackgroundSafeAreaView
        headerStyle={{paddingTop: 0}}
        headerComponent={daoInfo &&
            <ExpandedDAOHeader daoInfo={daoInfo} isShowJoined={false} isShowBtnChatToggle={true}/>}
      >
          {/*<ChatLayout />*/}
          <FlatList
            // ref={flatListRef}
            data={messageList}
            renderItem={({item, index}) => renderItem(item, index)}
            // @ts-ignore
            keyExtractor={(item) => item.getId()}
            inverted={true}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
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
          <MessageInputer guid={info.guid} setMessageList={setMessageList} messageList={messageList}
                          memberCount={daoInfo?.follow_count}/>
      </BackgroundSafeAreaView>
    );
}
const styles = StyleSheet.create({
    loadingContent: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        color: Color.color1,
        fontSize: FontSize.size_xl,
        fontWeight: '600',
    },
    footer: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default ChatInDAOScreen
