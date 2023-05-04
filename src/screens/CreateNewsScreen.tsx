import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Toast from 'react-native-toast-message';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import FavorDaoButton from '../components/FavorDaoButton';
import UploadImage from '../components/UploadImage';
import TextInputBlock from '../components/TextInputBlock';
import { Color, Border } from "../GlobalStyles";
import {useResourceUrl, useUrl} from "../utils/hook";

export type Props = {};
const CreateNewsScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');

  const [description, setDescription] = useState<string>('');

  return (
    <View style={styles.container}>
      <FavorDaoNavBar
        title="Create news"
        vector={require("../assets/vector6.png")}
      />
      <TextInputBlock
        title={'News description'}
        value={description}
        setValue={setDescription}
        multiline={true}
        parsed={true}
        placeholder={'Your description...'}
      />
      <UploadImage imageType={'image'} />
      <View style={styles.instanceParent}>
        <FavorDaoButton
          textValue="Post"
          frame1171275771BackgroundColor="#ff8d1a"
          cancelColor="#fff"
        />
        <View style={styles.homeIndicator}>
          <View style={styles.background} />
          <View style={styles.seperator} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
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
  seperator: {
    marginLeft: -66.5,
    bottom: 10,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.iOSSystemLabelsLightPrimary,
    width: 134,
    height: 5,
    position: "absolute",
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
});

export default CreateNewsScreen;