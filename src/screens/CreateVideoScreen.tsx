import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const CreateVideoScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CreateVideoScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default CreateVideoScreen;