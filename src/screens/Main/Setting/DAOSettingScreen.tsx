import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from "react-native";
import DAOSettingHeader from "../../../components/DAOSettingHeader";
import DAODescriptionSection from "../../../components/DAODescriptionSection";
import ContentInfoContainer from "../../../components/ContentInfoContainer";
import ChatChannelsContainer from "../../../components/ChatChannelsContainer";
import SyncInfoContainer from "../../../components/SyncInfoContainer";
import { Color } from "../../../GlobalStyles";
import FavorDaoButton from "../../../components/FavorDaoButton";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import DaoApi from "../../../services/DAOApi/Dao";
import {updateState as globalUpdateState} from "../../../store/global";
import {useUrl} from "../../../utils/hook";
import {DaoParams} from "../../../declare/api/DAOApi";
import {getMatchedStrings} from "../../../utils/util";
import {RegExps} from "../../../components/TextInputParsed";

type Props = {};
const DAOSettingScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { dao } = useSelector((state: Models) => state.global);

  const [daoDescription, setDaoDescription] = useState<string>('');
  const [daoAvatar, setDaoAvatar] = useState<string>('');
  const [daoBanner, setBanner] = useState<string>('');
  const [daoMode, setDaoMode] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);

  const settingDao = async () => {
    try {
      const params: DaoParams & { id: string } = {
        name: dao?.name as string,
        introduction: daoDescription,
        avatar: daoAvatar,
        banner: daoBanner,
        id: dao?.id as string,
        visibility: daoMode,
        tags,
      }
      // @ts-ignore
      const { data } = await DaoApi.modifyDao(url, params);

      if(data.msg === 'success') {
        Toast.show({
          type: 'info',
          text1: 'modify dao success!'
        });

        dispatch(globalUpdateState({
          // @ts-ignore
          dao: {
            ...dao,
            ...params
          }
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
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (dao) {
      setDaoMode(dao.visibility);
      setDaoDescription(dao.introduction);
      setDaoAvatar(dao.avatar);
      setBanner(dao.banner);
    }
  },[dao])

  useEffect(() => {
    setTags(getMatchedStrings(daoDescription, RegExps.tag));
    console.log('tags', getMatchedStrings(daoDescription, RegExps.tag))
  }, [daoDescription]);


  return (
    <View style={styles.container}>
      {
        dao && <DAOSettingHeader daoBanner={daoBanner} />
      }

      { dao &&
          <ScrollView>

              <DAODescriptionSection
                daoInfo={dao}
                daoDescription={daoDescription}
                setDaoDescription={setDaoDescription}
                setDaoAvatar={setDaoAvatar}
                setBanner={setBanner}
              />

              <ContentInfoContainer daoMode={daoMode} setDaoMode={setDaoMode}/>
            {/*<ChatChannelsContainer />*/}
            {/*<SyncInfoContainer />*/}
          </ScrollView>
      }


      <View style={[styles.button]}>
        <TouchableOpacity onPress={settingDao}>
          <FavorDaoButton
            textValue="Done"
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
    backgroundColor: Color.whitesmoke_300,
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  button: {
    alignSelf: "stretch",
    // marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default DAOSettingScreen;