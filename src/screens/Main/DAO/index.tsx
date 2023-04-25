import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { DAOTopTabNavigator } from "../../../navigation/TopTabBar";

export type Props = {};
const DAOScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>DAOScreen</Text>
      <DAOTopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default DAOScreen;