import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet,  ScrollView, TouchableOpacity} from 'react-native';
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

export type Props = {};
const CreateNewsScreen: React.FC<Props> = (props) => {
  const url = useUrl();

  const [description, setDescription] = useState<string>('');
  const [imageList, setImageList] = useState([]);

  const createDisable = useMemo(() => {
    return !(
      description && imageList
    )
  }, [description,imageList]);

  const createHandle = async () => {
    console.log('111',imageList)
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
        dao_id: '644b8ab03d02093d481d0658',
        tags: [],
        type: 0,
        users: [],
        visibility: 1,
      };
      console.log(postData,'postData')
      // const { data } = await PostApi.createPost(url, postData);
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        });
      }
    }
  };


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