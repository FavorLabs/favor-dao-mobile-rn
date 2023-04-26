import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import UploadImage from '../components/UploadImage';

export type Props = {};
const CreateNewsScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <FavorDaoNavBar
        title="Create news"
        vector={require("../assets/vector6.png")}
      />
      <Text>TextareaBlock</Text>
      <UploadImage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
});

export default CreateNewsScreen;