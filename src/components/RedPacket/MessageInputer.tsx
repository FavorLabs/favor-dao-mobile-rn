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
} from 'react-native';
import {CometChat} from "@cometchat-pro/react-native-chat";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../navigation/RouteNames";
import ImagePicker, {Video} from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera } from 'react-native-image-picker';
import Toast from "react-native-toast-message";
import {getSize} from "../../utils/util";
import Favor from "../../libs/favor";
import {ImagePickerResponse} from "react-native-image-picker/src/types";

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
  const {guid, messageList, setMessageList, memberCount} = props;
  const [contentShow, setContentShow] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const textInputRef = useRef(null);
  const sendShow = useMemo(() => inputValue ? true : false, [inputValue]);

  // @ts-ignore
  const { config } = Favor as FavorType;

  const textMessage = useMemo(() =>
    new CometChat.TextMessage(
      guid,
      inputValue,
      'group',
    ), [inputValue])

  const sendCustomMessage = (customData: CustomData) => {
    const customMessage = new CometChat.CustomMessage(
      guid,
      'group',
      'redPacket',
      customData,
    );

    CometChat.sendCustomMessage(customMessage).then(
      message => {
        console.log('Custom message sent successfully:', {message});
        setMessageList([message, ...messageList])
      },
      error => {
        console.log('Failed to send custom message:', {error});
      }
    );
  };

  const luckyPacketFun = () => {
    // @ts-ignore
    navigation.navigate(Screens.RedEnvelopes, {sendCustomMessage: sendCustomMessage, memberCount: memberCount})
    setContentShow(false);
  }

  const modifyContentShow = async () => {
    if (sendShow) {
      CometChat.sendMessage(textMessage).then(
        (message) => {
          setInputValue('')
          console.log("Message sent successfully:", message);
          setMessageList([message, ...messageList])
          if (textInputRef.current) {
            // @ts-ignore
            textInputRef.current.blur();
          }
        },
        (error) => {
          console.log("Error sending message:", error);
        }
      );
    } else {
      setContentShow(!contentShow);
    }
  };

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
        console.log(fileObj,'fileObj')

        const mediaMessage = new CometChat.MediaMessage(
          guid,
          fileObj,
          CometChat.MESSAGE_TYPE.IMAGE,
          CometChat.RECEIVER_TYPE.GROUP,
        );

        CometChat.sendMessage(mediaMessage).then(
          message => {
            console.log('Message sent successfully:', message);
            setMessageList([message, ...messageList])
            setContentShow(false);
          },
          error => {
            console.log('Message sending failed with error:', error);
            setContentShow(false);
          }
        );

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
      console.log(video,'videoInfo');
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

      try {
        const response = await CometChat.sendMessage(mediaMessage);
        console.log('CometChat send video message successful:', response);
        setMessageList([response, ...messageList]);
      } catch (error) {
        console.log('CometChat send video message failed with error:', error);
      }
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
        console.log(file,'file')
        const mediaMessage = new CometChat.MediaMessage(
          guid,
          file,
          CometChat.MESSAGE_TYPE.FILE,
          CometChat.RECEIVER_TYPE.GROUP,
        );

        mediaMessage.setData({
          name: file.name,
          type: file.type,
        });

        CometChat.sendMessage(mediaMessage).then(
          message => {
            console.log('Message sent successfully:', message);
            setMessageList([message, ...messageList])
            setContentShow(false);
          },
          error => {
            console.log('Message sending failed with error:', error);
            setContentShow(false);
          }
        );

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
            console.log(response,'response')
            if (response.didCancel) {
              return null;
            }
            let type = null;
            let name = null;
            if(response.assets)
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
            if(response.assets){
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

              CometChat.sendMessage(mediaMessage).then(
                message => {
                  console.log('Message sent successfully:', message);
                  setMessageList([message, ...messageList])
                  setContentShow(false);
                },
                error => {
                  console.log('Message sending failed with error:', error);
                  setContentShow(false);
                }
              );
            }
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (sendShow) setContentShow(false);
  }, [sendShow])

  return (
    <View style={styles.container}>
      <View style={styles.Inputbox}>
        <View style={styles.flexBox}>
          <TextInput
            style={styles.textInp}
            placeholder={'Message'}
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            ref={textInputRef}
            onSubmitEditing={modifyContentShow}
            multiline={true}
          />
          <Image style={styles.image} source={require("../../assets/ChatSmail.png")}/>
          <TouchableOpacity onPress={modifyContentShow}>
            <Image style={styles.image}
                   source={sendShow ? require("../../assets/ChatToTop.png") : require("../../assets/ChatAdd.png")}/>
          </TouchableOpacity>
          {/*<Image style={styles.image} source={require("../../assets/ChatToTop.png")}/>*/}
        </View>
      </View>
      {
        contentShow &&
          <View style={styles.ationBox}>
              <View style={styles.flexToAct}>
                  <TouchableOpacity style={styles.actBox} onPress={uploadImage}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatPicIcon.png")}
                                 resizeMode={"contain"}/>
                      </View>
                      <Text style={styles.actName}>Picture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actBox} onPress={()=> takePhoto('photo')}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatCaptureIcon.png")}
                                 resizeMode={"contain"}/>
                      </View>
                      <Text style={styles.actName}>Capture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actBox} onPress={uploadVideo}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatVideoIcon.png")}
                                 resizeMode={"contain"}/>
                      </View>
                      <Text style={styles.actName}>Video</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.flexToAct}>
                  <TouchableOpacity style={styles.actBox} onPress={()=> takePhoto('video')}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatRecordIcon.png")}
                                 resizeMode={"contain"}/>
                      </View>
                      <Text style={styles.actName}>Record</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actBox} onPress={uploadFile}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatFileIcon.png")}
                                 resizeMode={"contain"}/>
                      </View>
                      <Text style={styles.actName}>File</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actBox} onPress={luckyPacketFun}>
                      <View style={styles.boxHead}>
                          <Image style={styles.boxIcon} source={require("../../assets/ChatLuckyPacketIcon.png")}
                                 resizeMode={"contain"}/>
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
  actName: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
    color: '#999999',
    width: "200%",
    position: 'absolute',
    left: "-50%",
    bottom: -7,
    textAlign: "center"
  },
  boxIcon: {
    width: 18,
    height: 18
  },
  boxHead: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  actBox: {
    height: 60,
    width: 44,
  },
  flexToAct: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ationBox: {
    height: 220,
    display: "flex",
    justifyContent: 'space-evenly',
    paddingLeft: 45,
    paddingRight: 45
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