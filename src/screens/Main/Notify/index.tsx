import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotifyTopTabNavigator} from "../../../navigation/TopTabBar";

export type Props = {};
const NotifyScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>NotifyScreen</Text>
      <NotifyTopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default NotifyScreen;