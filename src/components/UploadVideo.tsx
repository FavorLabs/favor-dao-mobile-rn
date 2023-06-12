import React, {useEffect, useState} from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {Color, Padding, Border, FontFamily, FontSize} from "../GlobalStyles";
import UploadBlockTitle from "./UploadBlockTitle";
import Api from '../services/NodeApi';
import Models from "../declare/storeTypes";
import Toast from 'react-native-toast-message';
import ImagePicker, {Video} from 'react-native-image-crop-picker';
import {LocalStorage, SessionStorage} from '../utils/storage';
import {getSize, getProgress, stringToBinary, omitAddress} from '../utils/util';
import {decode} from 'base-64';
import Favor from "../libs/favor";
import {WebsocketProvider} from "web3-core";
import {Config} from "../declare/global";
import Events from "events";
import * as VideoThumbnails from 'expo-video-thumbnails';
import ImageApi from "../services/DAOApi/Image";
import {useResourceUrl} from "../utils/hook";
import LoadingSpinner from "./LoadingSpinner";

export type Props = {
  setVideo: React.Dispatch<React.SetStateAction<string>>;
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  autoThumbnail: string;
  setAutoThumbnail: React.Dispatch<React.SetStateAction<string>>;
};
type UploadResolve = (value: { text: string; overlay: string }) => void;
type downloadWsResItem = {
  Bitvector: {
    len: number;
    b: string;
  };
  Overlay: string;
  RootCid: string;
};
type FavorType = {
  api: string;
  debugApi: string;
  ws: WebsocketProvider & Events;
  config: Config;
}

