import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Props = {};
const DAOSettingScreen: React.FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>DAOSettingScreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
});

export default DAOSettingScreen;