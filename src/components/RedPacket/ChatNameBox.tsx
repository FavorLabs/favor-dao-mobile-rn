import React, {useEffect, useMemo, useState,} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Image} from 'react-native';
import ChatMsgItem from "./ChatMsgItem";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {getChatsAvatarUrl, getTime} from "../../utils/util";
import {useSelector} from "react-redux";
import Models from "../../declare/storeTypes";
import {useResourceUrl} from "../../utils/hook";
export type Props = {
  messageInfo: CometChat.BaseMessage;
};
const ChatNameBox: React.FC<Props> = (props) => {
  const { messageInfo } = props;

  const avatarsResUrl = useResourceUrl('avatars');
  const {user} = useSelector((state: Models) => state.global);
  const [isMy,setIsMy] = useState(false);
  const [isAction,setIsAction] = useState(false);
  const [actionText,setActionText] = useState('');
  const [messageInfoType,setMessageInfoType] = useState('');

  const judgmentType = () => {
    // @ts-ignore
    const category = messageInfo.getRawMessage().category;
    if(category === 'action') {
      setIsAction(true);
      // @ts-ignore
      const joinStatus = messageInfo.action;
      if(joinStatus === 'left' || joinStatus === 'joined') {
        // @ts-ignore
        setActionText(messageInfo.message)
      }
    } else if(category === 'message') {
      // @ts-ignore
      const messageType = messageInfo.getRawMessage().type;
      setMessageInfoType(messageType)
    } else if(category === 'custom') {
      // @ts-ignore
      setMessageInfoType(messageInfo.getRawMessage().type)
    }

  };

  useEffect(()=> {
    setIsMy(messageInfo.getSender().getName() === user?.nickname ? true : false);
    judgmentType();
  },[messageInfo])

  return (
    <View style={styles.container}>

      {
        // @ts-ignore
          <Text style={styles.time}>{getTime(Number(messageInfo.updatedAt))}</Text>
      }

      {
        !isAction ?
        <>
          {
            !isMy ?
              <>
                <View style={styles.flexBox}>
                  <Image style={styles.image} source={{uri: `${avatarsResUrl}/${getChatsAvatarUrl(messageInfo.getSender().getAvatar())}`}} />
                  <Text style={styles.name}>{messageInfo.getSender().getName()}</Text>
                </View>
                <View style={styles.msgbox}>
                  <ChatMsgItem type={messageInfoType} messageInfo={messageInfo}/>
                </View>
              </>
              :
              <>
                <View style={styles.flexBoxIsMine}>
                  <View></View>
                  <View style={styles.flexBox}>
                    <Text style={styles.name}>{messageInfo.getSender().getName()}</Text>
                    <Image style={styles.imageIsMine} source={{uri: `${avatarsResUrl}/${getChatsAvatarUrl(messageInfo.getSender().getAvatar())}`}}></Image>
                  </View>
                </View>
                <View style={styles.msgboxIsMine}>
                  <View style={styles. msgboxIsMineBox}>
                    <ChatMsgItem isUser={true} type={messageInfoType} messageInfo={messageInfo} isMy={true}/>
                  </View>
                </View>
              </>
          }
        </>
        :
        <>
          <View style={styles.actionRow}>
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>{actionText}</Text>
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