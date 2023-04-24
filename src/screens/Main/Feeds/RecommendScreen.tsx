import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export type Props = {};
const RecommendScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>RecommendScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default RecommendScreen;