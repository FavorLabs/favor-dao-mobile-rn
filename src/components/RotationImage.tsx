// @ts-ignore
import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {PostInfo} from "../declare/api/DAOApi";
import {getContent} from "../utils/util";
import {useResourceUrl} from "../utils/hook";
import {useNavigation, useRoute} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";

export type Props = {
  postInfo: PostInfo;
  isQuote?: boolean | undefined;
  isReTransfer?: boolean;
  toPostDerail?: () => void;
};

const RotationImage: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer, toPostDerail } = props;
  const { contents, orig_contents } = props.postInfo;
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);
  const imagesResUrl = useResourceUrl('images');

  const Item = (item: any) => {
    return (
      <TouchableWithoutFeedback onPress={()=> toPostDerail?.()}>
        <View style={styles.slide}>
          <Image
              style={styles.images}
              resizeMode='cover'
              source={{uri: `${imagesResUrl}/${item.content}`}}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
      <View style={styles.container}>
        <SwiperFlatList
            // autoplay
            // autoplayDelay={1}
            // autoplayLoop
            style={styles.swiper}
            showPagination= { info[3].length > 1 ? true : false}
            data={info[3]}
            renderItem={({ item }) => Item(item)}
            // vertical={false}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    // marginTop: 10,
  },
  swiper: {
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: '100%',
  },
  images: {
    width: '100%',
    height: '100%',
  },
});

export default RotationImage;
