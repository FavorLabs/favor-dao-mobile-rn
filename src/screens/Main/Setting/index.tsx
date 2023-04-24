import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const SettingScreen: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
});

export default SettingScreen;