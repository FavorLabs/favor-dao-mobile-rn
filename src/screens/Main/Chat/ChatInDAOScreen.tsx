import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    KeyboardAvoidingView, Platform
} from "react-native";
import ExpandedDAOHeader from "../../../components/ExpandedDAOHeader";
import {useNavigation, useRoute} from "@react-navigation/native";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {DaoInfo} from "../../../declare/api/DAOApi";
import MessageInputer from "../../../components/RedPacket/MessageInputer";
import DaoApi from "../../../services/DAOApi/Dao";
import {useUrl} from "../../../utils/hook";
import {useEffect, useMemo, useRef, useState} from "react";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {Color, FontSize} from "../../../GlobalStyles";
import ChatNameBox from "../../../components/RedPacket/ChatNameBox";
import {sleep} from "../../../utils/util";
import User = CometChat.User;
import navigation from "../../../navigation";
import Toast from "react-native-toast-message";

const ChatInDAOScreen = () => {
    const limit = 10;
    const route = useRoute();
    // @ts-ignore
    const {info} = route.params;
    const url = useUrl();
    const [daoInfo, setDaoInfo] = useState<DaoInfo>();
    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<CometChat.BaseMessage[] | CometChat.TextMessage[] | CometChat.MediaMessage[] | CometChat.CustomMessage[]>([]);
    const [more, setMore] = useState(true);
    const navigation = useNavigation();

    const messagesRequest = useMemo(() =>
        new CometChat.MessagesRequestBuilder()
          .setGUID(info.guid).setLimit(limit).build()
      , [info.guid])

    const flatListRef = useRef(null);
    const [loginUser, setLoginUser] = useState<User | null>(null);

    const scrollToBottom = () => {
        if (flatListRef.current) {
            // @ts-ignore
            flatListRef.current.scrollToIndex({ index: 0 });
        }
    };

    const getDaoInfo = async () => {
        try {
            const {data} = await DaoApi.getById(url, info.name);
            if (data.data) {
                setDaoInfo(data.data);
            }
        } catch (e) {
            if (e instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: e.message
                });
                navigation.goBack();
            };
        }
    }

    const handleLoadMore = async () => {
        if (!loading) setLoading(true);
        try {
            const data: CometChat.BaseMessage[] = await messagesRequest.fetchPrevious();
            setMessageList([...messageList, ...data.reverse()]);
            if (data.length < limit) {
                setMore(false);
            }
        } catch (e) {
            if (e instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: e.message
                });
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
              <ChatNameBox messageInfo={item} isShowTime={isShowTime} isMy={item.getSender() ? loginUser?.getUid() === item.getSender().getUid() : true}/>
          </>
        )
    }

    useEffect(() => {
        getDaoInfo();
    }, []);

    useEffect(() => {
        CometChat.getLoggedinUser()
          .then((user) => setLoginUser(user))
          .catch((error) => {
              const errorCode = error?.message || 'ERROR';
              console.log(errorCode)
          });
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
        // @ts-ignore
        if (message && !message._id) {
            CometChat.markAsRead(
              message.getId(),
              message.getReceiverId(),
              message.getReceiverType(),
              message.getSender().getUid(),
            )
        }
    }, [messageList[0]])

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        {
          daoInfo ?
            <BackgroundSafeAreaView
              headerStyle={{paddingTop: 0}}
              headerComponent={daoInfo &&
                <ExpandedDAOHeader daoInfo={daoInfo} isShowJoined={false} isShowBtnChatToggle={true}/>}
            >

                <FlatList
                  style={{flex: 1}}
                  contentContainerStyle={{minHeight: '100%'}}
                  ref={flatListRef}
                  data={messageList}
                  renderItem={({item, index}) => renderItem(item, index)}
                  // @ts-ignore
                  keyExtractor={(item) => item.getId()}
                  inverted={true}
                  onEndReachedThreshold={0.2}
                  onEndReached={more ? handleLoadMore : undefined}
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

                <MessageInputer
                  guid={info.guid}
                  setMessageList={setMessageList}
                  memberCount={daoInfo?.follow_count}
                  scrollToBottom={scrollToBottom}
                  loginUser={loginUser}
                />
            </BackgroundSafeAreaView>
            :
            <View style={styles.loadingContent}>
                <Text style={styles.loading}>
                    loading...
                </Text>
            </View>
        }


      </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    loadingContent: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        color: '#000000',
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
