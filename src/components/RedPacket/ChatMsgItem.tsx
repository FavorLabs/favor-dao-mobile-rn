import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Video from 'react-native-video';
import {useResourceUrl, useUrl} from "../../utils/hook";
import LinearGradient from 'react-native-linear-gradient';
import {CometChat} from "@cometchat-pro/react-native-chat";
import SvgIcon from "../SvgIcon";
import FileDownloadSvg from "../../assets/svg/file-down-svg.svg";
import {Color} from "../../GlobalStyles";
import RedPacketApi from "../../services/RedpacketApi";
import {RedPacketInfo} from "../../declare/api/RedapacketApi";

export type Props = {
  isUser?: boolean,
  type?: string,
  messageInfo?: CometChat.BaseMessage,
  isMy?: boolean,
};

const ChatMsgItem: React.FC<Props> = (props) => {
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');
  const { isUser, type, messageInfo, isMy } = props;
  const [videoPlay,setVideoPlay] = useState(true);
  const [redStatus,setRedStatus] = useState(2);

  const VideoClick = () => {
    setVideoPlay(!videoPlay);
  };

  const clickRedPacket = () => {
    if(redStatus === 0 ) {

    } else if (redStatus === 1) {

    } else {

    }
  };

  const getRedPacketStatus = async () => {
    try {
      // @ts-ignore
      const { data } = await RedPacketApi.getRedPacketInfo(url,messageInfo.customData.id);
      const redPacket: RedPacketInfo = data.data;
      if(redPacket.total === Number(redPacket.claim_count) || Number(redPacket.claim_amount) > 0) return setRedStatus(1);
      return setRedStatus(2);
    } catch (e) {
      if(e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  useEffect(() => {
    if(type === 'redPacket') {
      getRedPacketStatus();
    }
  },[])

  // @ts-ignore
  return (
    <View style={styles.item}>
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
          <Image
              style={[styles.image, styles.BDRmax]}
              resizeMethod={"resize"}
              resizeMode={"contain"}
            // @ts-ignore
              source={{uri: messageInfo.data.url}}/>
      }
      {
        type === 'video' &&
          <TouchableOpacity style={[styles.videoBox, styles.video, styles.BDRmax]} onPress={VideoClick}>
              <Video
                  style={styles.video}
                  paused={videoPlay}
                // @ts-ignore
                  source={{uri: messageInfo.data.url}}
                  // controls={true}
              />
            {
              videoPlay &&
              <TouchableOpacity style={styles.playPause} onPress={VideoClick}>
                  <Image
                      resizeMode="cover"
                      source={require("../../assets/playcircle.png")}
                  />
              </TouchableOpacity>
            }
          </TouchableOpacity>
      }
      {
        type === 'file' &&
          <View style={styles.fileRow}>
              <View style={styles.fileContent}>
                <View>
                    <Text style={styles.fileNameText} numberOfLines={1}>
                      {
                      // @ts-ignore
                      messageInfo.data.name}
                    </Text>
                </View>
                <View style={styles.fileIconRow}>
                    <Image
                        style={styles.fileIcon}
                        source={require('../../assets/fileIcon.png')}
                    />
                    <View style={styles.fileType}>
                        <Text style={styles.fileTypeText}>.{
                          // @ts-ignore
                          messageInfo.data.name.split('.')[1]
                        }</Text>
                    </View>
                </View>
              </View>
              <TouchableOpacity style={styles.fileDown}>
                  <SvgIcon svg={<FileDownloadSvg/>} width={10} height={12}/>
              </TouchableOpacity>
          </View>
      }
      {
        type === 'redPacket' &&
          <TouchableOpacity onPress={clickRedPacket} style={[styles.redPacket,styles.BDRmax]}>
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
                          <Text style={[styles.Received, {display: redStatus !== 2 ? 'flex' : 'none'}]}>
                              Received
                          </Text>
                      </View>
                  </View>
              </LinearGradient>
          </TouchableOpacity>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  actionMsg: {},
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
    marginLeft: 15,
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
    marginLeft: 18,
    height: 48,
    display: 'flex',
    flexDirection: 'row'
  },
  redPacket: {
    width: 243,
    backgroundColor: '#FF7A00',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    opacity: 0.7
  },
  item: {
    marginTop: 4
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
  BDRmax: {
    borderRadius: 17
  },
  image: {
    width: 150,
    height: 150
  },
  fileRow: {
    flexDirection: 'row',
    maxWidth: '60%',
  },
  fileContent: {
    backgroundColor: Color.color1,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileNameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginRight: 30,
  },
  fileIconRow: {
    position: 'relative',
  },
  fileType: {
    position: 'absolute',
    bottom: -6,
    left: '30%',
    backgroundColor: '#FF8D1A',
    borderRadius: 4,
    paddingHorizontal: 4
  },
  fileTypeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600'
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