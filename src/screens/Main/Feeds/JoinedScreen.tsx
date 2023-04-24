import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const JoinedScreen: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>JoinedScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
});

export default JoinedScreen;