import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};
const ChatScreen: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
});

export default ChatScreen;