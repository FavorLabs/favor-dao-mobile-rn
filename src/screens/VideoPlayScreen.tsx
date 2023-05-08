import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, Pressable, SafeAreaView} from "react-native";
import VideoDetailButton from "../components/VideoDetailButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import {useUrl} from "../utils/hook";
import PostApi from "../services/DAOApi/Post";
import {Post, PostInfo} from "../declare/global";
import {getContent} from "../utils/util";
// @ts-ignore
import Video from 'react-native-video';

export type Props = {};
const VideoPlayScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const url = useUrl();
  const route = useRoute();
  // @ts-ignore
  const { postId } = route.params;

  const [videoData, setVideoData] = useState<PostInfo | null>(null);
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [vSrc, setVSrc] = useState('');
  const [videoHash, setVideoHash] = useState<string>('');
  const [oracleArr, setOracleArr] = useState<string[]>([]);

  const api = 'http://192.168.100.250:1609';

  const getVideoById = async (id: string) => {
    try {
      const { data } = await PostApi.getPostById(url, id);
      if (data.data) {
        const daoId = data.data.dao.id;
        const isSelf = daoId === '644b8ab03d02093d481d0658';
        setVideoData(data.data);
        if (data.data.author_dao.id) setIsReTransfer(true);
        setIsSelf(isSelf);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const getInfo = () => {
    const obj = getContent(
      videoData?.type === 2 || videoData?.type === 3
        ? (videoData.orig_contents as Post[])
        : (videoData?.contents as Post[]),
    );
    if(obj) {
      setTitle(obj[1][0]?.content);
      setDescription(obj[2][0]?.content);
      setThumbnail(obj[3][0]?.content);
      setVSrc(obj[4][0]?.content);
    }
  };

  useEffect(() => {
    if (postId) {
      getVideoById(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (videoData) {
      getInfo();
    }
  }, [videoData]);

  useEffect(() => {
    if (vSrc) {
      if (vSrc.includes('?')) {
        const temp = vSrc.split('?');
        setVideoHash(temp[0]);
        setOracleArr([temp[1].split('=')[1]]);
      }
    }
  }, [vSrc]);

  return (
    <SafeAreaView style={styles.videoplayscreen} >
    <View style={styles.videoplayscreen}>
      {/*<Image*/}
      {/*  style={[styles.videoplayscreenChild, styles.videoplayscreenLayout]}*/}
      {/*  resizeMode="cover"*/}
      {/*  source={require("../assets/rectangle-83.png")}*/}
      {/*/>*/}
        <Video
          source = {{
            // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            uri: `${api} + '/file/' + ${vSrc}`
          }}
          resizeMode="contain"
          style={styles.video}
        />

      <View style={styles.groupParent}>
        <View style={styles.largeTitleParent}>
          <Text style={styles.largeTitle} numberOfLines={1}>{description}</Text>
        </View>
        <Text style={[styles.largeTitle2, styles.largeTypo]}># twitter</Text>
        <Text style={[styles.largeTitle3, styles.largeTypo]}>
          # google... See more
        </Text>
      </View>
      <View style={[styles.videoplayscreenInner, styles.groupWrapperLayout]}>
        <Text style={[styles.largeTitle4, styles.largeTypo]}>@{ isReTransfer ? videoData?.author_dao.name : videoData?.dao.name}</Text>
      </View>

      <View style={[styles.lineView, styles.lineViewPosition]} />
      <View style={[styles.videoplayscreenChild1, styles.lineViewPosition]} />

      <VideoDetailButton postInfo={videoData}/>

      <Pressable
        style={styles.wrapper}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.iconLayout}
          resizeMode="cover"
          source={require("../assets/group-1171275442.png")}
        />
      </Pressable>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {
    width: 375,
    height: 238,
    top: 300,
    position: "absolute",
  },
  videoplayscreenLayout: {
    width: 375,
    position: "absolute",
  },
  symbolTypo: {
    fontSize: FontSize.bodyBody17_size,
    letterSpacing: 0,
  },
  hTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    position: "absolute",
  },
  largeTypo: {
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.color1,
    position: "absolute",
  },
  groupWrapperLayout: {
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  lineViewPosition: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    top: 753,
    left: 0,
    position: "absolute",
  },
  videoplayscreenChild: {
    top: 287,
    height: 238,
    left: 0,
  },
  videoplayscreenItem: {
    top: 386,
    height: 426,
    backgroundColor: "transparent",
    left: 0,
  },
  symbol: {
    top: 1,
    left: 2,
    lineHeight: 22,
    fontFamily: FontFamily.bodyBody17,
    color: Color.iOSSystemLabelsLightSecondary,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 42,
    letterSpacing: 0,
    position: "absolute",
  },
  clearButton: {
    right: 3,
    width: 44,
    height: 44,
    top: 0,
    position: "absolute",
  },
  rightDetail: {
    height: "5.42%",
    width: "87.2%",
    top: "35.96%",
    right: "4.27%",
    bottom: "58.62%",
    left: "8.53%",
    display: "none",
    position: "absolute",
  },
  largeTitle: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    fontSize: FontSize.paragraphP313_size,
    color: Color.color1,
    lineHeight: 18,
    top: 0,
    left: 0,
    position: "absolute",
  },
  largeTitle1: {
    left: 157,
    color: Color.color1,
    lineHeight: 18,
    fontSize: FontSize.size_mini,
    top: 0,
  },
  largeTitleParent: {
    width: 172,
    height: 18,
    top: 0,
    left: 0,
    position: "absolute",
  },
  largeTitle2: {
    top: 18,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    lineHeight: 18,
    fontSize: FontSize.paragraphP313_size,
    left: 0,
  },
  largeTitle3: {
    left: 60,
    top: 18,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    lineHeight: 18,
    fontSize: FontSize.paragraphP313_size,
  },
  groupParent: {
    top: 691,
    width: 195,
    height: 36,
    left: 16,
    position: "absolute",
  },
  largeTitle4: {
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
    top: 0,
    left: 0,
  },
  groupWrapper: {
    top: 0,
    left: 0,
  },
  videoplayscreenInner: {
    top: 656,
    left: 16,
  },
  background: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  seperator: {
    marginLeft: -66.5,
    bottom: 10,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.color1,
    width: 134,
    height: 5,
    position: "absolute",
  },
  homeIndicator: {
    top: 773,
    left: -7,
    height: 34,
  },
  lineView: {
    borderColor: "#fff",
    width: 277,
  },
  videoplayscreenChild1: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    width: 376,
  },
  h: {
    marginTop: 253,
    width: "4.8%",
    top: "50%",
    left: "27.2%",
    lineHeight: 20,
    color: Color.whiteTransparent,
    letterSpacing: 0,
  },
  wrapper: {
    left: 10,
    top: 71,
    width: 24,
    height: 24,
    position: "absolute",
  },
  videoplayscreen: {
    backgroundColor: Color.iOSSystemLabelsLightPrimary,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default VideoPlayScreen;