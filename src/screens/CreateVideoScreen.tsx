import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import TextInputBlock from "../components/TextInputBlock";
import UploadVideo from "../components/UploadVideo";
import UploadImage from "../components/UploadImage";
import SingleChoice from "../components/SingleChoice";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import Toast from "react-native-toast-message";
import {CreatePost, Post} from '../declare/api/DAOApi';
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import PostApi from '../services/DAOApi/Post';
import {useUrl} from "../utils/hook";
import {eventEmitter, getMatchedStrings} from '../utils/util';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import SwitchButton from "../components/SwitchButton";
import {RegExps} from "../components/TextInputParsed";
import FavorDaoButton from "../components/FavorDaoButton";
import {updateState as globalUpdateState} from "../store/global";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import analytics from "@react-native-firebase/analytics";
import Favor from "../libs/favor";

export type Props = {};
const CreateVideoScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch()

  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDesc, setVideoDesc] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [autoThumbnail, setAutoThumbnail] = useState<string>('');
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [daoMode, setDaoMode] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [member, setMember] = useState<number>(0);

  // const { userInfo } = useSelector((state: Models) => state.dao);
  const {dao} = useSelector((state: Models) => state.global);

  const createDisable = useMemo(() => {
    return !(
      videoTitle && videoDesc && video && thumbnail
    )
  }, [videoTitle, videoDesc, video, thumbnail]);

  const createHandle = async () => {
    console.log('videoTitle, videoDesc, video, thumbnail', videoTitle, videoDesc, video, thumbnail)
    if (postLoading) return;
    if (createDisable) {
      return Toast.show({
        type: 'info',
        text1: 'Please complete all options',
      })
    }

    try {
      setPostLoading(true);
      const contents: Post[] = [];
      contents.push({content: videoTitle, type: 1, sort: 0});
      contents.push({content: videoDesc, type: 2, sort: 0});
      contents.push({content: thumbnail, type: 3, sort: 0});
      contents.push({content: video, type: 4, sort: 0});
      const postData: CreatePost & { member: number } = {
        contents: contents,
        dao_id: dao?.id as string,
        tags,
        type: 1,
        users: [],
        visibility: daoMode ? 2 : 1,
        member
      };
      const {data} = await PostApi.createPost(url, postData);
      if (data.data) {
        Toast.show({
          type: 'success',
          text1: 'Post successfully'
        })
        eventEmitter.emit('menuRefreshRecommend');
        dispatch(globalUpdateState({
          joinStatus: true,
          newsJoinStatus: true
        }));
        await analytics().logEvent('create_post', {
          platform: Platform.OS,
          networkId: Favor.networkId,
          region: Favor.bucket?.Settings.Region,
          id: data.data.id
        });
        navigation.goBack();
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({type: 'error', text1: e.message});
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    if (dao) {
      setDaoMode(dao.visibility);
    }
  }, [dao]);

  useEffect(() => {
    setTags(getMatchedStrings(videoDesc, RegExps.tag));
  }, [videoDesc]);

  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar
          title="Create Video"
          vector={require("../assets/vector6.png")}
        />
        <ScrollView style={styles.scrollWrap}>
          <TextInputBlock
            title={'Video title'}
            value={videoTitle}
            setValue={setVideoTitle}
            placeholder={'Title of video'}
          />
          <TextInputParsedBlock
            title={'Video description'}
            value={videoDesc}
            setValue={setVideoDesc}
            placeholder={'Video description with # @...'}
            multiline={true}
          />
          <UploadVideo setVideo={setVideo} thumbnail={thumbnail} setThumbnail={setThumbnail}
                       autoThumbnail={autoThumbnail} setAutoThumbnail={setAutoThumbnail}/>
          <UploadImage imageType={'thumbnail'} setUpImage={setThumbnail} autoThumbnail={autoThumbnail}
                       multiple={false}/>
          <SingleChoice member={member} setMember={setMember}/>
          <SwitchButton mode={daoMode} setMode={setDaoMode}/>
        </ScrollView>

        <View style={[styles.instanceParent, createDisable && {opacity: 0.5}]}>
          <TouchableOpacity onPress={createHandle}>
            <FavorDaoButton
              textValue="Post"
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
              isLoading={postLoading}
            />
          </TouchableOpacity>
        </View>

      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  scrollWrap: {
    flex: 1,
  },
  wrapperFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  create: {
    color: Color.color1,
    fontWeight: '600',
    textAlign: "center",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
  },
  createWrapper: {
    borderRadius: Border.br_29xl,
    backgroundColor: Color.color,
    paddingHorizontal: Padding.p_124xl_5,
    paddingVertical: Padding.p_sm,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  instanceParent: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default CreateVideoScreen;
