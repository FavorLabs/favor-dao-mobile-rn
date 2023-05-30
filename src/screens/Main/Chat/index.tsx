import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CometChatGroupListWithMessages} from '../../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index'
import {Color} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";

export type Props = {};
const ChatScreen: React.FC<Props> = (props) => {
  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <CometChatGroupListWithMessages/>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
