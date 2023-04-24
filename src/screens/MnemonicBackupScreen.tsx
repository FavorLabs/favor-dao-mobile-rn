import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const MnemonicBackupScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>MnemonicBackupScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default MnemonicBackupScreen;