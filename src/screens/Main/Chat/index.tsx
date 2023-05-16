import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CometChatGroupListWithMessages} from '../../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index'

export type Props = {};
const ChatScreen: React.FC<Props> = (props) => {
    return (
      <View style={styles.container}>
          <CometChatGroupListWithMessages />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default ChatScreen;
