import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Props = {};
const InputWalletPasswordScreen: React.FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>InputWalletPasswordScreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
});

export default InputWalletPasswordScreen;