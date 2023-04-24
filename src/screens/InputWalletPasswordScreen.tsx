import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const InputWalletPasswordScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>InputWalletPasswordScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default InputWalletPasswordScreen;