const UploadVideo: React.FC<Props> = (props) => {
  const {setVideo, thumbnail, setThumbnail, autoThumbnail, setAutoThumbnail} = props;
  const dispatch = useDispatch();
  const imagesResUrl = useResourceUrl('images');

  const [showSelect, setShowSelect] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(100);
  const [statusTip, setStatusTip] = useState<string>('');
  const [videoName, setVideoName] = useState<string>('');
  const [videoSize, setVideoSize] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(0);

  // const { api, debugApi, ws, config } = useSelector((state: Models) => state.global);
  // @ts-ignore
  const {api, debugApi, ws, config} = Favor as FavorType;

  useEffect(() => {
    // dispatch({
    //   type: 'global/updateState',
    //   payload: {
    //     ws: null
    //   }
    // })
  }, []);

  const init = () => {
    setProgressValue(0);
    setAutoThumbnail('');
    setVideoName('');
    setVideoSize(0);
    setShowSelect(true);
    setThumbnail('');
    setVideo('');
  };

  const pickVideo = async () => {
    init();
    ImagePicker.openPicker({
      mediaType: "video",
      compressVideoPreset: 'Passthrough'
    }).then(async video => {
      setShowSelect(false);
      console.log('video', video);
      if (!checkVideoSize(video)) return;
      setVideoName(video.filename as string);
      setVideoSize(video.size);
      setVideoDuration(video.duration);

      await generateThumbnail(video.path);
      // @ts-ignore
      uploadVideo(video);
    }).catch(() => {
      init();
    });

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

  const generateThumbnail = async (videoURL: any) => {
    try {
      const uri = await VideoThumbnails.getThumbnailAsync(
        videoURL,
        {
          time: videoDuration ? videoDuration >= 15000 ? 15000 : 1000 : 1000,
        }
      );
      console.log("uri", uri);
      let imgName = uri.uri.split('/').pop();
      setAutoThumbnail(uri?.uri?.toString());
      let file = {uri: uri?.uri?.toString(), type: 'image/jpg', name: imgName};
      let fmData = new FormData();
      // @ts-ignore
      fmData.append('thumbnail', file);
      const {data} = await ImageApi.upload(imagesResUrl, fmData);
      setThumbnail(data.id);
    } catch (e) {
      console.warn(e);
    }
  };

  const uploadToStorageNode = async (hash: string, len: number) => {
    if (!config) return;
    let connected: string[] = [];
    let bad: any = {};
    let overlay: string;
    let storageResult: string;
    let downloadResult: string;

    let storageTimer: NodeJS.Timer | null = null;
    let downloadTimer: NodeJS.Timer | null = null;
    if (!ws) throw new Error('Websocket not connected');

    return new Promise((resolve: UploadResolve, reject) => {
      const downloadFailed = () => {
        bad[overlay] = bad[overlay] ? ++bad[overlay] : 1;
        ws.emit('choiceOverlay');
      };
      const groupSubscribe = () => {
        console.log('groupSubscribe');
        ws.send(
          {
            id: 1,
            jsonrpc: '2.0',
            method: 'group_subscribe',
            params: ['peers', config.storeGroup],
          },
          (err, res) => {
            if (err || res?.error) {
              return reject(err || res?.error?.message);
            }
            if (!res) {
              return reject('JsonPpcResponse is undefined');
            }
            storageResult = res.result;
            console.log('storageResult', storageResult);
            storageTimer = setTimeout(() => {
              reject('Failed to connect to the P2P network');
            }, 1000 * 20);
            ws.on(storageResult, async (res: any) => {
              console.log('storageArr', res);
              connected = res.connected ? res.connected : [];
              if (connected.length && storageTimer) {
                clearTimeout(storageTimer);
                storageTimer = null;
                ws.emit('choiceOverlay');
              }
            });
          },
        );
      };
      const choiceOverlay = async () => {
        console.log('choiceOverlay')
        if (bad[overlay] === 1) {
          try {
            await Api.connect(debugApi, overlay);
          } catch (e) {
            downloadFailed();
            return;
          }
        }
        overlay = connected.filter((item) => bad[item] < 2 || !bad[item])[0];
        console.log('overlay', overlay);
        if (!overlay) {
          reject('Failed to connect to the P2P network');
          return;
        }
        if (downloadResult) {
          setStatusTip('Switching nodes for upload');
        }
        let res = null;
        try {
          res = await Api.sendMessage(
            api,
            debugApi,
            overlay,
            hash,
            config.storeGroup,
          );
          console.log('sendMessage', res.data);
        } catch (e) {
          downloadFailed();
          return;
        }
        // let data = JSON.parse(window.atob(res.data.data));
        let data = JSON.parse(decode(res.data.data));
        console.log('message', data);
        const p = getProgress(
          stringToBinary(data.vector.b, data.vector.len),
          len,
        );
        setProgressValue(p);
        console.log('progress', p);
        if (p === 100) {
          resolve({
            text: 'Upload successful',
            overlay,
          });
          return;
        }
        console.log('downloadResult====', downloadResult);
        if (!downloadResult) {
          ws.emit('chunkInfoSubscribe');
        }
      };
      const chunkInfoSubscribe = () => {
        console.log('chunkInfoSubscribe')
        ws.send(
          {
            id: 3,
            jsonrpc: '2.0',
            method: 'chunkInfo_subscribe',
            params: ['retrievalProgress', hash],
          },
          (err, res) => {
            console.log('downloadResult', res);
            if (err || res?.error) {
              reject(err || res?.error?.message);
              return;
            }
            downloadResult = res?.result;
            ws.emit('download');
          },
        );
      };
      const download = () => {
        console.log('start download');
        downloadTimer = setTimeout(() => {
          downloadFailed();
        }, 1000 * 20);
        ws.on(downloadResult, async (res: downloadWsResItem[]) => {
          console.log('download', res);
          let downloadData = res.find((item) => item.Overlay === overlay);
          if (!downloadData) return;
          setStatusTip('Uploading the file to the P2P storage node');
          // @ts-ignore
          clearTimeout(downloadTimer);
          downloadTimer = setTimeout(() => {
            downloadFailed();
          }, 1000 * 20);
          const p = getProgress(
            stringToBinary(
              downloadData.Bitvector.b,
              downloadData.Bitvector.len,
            ),
            len,
          );
          setProgressValue(p);
          console.log('progress', p);
          if (p === 100) {
            resolve({
              text: 'Upload successful',
              overlay,
            });
          }
        });
      };
      ws.on('groupSubscribe', groupSubscribe);
      ws.on('choiceOverlay', choiceOverlay);
      ws.on('chunkInfoSubscribe', chunkInfoSubscribe);
      ws.on('download', download);
      setStatusTip('Uploading the file to the P2P storage node');
      ws.emit('groupSubscribe');
    }).finally(() => {
      if (storageResult) {
        ws.send(
          {
            id: 1,
            jsonrpc: '2.0',
            method: 'group_unsubscribe',
            params: [storageResult],
          },
          () => {
          },
        );
      }
      if (downloadResult) {
        ws.send(
          {
            id: 4,
            jsonrpc: '2.0',
            method: 'chunkInfo_unsubscribe',
            params: [downloadResult],
          },
          () => {
          },
        );
      }
      ws.removeAllListeners('groupSubscribe');
      ws.removeAllListeners('choiceOverlay');
      ws.removeAllListeners('chunkInfoSubscribe');
      ws.removeAllListeners('download');
    });
  };

  const uploadVideo = async (video: Video) => {
    try {
      setUploading(true);
      setStatusTip('Uploading the file to local node');

      await Api.observeStorageGroup(api, config.storeGroup, config.storeNodes);

      console.log(video.filename)
      let response = await Api.uploadFile(api, video.path, video.mime, video.filename);
      let hash: string = JSON.parse(response.body).reference
      console.log('hash', hash);

      let uploadedList = JSON.parse(
        SessionStorage.getItem('uploaded_list') || '{}',
      );
      let uploadOverlay = uploadedList[hash];
      console.log('uploadOverlay', uploadOverlay);
      if (!uploadOverlay) {
        let fileInfo = await Api.getFileInfo(api, hash);
        let len: number = fileInfo.data.list[0].bitVector.len;
        // @ts-ignore
        const {text, overlay} = await uploadToStorageNode(hash, len);
        setStatusTip(text);
        Toast.show({type: 'success', text1: text});
        uploadOverlay = overlay;
        uploadedList[hash] = overlay;
        SessionStorage.setItem('uploaded_list', JSON.stringify(uploadedList));
      } else {
        setProgressValue(100);
        setStatusTip('Upload successful');
        Toast.show({type: 'success', text1: 'Upload successful'});
      }
      setVideo(`${hash}?oracles=${uploadOverlay}`);
    } catch (e) {
      setProgressValue(0);
      Toast.show({type: 'error', text1: e instanceof Error ? e.message : JSON.stringify(e)});
      setVideo('');
      // setShowVideoList(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.groupParent}>
      <UploadBlockTitle type={'video'} isShowSelector={false}/>

      {showSelect ? <>
        <View style={styles.uploadWrap}>
          <View style={styles.uploadIconTips}>
            <TouchableOpacity style={styles.iconTips} onPress={pickVideo}>
              <Image
                resizeMode="cover"
                source={require("../assets/uploadcloud2.png")}
              />
              <Text style={styles.tips}>
                Upload Video
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </> : <>
        <View style={[styles.groupWrapper, styles.groupLayout]}>
          <View style={[styles.groupContainer, styles.groupLayout]}>
            <View style={[styles.groupContainer, styles.groupLayout]}>
              <View style={[styles.groupContainer, styles.groupLayout]}>
                <View style={[styles.groupChild, styles.groupLayout]}/>
              </View>
            </View>
            <View style={[styles.frameView, styles.buttonFlexBox]}>
              {autoThumbnail ? <>
                <Image
                  style={styles.frameChild}
                  resizeMode="cover"
                  source={{uri: autoThumbnail}}
                />
              </> : <>
                <View style={[styles.frameChild, {backgroundColor: Color.lightGrayscaleContent3}]}></View>
              </>}
              <View style={[styles.xBasefileStateWrapper, styles.basefileLayout]}>
                <View style={[styles.xBasefileState, styles.basefileLayout]}>
                  <View style={styles.drop}>
                    <LoadingSpinner isLoading={uploading}/>
                    <Text style={[styles.text2, styles.secTypo]}>
                      {videoName ? omitAddress(videoName, 5, 6) : ''}
                    </Text>
                    <View style={[styles.counter1, styles.counterBorder]}>
                      <Text style={[styles.text1, styles.textFlexBox]}>
                        {getSize(videoSize)}
                      </Text>
                    </View>
                    <Image
                      style={[styles.rightIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../assets/right-icon.png")}
                    />
                  </View>
                  <Text style={[styles.sec, styles.secTypo]}>{progressValue.toFixed(2)}% / {statusTip}</Text>
                  <TouchableOpacity onPress={init}>
                    <Image
                      style={[styles.cancelIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../assets/cancel.png")}
                    />
                  </TouchableOpacity>
                  <View style={styles.determinateline}>
                    <View style={[styles.view, {right: `${100 - progressValue}%`}]}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    flexDirection: "row",
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "center",
    color: Color.lightGrayscaleContent1,
  },
  counterBorder: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_9xs,
    borderRadius: Border.br_77xl,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    alignItems: "center",
  },
  iconLayout1: {
    height: 16,
    width: 16,
  },
  groupLayout: {
    height: 106,
    width: 343,
    left: 0,
    position: "absolute",
  },
  basefileLayout: {
    height: 60,
    width: 232,
  },
  secTypo: {
    fontWeight: '400',
    lineHeight: 20,
    textAlign: "left",
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  title: {
    top: 3,
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    fontWeight: '600',
    letterSpacing: 0,
    left: 0,
    width: 341,
    position: "absolute",
  },
  text: {
    fontWeight: "500",
    marginLeft: 4,
    lineHeight: 20,
    textAlign: "center",
    color: Color.lightGrayscaleContent1,
    fontSize: FontSize.paragraphP313_size,
  },
  text1: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    letterSpacing: 0.4,
    lineHeight: 16,
    textTransform: "uppercase",
    textAlign: "center",
    color: Color.lightGrayscaleContent1,
    fontWeight: '600',
  },
  counter: {
    backgroundColor: Color.lightGrayscaleContent3,
    display: "none",
    marginLeft: 4,
  },
  icon1: {
    marginLeft: 4,
  },
  button1: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_9xs,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    backgroundColor: Color.color1,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    right: 0,
    top: 0,
  },
  titleParent: {
    left: 2,
    height: 28,
    width: 341,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    width: 343,
    top: 0,
  },
  groupContainer: {
    top: 0,
  },
  frameChild: {
    width: 69,
    height: 71,
    borderRadius: 10
  },
  text2: {
    fontSize: FontSize.size_mini,
    color: Color.color4,
    marginLeft: 8,
    fontWeight: '400',
    letterSpacing: 0,
  },
  counter1: {
    backgroundColor: Color.lightGrayscaleBackgroundSecondary,
    marginLeft: 8,
  },
  rightIcon: {
    marginLeft: 8,
    display: "none",
  },
  drop: {
    top: 2,
    overflow: "hidden",
    borderRadius: Border.br_5xs,
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  sec: {
    top: 40,
    color: Color.lightGrayscaleContent3,
    fontSize: FontSize.size_2xs,
    fontWeight: '400',
    left: 0,
    position: "absolute",
  },
  cancelIcon: {
    top: 4,
    right: 0,
    position: "absolute",
    width: 20,
  },
  view: {
    right: 162,
    backgroundColor: Color.limegreen_100,
    borderRadius: Border.br_237xl,
    top: "50%",
    marginTop: -2,
    height: 4,
    left: 0,
    position: "absolute",
  },
  determinateline: {
    top: 32,
    backgroundColor: Color.limegreen_200,
    height: 4,
    overflow: "hidden",
    borderRadius: Border.br_5xs,
    right: 0,
    left: 0,
    position: "absolute",
  },
  xBasefileState: {
    overflow: "hidden",
    left: 0,
    width: 232,
    top: 0,
    position: "absolute",
  },
  xBasefileStateWrapper: {
    marginLeft: 10,
  },
  frameView: {
    top: 18,
    left: 18,
    alignItems: "center",
  },
  groupWrapper: {
    top: 42
  },
  groupParent: {
    alignSelf: "stretch",
    height: 142,
    marginTop: 20,
  },

  uploadWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  uploadIconTips: {
    width: '100%',
    paddingVertical: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1
  },
  iconTips: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.color4,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 8
  }
});

export default UploadVideo;
