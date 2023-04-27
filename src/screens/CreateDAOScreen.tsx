import React, { useState, useMemo } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Toast from 'react-native-toast-message';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import UploadImage from "../components/UploadImage";
import {Border, Color, FontFamily, FontSize, Padding} from "../GlobalStyles";
import SwitchButton from "../components/SwitchButton";
import DaoApi from '../services/DAOApi/Dao';
import {useUrl} from "../utils/hook";

export type Props = {};
const CreateDAOScreen: React.FC<Props> = (props) => {
  const url = useUrl();

  const [daoName, setDaoName] = useState<string>('');
  const [daoDescription, setDaoDescription] = useState<string>('');
  const [daoAvatar, setDaoAvatar] = useState<string>('');

  const createDisable = useMemo(() => {
    return !(
      daoName &&
      daoDescription &&
      daoAvatar
    )
  }, [daoName, daoDescription, daoAvatar]);

  const createHandle = async () => {
    if (createDisable) {
      return Toast.show({
        type: 'info',
        text1: 'Please complete all options',
      })
    }

    try {
      const { data } = await DaoApi.create(url, {
        name: daoName,
        introduction: daoDescription,
        avatar: daoAvatar,
        banner: '',
      });
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
          title="Create DAO"
          vector={require("../assets/vector6.png")}
        />
        <TextInputBlock
          title={'Name'}
          value={daoName}
          setValue={setDaoName}
          placeholder={'Please enter a name'}
        />
        <TextInputBlock
          title={'DAO description'}
          value={daoDescription}
          setValue={setDaoDescription}
          multiline={true}
          parsed={true}
          placeholder={'Your description...'}
        />
        <UploadImage imageType={'avatar'} isShowSelector={false} />
        <View style={styles.createDaoChild}>
          <View style={[styles.frameView, styles.groupPosition]}>
            <Text style={[styles.title6, styles.titleTypo1]}>
              Default Content Mode
            </Text>
            <SwitchButton />
          </View>
        </View>
        <View style={styles.instanceParent2}>
          <TouchableWithoutFeedback onPress={createHandle}>
            <View style={[styles.createWrapper, createDisable && { opacity: 0.5 }]}>
              <Text style={styles.create}>Create</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.homeIndicator}>
            <View style={styles.background} />
          </View>
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
    paddingTop: 119,
    marginTop: 20,
    alignItems: "center",
  },

  title6: {
    alignSelf: "stretch",
  },
  frameView: {
    width: 343,
  },
  createDaoChild: {
    height: 74,
    marginTop: 20,
    alignSelf: "stretch",
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
  titleTypo1: {
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
  },
  groupPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
});

export default CreateDAOScreen;