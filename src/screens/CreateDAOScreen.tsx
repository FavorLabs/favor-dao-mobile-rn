import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import UploadImage from "../components/UploadImage";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import SwitchButton from "../components/SwitchButton";
import DaoApi from '../services/DAOApi/Dao';
import {useResourceUrl, useUrl} from "../utils/hook";
import {useNavigation} from "@react-navigation/native";
import {DaoParams} from "../declare/api/DAOApi";
import {useDispatch} from "react-redux";
import {updateState as globalUpdateState} from "../store/global";
import {getMatchedStrings, hasWhiteSpace, sleep} from "../utils/util";
import {RegExps} from "../components/TextInputParsed";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import analytics from "@react-native-firebase/analytics";
import Favor from "../libs/favor";
import {strings} from "../locales/i18n";

const CreateDAOScreen = () => {
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
      daoName.length > 0 &&
      daoName.length < 27 &&
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
        text1: `${strings('CreateDAOScreen.Toast.optionsError')}`,
      })
    }
    if(hasWhiteSpace(daoName)) {
      return Toast.show({
        type: 'error',
        text1: `${strings('CreateDAOScreen.Toast.nameError')}`,
      })
    }
    try {
      setBtnLoading(true);
      // @ts-ignore
      const params: DaoParams = {
        name: daoName,
        introduction: daoDescription.trim(),
        avatar: daoAvatar,
        banner: daoBanner,
        visibility: daoMode,
        tags,
      }
      const { data } = await DaoApi.create(url, params);
      if(data.data) {
        Toast.show({
          type: 'info',
          text1: `${strings('CreateDAOScreen.Toast.createSuccess')}`
        });
        dispatch(globalUpdateState({
          dao: data.data,
          joinStatus: true,
          daoListStatus: true,
          newsJoinStatus: true,
        }))
        await analytics().logEvent('create_DAO', {
          platform: Platform.OS,
          networkId: Favor.networkId,
          region: Favor.bucket?.Settings.Region,
          id: data.data.id
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
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setTags(getMatchedStrings(daoDescription, RegExps.tag));
  }, [daoDescription]);

  useEffect(()=>{
    if(daoName.length > 26 ){
       Toast.show({
        type: 'error',
        text1: `${strings('CreateDAOScreen.Toast.nameLang')}`,
      })
    }
  },[daoName])
  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar title={strings('CreateDAOScreen.title')}/>
      <ScrollView style={styles.scrollWrap}>
        <TextInputBlock
          title={strings('CreateDAOScreen.NameTitle')}
          value={daoName}
          setValue={setDaoName}
          placeholder={strings('CreateDAOScreen.NamePlaceholder')}
          maxLength={20}
        />
        <TextInputParsedBlock
          title={strings('CreateDAOScreen.DAODescription')}
          value={daoDescription}
          setValue={setDaoDescription}
          multiline={true}
          // parsed={true}
          placeholder={strings('CreateDAOScreen.DAOPlaceholder')}
        />
        <UploadImage imageType={'avatar'} isShowSelector={false} setUpImage={setDaoAvatar} multiple={false}/>
        <UploadImage imageType={'banner'} isShowSelector={false} setUpImage={setBanner} multiple={false}/>
        <SwitchButton mode={daoMode} setMode={setDaoMode} />
      </ScrollView>

      <View style={[styles.instanceParent, createDisable && { opacity: 0.5 }]}>
        <TouchableOpacity onPress={createHandle}>
          <FavorDaoButton
            textValue={strings('CreateDAOScreen.CreateButton')}
            frame1171275771BackgroundColor="#ff8d1a"
            cancelColor="#fff"
            isLoading={btnLoading}
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
