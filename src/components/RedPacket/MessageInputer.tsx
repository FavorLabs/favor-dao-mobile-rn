import React, {useEffect, useMemo, useRef, useState,} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {CometChat} from "@cometchat-pro/react-native-chat";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../navigation/RouteNames";

export type Props = {
    memberCount: number;
    guid: string;
    setMessageList: Function;
    messageList: CometChat.BaseMessage[];
};

type CustomData = {
    id: string;
    title: string;
}

const MessageInputer: React.FC<Props> = (props) => {
    const navigation = useNavigation();
    const { guid, messageList, setMessageList, memberCount } = props;
    const [contentShow, setContentShow] = useState(false);
    const [sendShow, setSendShow] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const textInputRef = useRef(null);

    const textMessage = useMemo(()=>
      new CometChat.TextMessage(
        guid,
        inputValue,
        'group',
    ),[inputValue])

    const sendCustomMessage = (customData:CustomData) => {
        const customMessage = new CometChat.CustomMessage(
          guid,
          'group',
          'redPacket',
          customData,
        );

        CometChat.sendCustomMessage(customMessage).then(
          message => {
              console.log('Custom message sent successfully:', { message });
              setMessageList([message,...messageList])
          },
          error => {
              console.log('Failed to send custom message:', { error });
          }
        );
    };

    const luckyPacketFun = () => {
        // @ts-ignore
        navigation.navigate(Screens.RedEnvelopes,{sendCustomMessage: sendCustomMessage, memberCount:memberCount})
        setContentShow(false);
    }

    const modifyContentShow = async () => {
        if(sendShow) {
            CometChat.sendMessage(textMessage).then(
              (message) => {
                  console.log("Message sent successfully:", message);
                  setMessageList([message,...messageList])
                  if(textInputRef.current) {
                      // @ts-ignore
                      textInputRef.current.blur();
                  }
                  setInputValue('')
                  setSendShow(false)
              },
              (error) => {
                  console.log("Error sending message:", error);
              }
            );
        } else {
            setContentShow(!contentShow);
        }
    };

    useEffect(()=> {
        if(sendShow) setContentShow(false);
    },[sendShow])

    return (
        <View style={styles.container}>
            <View style={styles.Inputbox}>
                <View style={styles.flexBox}>
                    <TextInput
                      style={styles.textInp}
                      placeholder={'Message'}
                      value={inputValue}
                      onChangeText={text => setInputValue(text)}
                      onFocus={()=>setSendShow(true)}
                      // onBlur={()=>setSendShow(false)}
                      ref={textInputRef}
                      onSubmitEditing={modifyContentShow}
                      multiline={true}
                      // numberOfLines={4}
                    />
                    <Image style={styles.image} source={require("../../assets/ChatSmail.png")}/>
                    <TouchableOpacity onPress={modifyContentShow}>
                        <Image style={styles.image} source={ sendShow ? require("../../assets/ChatToTop.png") : require("../../assets/ChatAdd.png")}/>
                    </TouchableOpacity>
                    {/*<Image style={styles.image} source={require("../../assets/ChatToTop.png")}/>*/}
                </View>
            </View>
            {
                contentShow &&
              <View style={styles.ationBox}>
                  <View style={styles.flexToAct}>
                      <View style={styles.actBox}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatPicIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>Picture</Text>
                      </View>
                      <View style={styles.actBox}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatCaptureIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>Capture</Text>
                      </View>
                      <View style={styles.actBox}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatVideoIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>Video</Text>
                      </View>
                  </View>
                  <View style={styles.flexToAct}>
                      <View style={styles.actBox}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatRecordIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>Record</Text>
                      </View>
                      <View style={styles.actBox}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatFileIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>File</Text>
                      </View>
                      <TouchableOpacity style={styles.actBox} onPress={luckyPacketFun}>
                          <View style={styles.boxHead}>
                              <Image style={styles.boxIcon} source={require("../../assets/ChatLuckyPacketIcon.png")} resizeMode={"contain"}/>
                          </View>
                          <Text style={styles.actName}>LuckyPacket</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    actName:{
        fontSize: 12,
        fontWeight: '400',
        opacity: 0.8,
        color:'#999999',
        width:"200%",
        position:'absolute',
        left:"-50%",
        bottom:-7,
        textAlign:"center"
    },
    boxIcon:{
        width:18,
        height:18
    },
    boxHead:{
      width:44,
      height:44,
        borderRadius:8,
        backgroundColor:"#FFFFFF",
        display:"flex",
        justifyContent:'center',
        alignItems:'center'
    },
    actBox:{
        height:60,
        width:44,
    },
    flexToAct:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    ationBox:{
        height:220,
        display:"flex",
        justifyContent:'space-evenly',
        paddingLeft:45,
        paddingRight:45
    },
    image:{
        width:26,
        height:26,
        borderRadius:13,
        marginLeft:10
    },
    textInp:{
        flex:1,
        paddingVertical: 5,
        fontWeight: '400',
        fontSize: 17,
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"white"
    },
    container:{
        backgroundColor:'#F4F4F5'
    },
    Inputbox:{
        // height:65,
        paddingVertical: 10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    flexBox:{
        marginLeft:15,
        marginRight:15,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    }
})

export default MessageInputer