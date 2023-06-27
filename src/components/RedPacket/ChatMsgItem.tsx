import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  Pressable
} from "react-native";
import Video, {OnBufferData} from 'react-native-video';
import {useResourceUrl, useUrl} from "../../utils/hook";
import LinearGradient from 'react-native-linear-gradient';
import {CometChat} from "@cometchat-pro/react-native-chat";
import SvgIcon from "../SvgIcon";
import FileDownloadSvg from "../../assets/svg/file-down-svg.svg";
import {Color} from "../../GlobalStyles";
import RedPacketApi from "../../services/RedpacketApi";
import {RedPacketInfo} from "../../declare/api/RedapacketApi";
import ClaimRes from "./ClaimRes";
import Screens from "../../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import ImgViews from "../ImgViews";
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
import {Icon} from "@rneui/themed";

export type Props = {
  isUser?: boolean,
  type: string,
  messageInfo: CometChat.BaseMessage | any,
};

const ChatMsgItem: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const url = useUrl();
  const {isUser, type, messageInfo} = props;
  const [videoPlay, setVideoPlay] = useState(true);
  const [redStatus, setRedStatus] = useState(2);
  const [claimResStatus, setClaimResStatus] = useState(false);
  const [redPacketId, setRedPacketId] = useState('');
  const [imgShowStatus, setImgShowStatus] = useState(false);
  const player = useRef<Video>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [senderName, setSenderName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [fileImgStatus, setFileImgStatus] = useState(false);
  const [fileVideoStatus, setFileVideoStatus] = useState(false);
  const [fileVideoLoading, setFileVideoLoading] = useState(false);

  const imageClick = () => {
    // @ts-ignore
    if (messageInfo._id) return;
    setImgShowStatus(true);
  }

  const VideoClick = () => {
    // @ts-ignore
    if (messageInfo._id) return;
    if (videoLoading) return;
    if (player.current) {
      Platform.OS !== 'ios' ? player.current.presentFullscreenPlayer() : setVideoPlay(false);
    }
  };

  const buffer = (data: OnBufferData) => {
    setVideoLoading(data.isBuffering)
  }

  const clickRedPacket = () => {
    // @ts-ignore
    if (messageInfo._id) return;
    if (redStatus === 0) {
      // @ts-ignore
      navigation.navigate(Screens.ClaimDetails, {id: messageInfo.customData.id})
    } else if (redStatus === 1) {
      // @ts-ignore
      navigation.navigate(Screens.ClaimDetails, {id: messageInfo.customData.id})
    } else {
      setClaimResStatus(true)
    }
  };

  const getRedPacketStatus = async () => {
    try {
      // @ts-ignore
      const {data} = await RedPacketApi.getRedPacketInfo(url, messageInfo.customData.id);
      const redPacket: RedPacketInfo = data.data;
      // const hour = getIntervalHours(data.data.created_on);
      if (data.data.is_timeout) return setRedStatus(0);
      if (redPacket.total === Number(redPacket.claim_count) || Number(redPacket.claim_amount) > 0) return setRedStatus(1);
      return setRedStatus(2);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  const downloadFile = async () => {
    if (downloading) return;
    setDownloading(true);

    if (Platform.OS === 'ios') {
      // @ts-ignore
      const fileName = messageInfo.data.name.replace(/\s/g, "");
      FileSystem.downloadAsync(
        // @ts-ignore
        `${messageInfo.data.url}`,
        // @ts-ignore
        `${FileSystem.documentDirectory}${fileName}`
      )
        .then(({uri}) => {
          console.log('Finished downloading to ', uri);
        })
        .catch(error => {
          console.error(error);
        }).finally(() => {
        setDownloading(false);
      })
    } else {
      // @ts-ignore
      const fileDest = `${RNFS.DownloadDirectoryPath}/downLoad/${messageInfo.data.name}`;
      console.log(fileDest, 'fileDest')
      RNFS.mkdir(fileDest).then(() => {
        RNFS.downloadFile({
          // @ts-ignore
          fromUrl: messageInfo.data.url,
          toFile: fileDest,
        }).promise.then(res => {
          console.log('success', res)
        }).catch(e => {
          console.log(e);
        }).finally(() => {
          setDownloading(false);
        })
      }).catch(err => {
        console.log(err);
        setDownloading(false);
      })
    }
  };

  const fileClick = () => {
    if (messageInfo._id) return;
    const fileType = messageInfo.data.type.split('/')[0]
    console.log(fileType, 'fileType')
    if (fileType === 'image') {
      setFileImgStatus(true);
    } else if (fileType === 'video') {
      setFileVideoStatus(true);
    }
  }

  const fileVideoBuffer = (data: OnBufferData) => {
    console.log(data.isBuffering,'data.isBuffering')
    setFileVideoLoading(data.isBuffering)
  }


  useEffect(() => {
    if (type === 'redPacket') {
      // @ts-ignore
      setRedPacketId(messageInfo.customData.id)
      // @ts-ignore
      setSenderName(messageInfo.getSender() ? messageInfo.getSender().getName() : messageInfo.sender.name)
      getRedPacketStatus();
    }
  }, [])

  return (
    <View style={styles.item}>
      {
        // @ts-ignore
        (isUser && messageInfo._id) &&
          <View style={styles.sendLoading}>
              <ActivityIndicator size={'small'}/>
          </View>
      }
      {
        type === 'text' &&
          <View style={[styles.container, styles.BDRmax, {backgroundColor: isUser ? '#FF8D1A' : '#FFFFFF'}]}>
              <Text
                  style={[styles.text, {color: isUser ? 'white' : 'black'}]}
              >
                {
                  // @ts-ignore
                  messageInfo.data.text
                }
              </Text>
          </View>
      }
      {
        type === 'image' &&
          <>
              <TouchableOpacity onPress={imageClick} style={[styles.image, styles.BDRmax]}>
                {
                  imageLoading &&
                    <View style={styles.imageLoading}>
                        <ActivityIndicator size={"large"}/>
                    </View>
                }
                  <Image
                      style={[styles.image, styles.BDRmax]}
                      resizeMethod={"resize"}
                      resizeMode={"contain"}
                    // @ts-ignore
                      source={{uri: messageInfo.data.url}}
                      onLoadStart={() => setImageLoading(true)}
                      onLoadEnd={() => setImageLoading(false)}
                  />
              </TouchableOpacity>
              <ImgViews
                  visibleStatus={imgShowStatus}
                  setImgShowStatus={setImgShowStatus}
                // @ts-ignore
                  images={[{uri: messageInfo.data.url}]}
                  imageIndex={0}
              />
          </>
      }
      {
        type === 'video' &&
          <TouchableOpacity style={[styles.videoBox, styles.video, styles.BDRmax]} onPress={VideoClick}>
            {
              videoLoading &&
                <View style={styles.videoLoading}>
                    <ActivityIndicator size={"large"}/>
                </View>
            }
              <Video
                  ref={player}
                  style={styles.video}
                  paused={videoPlay}
                // @ts-ignore
                  source={{uri: messageInfo.data.url}}
                  controls={true}
                  onFullscreenPlayerWillPresent={() => {
                    setVideoPlay(false);
                  }}
                  onFullscreenPlayerWillDismiss={() => {
                    setVideoPlay(true);
                  }}
                  onEnd={() => {
                    setVideoPlay(true);
                    if (player.current) {
                      player.current.seek(0)
                    }
                  }}
                  onBuffer={buffer}
              />
            {
              videoPlay &&
                <Image
                    style={styles.playPause}
                    resizeMode="cover"
                    source={require("../../assets/playcircle.png")}
                />
            }
          </TouchableOpacity>
      }
      {
        type === 'file' &&
          <>
              <View style={styles.fileRow}>
                  <TouchableOpacity style={styles.fileContent} onPress={fileClick}>
                      <View style={styles.fileTitle}>
                          <Text style={styles.fileNameText} numberOfLines={2}>
                            {
                              // @ts-ignore
                              messageInfo.data.name ? messageInfo.data.name : 'undefined'
                            }
                          </Text>
                        {
                          // @ts-ignore
                          messageInfo.data.size &&
                          (
                            // @ts-ignore
                            messageInfo.data.size.toString().length > 6 ?
                              <Text numberOfLines={1} style={styles.fileSize}>
                                {
                                  // @ts-ignore
                                  (messageInfo.data.size / 1000 / 1000).toFixed(1)
                                }M
                              </Text> :
                              <Text numberOfLines={1} style={styles.fileSize}>
                                {
                                  // @ts-ignore
                                  (messageInfo.data.size / 1000).toFixed(1)
                                }KB
                              </Text>
                          )
                        }
                      </View>
                      <View style={styles.fileIconRow}>
                          <Image
                              style={styles.fileIcon}
                              source={require('../../assets/fileIcon.png')}
                          />
                          <View style={styles.fileType}>
                              <Text style={styles.fileTypeText} numberOfLines={1}>.{
                                // @ts-ignore
                                messageInfo.data.name ? messageInfo.data.name.split('.')[1] : '?'
                              }</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
                { !isUser && (
                  downloading ?
                    <View style={styles.fileDown}>
                      <ActivityIndicator size="small"/>
                    </View>
                    :
                    <TouchableOpacity style={styles.fileDown} onPress={downloadFile}>
                      <SvgIcon svg={<FileDownloadSvg/>} width={10} height={12}/>
                    </TouchableOpacity>
                  )
                }
                  <ImgViews
                      visibleStatus={fileImgStatus}
                      setImgShowStatus={setFileImgStatus}
                      images={[{uri: messageInfo.data.url}]}
                      imageIndex={0}
                  />
              </View>
          </>
      }
      {
        type === 'redPacket' &&
          <TouchableOpacity onPress={clickRedPacket} style={{width: 243}}>
              <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
                              colors={['#FF8D1A', '#FF5530']}
                              style={[styles.redPacket, styles.BDRmax, {opacity: redStatus !== 2 ? 0.7 : 1}, {
                                height: 79
                              }]}>
                  <View style={styles.RPContainer}>
                    {
                      redStatus === 2 &&
                        <View style={styles.RPClose}>
                            <View style={styles.Abserlut}></View>
                            <View style={styles.RPCHead}>
                                <View style={styles.SC1}>
                                    <View style={styles.SC2}></View>
                                </View>
                            </View>
                            <View style={styles.LogoNameBox}>
                                <Text style={styles.LogoName}>FavorDAO</Text>
                            </View>
                        </View>
                    }
                    {
                      redStatus !== 2 &&
                        <View style={styles.RPOpen}>
                            <View style={styles.RPCHeadOP}>
                                <View/>
                                <View style={styles.SCOP}>
                                </View>
                            </View>
                            <View style={styles.LogoNameBox}>
                                <Text style={styles.LogoName}>FavorDAO</Text>
                            </View>
                        </View>
                    }
                      <View style={styles.RPText}>
                          <Text style={styles.Msg} numberOfLines={1} ellipsizeMode={"tail"}>
                            {
                              // @ts-ignore
                              messageInfo.customData.title
                            }
                          </Text>
                          <Text style={[styles.Received, {display: redStatus !== 2 ? 'flex' : 'none'}]}
                                numberOfLines={2}>
                            {redStatus === 1 ? 'Received' : 'The luckyPacket has expired'}
                          </Text>
                      </View>
                  </View>
              </LinearGradient>
          </TouchableOpacity>
      }
      {
         type === 'redPacket' &&
          <ClaimRes claimResStatus={claimResStatus} setClaimResStatus={setClaimResStatus} id={redPacketId}
                    senderName={senderName} setRedStatus={setRedStatus}
            // @ts-ignore
                    messageInfo={messageInfo}
          />
      }


      <Modal
        visible={fileVideoStatus}
        animationType={'slide'}
        onRequestClose={() => {
          setFileVideoStatus(false);
        }}
      >
        <View style={styles.videoModal}>
          <Pressable
            onPress={() => setFileVideoStatus(false)}
            style={styles.backButton}
          >
            <Icon type={'antdesign'} name={'left'} color={Color.color1}/>
          </Pressable>
          <View style={styles.videoBlock}>
            {
              fileVideoLoading &&
                <View style={styles.fileVideoLoading}>
                    <ActivityIndicator size={"large"}/>
                </View>
            }
            <Video
              source={{uri: messageInfo.data.url}}
              style={styles.fileVideo}
              controls={true}
              onBuffer={fileVideoBuffer}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  sendLoading: {
    marginRight: 5,
    justifyContent: 'center',
  },
  videoModal: {
    flex: 1,
    backgroundColor: '#000'
  },
  backButton: {
    marginTop: '10%',
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  videoBlock: {
    flex: 1,
    position: 'relative',
  },
  fileVideoLoading: {
    position: 'absolute',
    marginTop: '50%',
    width: '100%',
    height: 200,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileVideo: {
    marginTop: '50%',
    width: '100%',
    height: 200,
  },
  Msg: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
  },
  Received: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '400'
  },
  LogoNameBox: {
    width: 37,
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoName: {
    fontSize: 4.8,
    textAlign: 'center',
    color: '#FF5530'
  },
  RPText: {
    maxWidth: '90%',
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  SC2: {
    height: 5.5,
    width: 5.5,
    backgroundColor: "#FFB11A",
    borderRadius: 2.5
  },
  SC1: {
    height: 12.3,
    width: 12.3,
    backgroundColor: '#FF5530',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  Abserlut: {
    width: 34,
    height: 46,
    position: 'absolute',
    top: -23,
    backgroundColor: "#FFB11A",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  RPCHead: {
    width: 34,
    height: 23,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SCOP: {
    width: 25,
    height: 13,
    backgroundColor: "#FF5530",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  RPCHeadOP: {
    width: 34,
    height: 24,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FFB11A"
  },
  RPClose: {
    height: 44,
    width: 34,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'space-between'
  },
  RPOpen: {
    height: 53,
    width: 34,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: -3
  },
  RPContainer: {
    // marginLeft: 18,
    height: 48,
    display: 'flex',
    flexDirection: 'row'
  },
  redPacket: {
    width: 243,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
  },
  item: {
    marginTop: 4,
    flexDirection: 'row',
  },
  container: {
    alignSelf: 'flex-start',
    maxWidth: 256
  },
  text: {
    fontSize: 16,
    paddingTop: 7,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: "left",
    fontWeight: '400',
  },
  playPause: {
    position: 'absolute',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoBox: {
    position: 'relative',
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: 250,
    height: 200
  },
  videoLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  BDRmax: {
    borderRadius: 17
  },
  image: {
    position: 'relative',
    width: 150,
    height: 150
  },
  imageLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    zIndex: 100,
  },
  fileRow: {
    flexDirection: 'row',
  },
  fileContent: {
    width: 200,
    backgroundColor: Color.color1,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileTitle: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 15,
  },
  fileNameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  fileSize: {
    color: '#999999',
    fontWeight: '400',
    fontSize: 12,
  },
  fileIconRow: {
    position: 'relative',
    paddingLeft: 15,
  },
  fileType: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -6,
    left: '75%',
    backgroundColor: '#FF8D1A',
    borderRadius: 4,
    paddingHorizontal: 4
  },
  fileTypeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600',
  },
  fileIcon: {
    width: 30,
    height: 37,
  },
  fileDown: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: Color.color1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
});

export default ChatMsgItem;