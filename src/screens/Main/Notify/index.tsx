import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotifyTopTabNavigator} from "../../../navigation/TopTabBar";

export type Props = {};
const NotifyScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <NotifyTopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

export default NotifyScreen;