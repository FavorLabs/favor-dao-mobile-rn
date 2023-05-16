import React from 'react';
import {StyleSheet, View, Image, Text} from "react-native";

type Props = {

}

const NoDataShow: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      resizeMode='cover'
      source={require('../assets/noDataIcon.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 240,
    height: 190,
  }
})

export default NoDataShow;