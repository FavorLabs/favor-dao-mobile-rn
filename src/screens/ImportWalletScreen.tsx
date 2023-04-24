import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const ImportWalletScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>ImportWalletScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ImportWalletScreen;