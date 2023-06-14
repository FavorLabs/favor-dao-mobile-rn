import React, { useEffect,  useState, } from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Image} from 'react-native';
import ChatMsgItem from "./ChatMsgItem";
export type Props = {
    isUser:boolean,
    showTime:boolean
};
const ChatNameBox: React.FC<Props> = (props) => {
    const {
        isUser,
        showTime
    } = props;

    return (
<View style={styles.container}>
    {
        showTime &&
            <Text style={styles.time}>12:15</Text>
    }
    {
        isUser &&
        <>
        <View style={styles.flexBox}>
            <Image style={styles.image} source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} />
            <Text style={styles.name}>Twistzz</Text>
        </View>
        <View style={styles.msgbox}>
       <ChatMsgItem msgType={1} contextData={"See income is prettyr aaadwa adwad adwa si wo sh in ibabab  a a a anwaaw ? dwadw"}/>
      </View>
        </>
    }
{
    !isUser &&
    <>
    <View style={styles.flexBoxIsMine}>
        <View></View>
        <View style={styles.flexBox}>
            <Text style={styles.name}>Keyyabey</Text>
            <Image style={styles.imageIsMine} source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}></Image>
        </View>
    </View>
    <View style={styles.msgboxIsMine}>
        <View style={styles. msgboxIsMineBox}>
            <ChatMsgItem msgType={1} contextData={"65556"}/>
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
        color:'#3C3C43'
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
        width:'80%',
        marginLeft:46,
        marginTop:-10
    },
    msgboxIsMineBox:{
        display:"flex",
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
        fontSize: 16,
        fontWeight: '400',
        opacity: 0.8,
        color:'#999999',
        marginTop:-5
    },
    flexBoxIsMine:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between',
        height:40,
    },
})

export default ChatNameBox