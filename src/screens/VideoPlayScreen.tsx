import React, {useEffect, useMemo, useState, useRef} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Pressable,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform
} from "react-native";
import VideoDetailButton from "../components/VideoDetailButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import {FontSize, FontFamily, Color, Border} from "../GlobalStyles";
import {useResourceUrl, useUrl} from "../utils/hook";
import PostApi from "../services/DAOApi/Post";
import {PostInfo} from "../declare/api/DAOApi";
import {getContent} from "../utils/util";
import Video from 'react-native-video';
import {Icon} from "@rneui/themed";
import Favor from "../libs/favor";
import SubscribeModal from "../components/SubscribeModal";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import Toast from "react-native-toast-message";
import analytics from "@react-native-firebase/analytics";
import Orientation from 'react-native-orientation-locker';

export type Props = {};
const VideoPlayScreen: React.FC<Props> = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const url = useUrl();
    const resourceUrl = useResourceUrl('images')
    const {postId} = route.params as { postId: string };
    const [videoData, setVideoData] = useState<PostInfo | null>(null);
    const [isReTransfer, setIsReTransfer] = useState<boolean>(false);
    const [subModal, setSubModal] = useState(false);
    const [seeMoreStatus, setSeeMoreStatus] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const fullScreenRef = useRef(false);

    const playable = useMemo(() => videoData?.member === 0 ? true : videoData?.dao.is_subscribed, [videoData])

    useEffect(() => {
        if (playable) {
            analytics().logEvent('video_play', {
                platform: Platform.OS,
                networkId: Favor.networkId,
                region: Favor.bucket?.Settings.Region,
                id: videoData?.id
            });
        }
    }, [playable])
    const getVideoById = async (id: string) => {
        try {
            const {data} = await PostApi.getPostById(url, id);
            const videoData = data.data;
            console.log(videoData)
            if (videoData) {
                setVisible(false);
                setVideoData(videoData);
                if (videoData.author_dao.id) setIsReTransfer(true);
                if (videoData.member !== 0 && !videoData.dao.is_subscribed) setSubModal(true);
            }
        } catch (e) {
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: e.message,
            });
            setVisible(false);
            navigation.goBack();
        }
    };

    const info = useMemo(() => {
        if (!videoData) return {};
        const obj = getContent(videoData.type === 2 || videoData.type === 3 ? videoData.orig_contents : videoData.contents);
        return {
            title: obj[1][0].content,
            description: obj[2][0].content,
            thumbnail: obj[3][0].content,
            hash: obj[4][0].content
        }
    }, [videoData])

    const seeMoreClick = () => {
        setSeeMoreStatus(!seeMoreStatus)
    }

    useEffect(() => {
        if (postId) {
            setVisible(true);
            getVideoById(postId);
        }
    }, [postId]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            Orientation.addDeviceOrientationListener((orientation) => {
                if (!fullScreenRef.current) {
                    return;
                }
                if (orientation === 'PORTRAIT' || orientation === 'PORTRAIT-UPSIDEDOWN') {
                    Orientation.lockToPortrait()
                } else if (orientation === 'LANDSCAPE-LEFT') {
                    Orientation.lockToLandscapeLeft()
                } else if (orientation === 'LANDSCAPE-RIGHT') {
                    Orientation.lockToLandscapeRight()
                }
            })
        }
        return () => {
            Orientation.removeAllListeners();
        }
    }, [])

    const subSuccess = async () => {
        await getVideoById(postId);
        setSubModal(false);
    }

    if (!videoData) return <View style={styles.loadingContent}><Text style={styles.loading}>loading...</Text></View>;

    return (
      <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.iOSSystemLabelsLightPrimary}}
                              footerStyle={{backgroundColor: Color.iOSSystemLabelsLightPrimary}}>
          <View style={styles.container}>
              <Pressable
                style={styles.wrapper}
                onPress={() => navigation.goBack()}
              >
                  <Icon type={'antdesign'} name={'left'} color={Color.color1}/>
              </Pressable>

              <View style={styles.box}>
                  <View style={styles.videoBox}>
                      {
                        !playable &&
                          <Pressable onPress={() => {
                              setSubModal(true)
                          }} style={styles.playIcon}>
                              <Icon name={'play-circle'} type={'feather'} color={'#fff'} size={50}/>
                          </Pressable>
                      }
                      <Video
                        style={styles.video}
                        source={{
                            uri: `${Favor.api}/file/${info.hash}`
                        }}
                        controls={true}
                        resizeMode="contain"
                        poster={`${resourceUrl}/${info.thumbnail}`}
                        onFullscreenPlayerWillPresent={() => {
                            fullScreenRef.current = true;
                        }}
                        onFullscreenPlayerWillDismiss={() => {
                            Orientation.lockToPortrait();
                            fullScreenRef.current = false;
                        }}
                      />
                  </View>
              </View>
              <SubscribeModal visible={subModal} setVisible={setSubModal} daoCardInfo={videoData}
                              subSuccess={subSuccess}/>
              <View style={styles.groupParent}>
                  <Text style={[styles.name, styles.largeTypo]}>
                      @{isReTransfer ? videoData?.author_dao.name : videoData?.dao.name}
                  </Text>
                  <Text style={styles.description} numberOfLines={seeMoreStatus ? undefined : 1}>
                      {info.description}
                  </Text>
                  <View style={styles.tags}>
                      {
                          Object.keys(videoData.tags).map(item => (
                            item && <Text style={[styles.tag, styles.largeTypo]} key={item}>#{item}</Text>
                          ))
                      }
                      <TouchableOpacity onPress={seeMoreClick}>
                          <Text style={[styles.tag, styles.showMore]}>
                              {seeMoreStatus ? 'Show Less' : 'See More'}
                          </Text>
                      </TouchableOpacity>
                  </View>

              </View>
              <VideoDetailButton postInfo={videoData} vSrc={info.hash!}/>
          </View>
      </BackgroundSafeAreaView>
    )
}

const styles = StyleSheet.create({
    loadingContent: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        color: Color.color1,
        fontSize: FontSize.size_xl,
        fontWeight: '600',
    },
    container: {
        backgroundColor: Color.iOSSystemLabelsLightPrimary,
        flex: 1,
    },
    wrapper: {
        // marginTop: 50,
        marginLeft: 20,
        alignItems: 'flex-start',
    },
    box: {
        flex: 1,
        justifyContent: "center",
    },
    videoBox: {
        position: 'relative',
    },
    playIcon: {
        position: "absolute",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    video: {
        height: 238,
    },
    groupParent: {
        width: '70%',
        bottom: 30,
        left: 16,
        position: "absolute",
    },
    name: {
        letterSpacing: 0,
        fontSize: FontSize.bodyBody17_size,
    },
    description: {
        marginTop: 20,
        textAlign: "left",
        fontWeight: '400',
        fontSize: FontSize.paragraphP313_size,
        color: Color.color1,
    },
    tags: {
        flexDirection: 'row'
    },
    tag: {
        marginRight: 5,
        lineHeight: 18,
        fontSize: FontSize.size_mini,
    },
    largeTypo: {
        fontWeight: '600',
        textAlign: "left",
        color: Color.color1,
    },
    showMore: {
        fontWeight: '600',
        color: Color.accentLight,
    }
});

export default VideoPlayScreen;
