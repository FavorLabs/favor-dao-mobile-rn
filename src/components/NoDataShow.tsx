import React from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from "react-native";

type Props = {
  image?: ImageSourcePropType,
  title?: string,
  description?: string,
}

const NoDataShow: React.FC<Props> = (props) => {
  const { image, title, description } = props;
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      resizeMode='cover'
      source={ image ? image : require('../assets/postlistNoData.png')}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 126,
    height: 126,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
    marginVertical: 10,
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    color: '#7C7C7C',
  },
})

export default NoDataShow;