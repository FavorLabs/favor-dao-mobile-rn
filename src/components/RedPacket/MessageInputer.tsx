import React, {useEffect, useMemo, useRef, useState,} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Dimensions
} from 'react-native';
import {CometChat} from "@cometchat-pro/react-native-chat";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../navigation/RouteNames";
import ImagePicker, {Video} from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import Toast from "react-native-toast-message";
import {getSize} from "../../utils/util";
import Favor from "../../libs/favor";
import {ImagePickerResponse} from "react-native-image-picker/src/types";
import {StackNavigationProp} from "@react-navigation/stack";
import EmojiSelector from 'react-native-emoji-selector'
import { Message } from '../../declare/api/nodeApi';
import User = CometChat.User;
import BottomItem from "./BottomItem";

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
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {guid, messageList, setMessageList, memberCount} = props;

  const [inputValue, setInputValue] = useState<string>('');

  const textInputRef = useRef<TextInput>(null);

  const sendShow = useMemo(() => !!inputValue, [inputValue]);

  const [bottomType, setBottomType] = useState<'function' | 'emoji' | 'none'>('none');

  const {config} = Favor;
  const [loginUser,setLoginUser] = useState<User | null>(null);

  useEffect(()=> {
    CometChat.getLoggedinUser()
      .then((user) => setLoginUser(user))
      .catch((error) => {
        const errorCode = error?.message || 'ERROR';
        console.log(errorCode)
      });
  },[]);

  const closeBottom = () => {
    setBottomType('none');
  }

  const sendCustomMessage = (customData: CustomData) => {
    const customMessage = new CometChat.CustomMessage(
      guid,
      'group',
      'redPacket',
      customData,
    );
    messageProcess(customMessage,'redPacket','custom')
  };

  const luckyPacketFun = () => {
    navigation.navigate(Screens.RedEnvelopes, {sendCustomMessage: sendCustomMessage, memberCount: memberCount})
    closeBottom();
  }

  const uploadImage = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: false,
      multiple: false
    }).then((image) => {
      if (image) {
        const fileObj = {
          uid: new Date().getTime(),
          name: image.path.split('/').pop(),
          type: image.mime,
          size: image.size,
          uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
        };
        const mediaMessage = new CometChat.MediaMessage(
          guid,
          fileObj,
          CometChat.MESSAGE_TYPE.IMAGE,
          CometChat.RECEIVER_TYPE.GROUP,
        );
        mediaMessage.setData({
          'url': fileObj.uri,
        });
        messageProcess(mediaMessage,'image');
      } else return Toast.show({
        type: 'error',
        text1: 'PickedImage error',
      });
    });
  };

  const uploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'MediumQuality',
    }).then(async video => {
      if (!checkVideoSize(video)) return;
      const mediaMessage = new CometChat.MediaMessage(
        guid,
        {
          uri: video.path,
          type: video.mime,
          name: video.path.split('/').pop(),
        },
        CometChat.MESSAGE_TYPE.VIDEO,
        CometChat.RECEIVER_TYPE.GROUP
      );
      mediaMessage.setData({
        'url': video.path,
      });
      messageProcess(mediaMessage,'video');
    })
  };

  const checkVideoSize = (video: Video) => {
    if (config?.videoLimitSize && (video.size / 1024 > config.videoLimitSize)) {
      Toast.show({
        type: 'info',
        text1: `Video needs to be less than ${getSize(config.videoLimitSize, 1)}`
      })
      return false;
    } else {
      return true;
    }
  };

  const uploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const file = {
        name: res[0].name,
        type: res[0].type,
        uri: res[0].uri,
      };

      const mediaMessage = new CometChat.MediaMessage(
        guid,
        file,
        CometChat.MESSAGE_TYPE.FILE,
        CometChat.RECEIVER_TYPE.GROUP,
      );
      mediaMessage.setData({
        name: file.name,
        type: file.type,
        size: res[0].size,
      });
      messageProcess(mediaMessage,'file');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user cancelled the picker');
      } else {
        console.log(err)
      }
    }
  };

  const takePhoto = async (mediaType = 'photo') => {
    try {
      let granted = null;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'CometChat Camera Permission',
            message: 'CometChat needs access to your camera ',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      }

      if (Platform.OS === 'ios' || granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            // @ts-ignore
            mediaType,
            includeBase64: false,
            cameraType: 'back',
          },
          (response: ImagePickerResponse) => {
            if (response.didCancel) {
              return null;
            }
            let type = null;
            let name = null;
            if (response.assets)
              if (Platform.OS === 'ios' && response.assets[0].fileName !== undefined) {
                name = response.assets[0].fileName;
                type = response.assets[0].type;
              } else {
                // @ts-ignore
                type = response.assets[0].type;
                name = 'Camera_001.jpeg';
              }
            if (mediaType == 'video') {
              type = 'video/quicktime';
              name = 'Camera_002.mov';
            }
            if (response.assets) {
              const file = {
                name:
                  Platform.OS === 'android' && mediaType != 'video'
                    ? response.assets[0].fileName
                    : name,
                type:
                  Platform.OS === 'android' && mediaType != 'video'
                    ? response.assets[0].type
                    : type,
                uri:
                  Platform.OS === 'android'
                    ? response.assets[0].uri
                    // @ts-ignore
                    : response.assets[0].uri.replace('file://', ''),
              };

              const mediaMessage = new CometChat.MediaMessage(
                guid,
                file,
                mediaType === 'photo' ? CometChat.MESSAGE_TYPE.IMAGE : CometChat.MESSAGE_TYPE.VIDEO,
                CometChat.RECEIVER_TYPE.GROUP,
              );

              mediaMessage.setData({
                'url': file.uri
              });
              messageProcess(mediaMessage,mediaType === 'photo' ? 'image':'video');
            }
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEmoji = () => {
    if (bottomType === 'emoji') {
      closeBottom();
    } else {
      Keyboard.dismiss()
      setBottomType('emoji');
    }
  }
  const handleClickAdd = () => {
    if (bottomType === 'function') {
      closeBottom();
    } else {
      Keyboard.dismiss()
      setBottomType('function');
    }
  }
  const handleClickSend = async () => {
    const messageInput = inputValue.trim();
    const textMessage: any = new CometChat.TextMessage(guid, messageInput, CometChat.RECEIVER_TYPE.GROUP);
    textMessage.setData({
      'text': messageInput,
    });
    messageProcess(textMessage,'text');
  };

  const messageProcess = (userMessage:  CometChat.MediaMessage |  CometChat.TextMessage | CometChat.CustomMessage,type: string, category: string = 'message') => {
    userMessage.setSender(loginUser as User);
    // @ts-ignore
    userMessage._id = Date.now().toString();
    // @ts-ignore
    userMessage.setId(userMessage._id);
    // @ts-ignore
    userMessage.updatedAt = Date.now() / 1000;
    userMessage.setRawMessage({
      category,
      type,
    });

    // @ts-ignore
    setMessageList(v => [userMessage, ...v]);
    if (category === 'message') closeBottom();
    if (type === 'text') setInputValue('');

    if(category === 'custom') {
      CometChat.sendCustomMessage(userMessage as CometChat.CustomMessage).then(
        message => {
          // @ts-ignore
          setMessageList(v => messageSent(v,message,userMessage._id));
        },
        error => {
          Toast.show({
            type: 'error',
            text1: error,
          });
          // @ts-ignore
          setMessageList(v => messageSendError(v,userMessage._id));
        }
      );
    } else {
      CometChat.sendMessage(userMessage).then(
        message => {
          // @ts-ignore
          setMessageList(v => messageSent(v,message,userMessage._id));
        },
        error => {
          Toast.show({
            type: 'error',
            text1: error,
          });
          // @ts-ignore
          setMessageList(v => messageSendError(v,userMessage._id));
        }
      )
    }


  }

  const messageSent = (messageList: CometChat.BaseMessage[], message:any, id:string ):CometChat.BaseMessage[] => {
    // @ts-ignore
    return messageList.map(obj => obj._id === id ? message : obj)
  }

  const messageSendError = (messageList: CometChat.BaseMessage[],id: string):CometChat.BaseMessage[] => {
    // @ts-ignore
    return  messageList.filter(v => (v._id !== id || !v._id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.Inputbox}>
        <View style={styles.flexBox}>
          <TextInput
            style={styles.textInp}
            placeholder={'Message'}
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            onFocus={closeBottom}
            ref={textInputRef}
            onSubmitEditing={handleClickSend}
            multiline={true}
          />
          <TouchableOpacity onPress={handleClickEmoji}>
            <Image style={styles.image} source={require("../../assets/ChatSmail.png")}/>
          </TouchableOpacity>
          {
            sendShow ?
              <TouchableOpacity onPress={handleClickSend}>
                <Image
                  style={styles.image}
                  source={require("../../assets/ChatToTop.png")}
                />
              </TouchableOpacity> :
              <TouchableOpacity onPress={handleClickAdd}>
                <Image
                  style={styles.image}
                  source={require("../../assets/ChatAdd.png")}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
      {
        bottomType === 'function' &&
          <View style={{height:0.22 * Height}}>
              <View style={styles.flexToAct}>
                <BottomItem
                fn={uploadImage}
                title={'Picture'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatPicIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
                <BottomItem
                    fn={()=>takePhoto('photo')}
                    title={'Capture'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatCaptureIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
                <BottomItem
                    fn={uploadVideo}
                    title={'Video'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatVideoIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
              </View>
              <View style={styles.flexToAct}>
                <BottomItem
                    fn={() => takePhoto('video')}
                    title={'Record'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatRecordIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
                <BottomItem
                    fn={uploadFile}
                    title={'File'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatFileIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
                <BottomItem
                    fn={luckyPacketFun}
                    title={'LuckyPacket'}
                >
                  <Image style={{height:0.06 * Width,width:0.06 * Width}}
                         source={require("../../assets/ChatLuckyPacketIcon.png")}
                         resizeMode={"contain"}/>
                </BottomItem>
              </View>
          </View>
      }
      {
        bottomType === 'emoji' &&
          <View style={{height:0.22 * Height}}>
              <EmojiSelector
                  columns={10}
                  showSearchBar={false}
                  onEmojiSelected={emoji => setInputValue(v => v + emoji)}
              />
          </View>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  actName: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
    color: '#999999',
    width: "300%",
    position: 'absolute',
    left: "-100%",
    textAlign: "center",
  },
  boxIcon: {
    width: 18,
    height: 18
  },
  boxHead: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF'
  },
  actBox: {
    height:'60%',
    width:'10%',
  },
  flexToAct: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginLeft: 10
  },
  textInp: {
    flex: 1,
    paddingVertical: 5,
    fontWeight: '400',
    fontSize: 17,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white"
  },
  container: {
    backgroundColor: '#F4F4F5'
  },
  Inputbox: {
    // height:65,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  flexBox: {
    marginLeft: 15,
    marginRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
})

export default MessageInputer