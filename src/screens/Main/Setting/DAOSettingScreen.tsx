import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const DAOSettingScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>DAOSettingScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default DAOSettingScreen;