import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import UploadImage from "../components/UploadImage";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import SwitchButton from "../components/SwitchButton";
import DaoApi from '../services/DAOApi/Dao';
import ImageApi from '../services/DAOApi/Image';
import {useResourceUrl, useUrl} from "../utils/hook";
import {useNavigation} from "@react-navigation/native";
import {DaoParams} from "../declare/api/DAOApi";
import {useDispatch} from "react-redux";
import {updateState as globalUpdateState} from "../store/global";
import {getMatchedStrings, sleep} from "../utils/util";
import {RegExps} from "../components/TextInputParsed";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import FavorDaoButton from "../components/FavorDaoButton";

export type Props = {};
const CreateDAOScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [daoName, setDaoName] = useState<string>('');
  const [daoDescription, setDaoDescription] = useState<string>('');
  const [daoAvatar, setDaoAvatar] = useState<string>('');
  const [daoBanner, setBanner] = useState<string>('');
  const [daoMode, setDaoMode] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const createDisable = useMemo(() => {
    return !(
      daoName &&
      daoDescription &&
      daoAvatar &&
      daoBanner
    )
  }, [daoName, daoDescription, daoAvatar, daoBanner]);

  const createHandle = async () => {
    if (btnLoading) return ;
    if (createDisable) {
      return Toast.show({
        type: 'error',
        text1: 'Please complete all options',
      })
    }
    try {
      setBtnLoading(true);
      // @ts-ignore
      const params: DaoParams = {
        name: daoName.trim(),
        introduction: daoDescription.trim(),
        avatar: daoAvatar,
        banner: daoBanner,
        visibility: daoMode,
        tags,
      }
      console.log(params,'create DAO')
      const { data } = await DaoApi.create(url, params);
      if(data.data) {
        Toast.show({
          type: 'info',
          text1: 'Create dao success!'
        });
        dispatch(globalUpdateState({
          dao: data.data,
          joinStatus: true,
        }))
        navigation.goBack();
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        });
      }
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setTags(getMatchedStrings(daoDescription, RegExps.tag));
  }, [daoDescription]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrap}>
        <FavorDaoNavBar
          title="Create DAO"
          vector={require("../assets/vector6.png")}
        />
        <TextInputBlock
          title={'Name'}
          value={daoName}
          setValue={setDaoName}
          placeholder={'Please enter a name'}
        />
        <TextInputParsedBlock
          title={'DAO description'}
          value={daoDescription}
          setValue={setDaoDescription}
          multiline={true}
          // parsed={true}
          placeholder={'Your description...'}
        />
        <UploadImage imageType={'avatar'} isShowSelector={false} setUpImage={setDaoAvatar} multiple={false}/>
        <UploadImage imageType={'banner'} isShowSelector={false} setUpImage={setBanner} multiple={false}/>
        <SwitchButton mode={daoMode} setMode={setDaoMode} />
      </ScrollView>

      <View style={[styles.instanceParent, createDisable && { opacity: 0.5 }]}>
        <TouchableOpacity onPress={createHandle}>
          <FavorDaoButton
            textValue="Create"
            frame1171275771BackgroundColor="#ff8d1a"
            cancelColor="#fff"
            isLoading={btnLoading}
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
  homeIndicator: {
    height: 34,
    marginTop: 20,
    width: 375,
  },
  instanceParent: {
    alignSelf: "stretch",
    marginTop: 20,
    marginBottom: 20,
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
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  instanceParent2: {
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center",
  },
});

export default CreateDAOScreen;