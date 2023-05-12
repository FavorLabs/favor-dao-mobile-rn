import React, {useEffect, useMemo, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import FavorDaoButton from '../components/FavorDaoButton';
import UploadImage from '../components/UploadImage';
import TextInputBlock from '../components/TextInputBlock';
import { Color, Border } from "../GlobalStyles";
import {useResourceUrl, useUrl} from "../utils/hook";
import { Post } from "../declare/global";
import { CreatePost } from "../declare/api/DAOApi";
import PostApi from "../services/DAOApi/Post";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import SwitchButton from "../components/SwitchButton";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useNavigation} from "@react-navigation/native";
import {getMatchedStrings} from "../utils/util";
import {RegExps} from "../components/TextInputParsed";

export type Props = {};
const CreateNewsScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const navigation = useNavigation();

  const [description, setDescription] = useState<string>('');
  const [imageList, setImageList] = useState([]);
  const [daoMode, setDaoMode] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);

  const { dao } = useSelector((state: Models) => state.global);

  const createDisable = useMemo(() => {
    return !(
      description
    )
  }, [description]);

  const createHandle = async () => {
    console.log('111',imageList, createDisable)
    if (createDisable) {
      return Toast.show({
        type: 'info',
        text1: 'Please complete all options',
      })
    }

    try {
      const contents: Post[] = [];
      contents.push({ content: description, type: 2, sort: 0 });
      imageList.forEach((item, index) => {
        contents.push({ content: item, type: 3, sort: index });
      });
      const postData: CreatePost = {
        contents: contents,
        dao_id: dao?.id as string,
        tags,
        type: 0,
        users: [],
        visibility: daoMode ? 0 : 1,
      };
      console.log(postData,'postData')
      const { data } = await PostApi.createPost(url, postData);
      if(data.data) {
        Toast.show({
          type: 'info',
          text1: 'Post successfully'
        });
        navigation.goBack();
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        });
      }
    }
  };

  useEffect(() => {
    if (dao) {
      setDaoMode(dao.visibility);
    }
  }, [dao]);

  useEffect(() => {
    setTags(getMatchedStrings(description, RegExps.tag));
  }, [description]);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrap}>
        <FavorDaoNavBar
          title="Create news"
          vector={require("../assets/vector6.png")}
        />
        <TextInputParsedBlock
          title={'News description'}
          value={description}
          setValue={setDescription}
          multiline={true}
          placeholder={'Your description...'}
        />
        <UploadImage imageType={'image'} isShowSelector={false} setUpImage={setImageList} multiple={true}/>
        <SwitchButton mode={daoMode} setMode={setDaoMode} />
      </ScrollView>
      <View style={[styles.instanceParent, createDisable && { opacity: 0.5 }]}>
        <TouchableOpacity onPress={createHandle}>
          <FavorDaoButton
            textValue="Post"
            frame1171275771BackgroundColor="#ff8d1a"
            cancelColor="#fff"
          />
        </TouchableOpacity>
      </View>
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
  background: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  instanceParent: {
    alignSelf: "stretch",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
});

export default CreateNewsScreen;