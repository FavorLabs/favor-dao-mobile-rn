import React, {useEffect, useMemo, useState,} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Image} from 'react-native';
import ChatMsgItem from "./ChatMsgItem";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {getChatsAvatarUrl, getTime} from "../../utils/util";
import {useSelector} from "react-redux";
import Models from "../../declare/storeTypes";
import {useResourceUrl} from "../../utils/hook";
export type Props = {
  messageInfo: CometChat.BaseMessage | CometChat.TextMessage | CometChat.MediaMessage | CometChat.CustomMessage | any;
  isShowTime: boolean;
  isMy: boolean
};
const ChatNameBox: React.FC<Props> = (props) => {
  const { messageInfo, isShowTime, isMy } = props;

  const avatarsResUrl = useResourceUrl('avatars');
  const {user} = useSelector((state: Models) => state.global);

  return (
    <View style={styles.container}>

      {
        isShowTime &&
        // @ts-ignore
          <Text style={styles.time}>{getTime(Number(messageInfo.updatedAt))}</Text>
      }

      {
        // @ts-ignore
        messageInfo.getRawMessage().category !== 'action' ?
        <>
          {
            !isMy ?
              <>
                <View style={styles.flexBox}>
                  <Image style={styles.image} source={{uri: `${avatarsResUrl}/${getChatsAvatarUrl(messageInfo.getSender() ? messageInfo.getSender().getAvatar() : messageInfo.sender.avatar)}`}} />
                  <Text style={styles.name}>{
                    messageInfo.getSender() ?
                    messageInfo.getSender().getName() :
                      messageInfo.sender.name
                  }</Text>
                </View>
                <View style={styles.msgbox}>
                  <ChatMsgItem
                    // @ts-ignore
                    type={messageInfo.getRawMessage().type}
                    messageInfo={messageInfo}
                  />
                </View>
              </>
              :
              <>
                <View style={styles.flexBoxIsMine}>
                  <View></View>
                  <View style={styles.flexBox}>
                    <Text style={styles.name}>{user?.nickname}</Text>
                    <Image style={styles.imageIsMine} source={{uri: `${avatarsResUrl}/${getChatsAvatarUrl(messageInfo.getSender() ? messageInfo.getSender().getAvatar() : messageInfo.sender.avatar)}`}}></Image>
                  </View>
                </View>
                <View style={styles.msgboxIsMine}>
                  <View style={styles. msgboxIsMineBox}>
                    <ChatMsgItem
                      isUser={true}
                      // @ts-ignore
                      type={messageInfo.getRawMessage().type}
                      messageInfo={messageInfo}
                    />
                  </View>
                </View>
              </>
          }
        </>
        :
        <>
          <View style={styles.actionRow}>
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>{
                // @ts-ignore
                (messageInfo.action === 'joined' || messageInfo.action === 'left') && messageInfo.message
              }</Text>
            </View>
          </View>
        </>
      }
    </View>


  )
}

const styles = StyleSheet.create({
  time:{
    textAlign:'center',
    color:'#3C3C43',
    fontWeight: '300',
    fontSize: 13,
  },
  container:{
    overflow:'hidden',
    marginTop:15
  },
  absolute:{
    position:"absolute",
    right:0
  },
  msgbox:{
    marginLeft:46,
    marginTop:-10
  },
  msgboxIsMineBox:{
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  msgboxIsMine:{
    marginRight:46,
    marginTop:-10,
  },
  flexBox:{
    display:"flex",
    flexDirection:'row',
    alignItems:'center',
    height:40
  },
  image:{
    width:30,
    height:30,
    borderRadius:15,
    marginLeft:10,
    marginRight:8,
  },
  imageIsMine:{
    width:30,
    height:30,
    borderRadius:15,
    marginLeft:8,
    marginRight:10,
  },
  name:{
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
    color:'#999999',
    marginTop:-5
  },
  flexBoxIsMine:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    // height:40,
  },
  actionRow: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 13,
  },
  actionContent: {
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 11,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999'
  },
})

export default ChatNameBox
