// @ts-ignore
import React, { useMemo } from "react";
import {Image, StyleSheet, ImageSourcePropType, FlatList,View, Text} from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export type Props = {
  imageArr: any[]
};

const RotationImage: React.FC<Props> = (props) => {
  const { imageArr } = props;

  const Item = (item: any) => {
    return (
        <Image
            style={[styles.groupChild]}
            resizeMode="cover"
            source={item}
        />
    )
  }

  return (
      <View style={styles.container}>
        <SwiperFlatList
            // autoplay
            // autoplayDelay={1}
            autoplayLoop
            showPagination
            data={imageArr}
            renderItem={({ item }) => Item(item)}
            vertical={false}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupChild: {
    position: "absolute",
    // height: "60.69%",
    // width: "100%",
    // top: "39.31%",
    // right: "0%",
    bottom: "0%",
    // left: "0%",
    // maxWidth: "100%",
    // overflow: "hidden",
    // maxHeight: "100%",
    flex: 1,
  },
});

export default RotationImage;
