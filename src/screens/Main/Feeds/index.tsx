import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FeedsTopTabNavigator } from '../../../navigation/TopTabBar';

export type Props = {};
const FeedsScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>FeedsScreen</Text>
      <FeedsTopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default FeedsScreen;