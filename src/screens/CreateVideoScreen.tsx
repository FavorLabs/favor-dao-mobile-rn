import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import TextInputBlock from "../components/TextInputBlock";
import UploadVideo from "../components/UploadVideo";
import UploadImage from "../components/UploadImage";
import SingleChoice from "../components/SingleChoice";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import Toast from "react-native-toast-message";
import { CreatePost, Post } from '../declare/api/DAOApi';
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import PostApi from '../services/DAOApi/Post';
import {useUrl} from "../utils/hook";
import { eventEmitter } from '../utils/util';
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {StackNavigationProp} from "@react-navigation/stack";
import SwitchButton from "../components/SwitchButton";

export type Props = {};
const CreateVideoScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDesc, setVideoDesc] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [autoThumbnail, setAutoThumbnail] = useState<string>('');
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [daoMode, setDaoMode] = useState<number>(0);

  // const { userInfo } = useSelector((state: Models) => state.dao);
  const { dao } = useSelector((state: Models) => state.global);

  const createDisable = useMemo(() => {
    return !(
      videoTitle && videoDesc && video && thumbnail
    )
  }, [videoTitle, videoDesc, video, thumbnail]);

  const createHandle = async () => {
    if (postLoading) return;
    if (createDisable) {
      return Toast.show({
        type: 'info',
        text1: 'Please complete all options',
      })
    }

    setPostLoading(true);
    try {
      const contents: Post[] = [];
      contents.push({ content: videoTitle, type: 1, sort: 0 });
      contents.push({ content: videoDesc, type: 2, sort: 0 });
      contents.push({ content: thumbnail, type: 3, sort: 0 });
      contents.push({ content: video, type: 4, sort: 0 });
      const postData: CreatePost = {
        contents: contents,
        dao_id: dao?.id as string,
        tags: [],
        type: 1,
        users: [],
        visibility: daoMode,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        Toast.show({
          type: 'success',
          text1: 'Post successfully'
        })
        eventEmitter.emit('menuRefreshRecommend');
        navigation.navigate(Screens.Main.Feeds);
      }
    } catch (e) {
      if (e instanceof Error) Toast.show({ type: 'error', text1: e.message });
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrap}>
        <FavorDaoNavBar
          title="Create Video"
          vector={require("../assets/vector6.png")}
        />
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
        <UploadVideo setVideo={setVideo} thumbnail={thumbnail} setThumbnail={setThumbnail} autoThumbnail={autoThumbnail} setAutoThumbnail={setAutoThumbnail} />
        <UploadImage imageType={'thumbnail'} setUpImage={setThumbnail} autoThumbnail={autoThumbnail} />
        <SingleChoice />
        <SwitchButton mode={daoMode} setMode={setDaoMode} />
        <View style={[styles.instanceParent, createDisable && { opacity: 0.5 }]}>
          <TouchableOpacity onPress={createHandle}>
            <View style={[styles.createWrapper, styles.wrapperFlexBox]}>
              <Text style={styles.create}>Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
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
    alignSelf: "stretch",
    alignItems: "center",
  },
});

export default CreateVideoScreen;