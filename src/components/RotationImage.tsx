// @ts-ignore
import React, {useMemo, useState} from "react";
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
import {Post, PostInfo} from "../declare/api/DAOApi";
import {getContent} from "../utils/util";
import {useResourceUrl} from "../utils/hook";
import {useNavigation, useRoute} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import ImgViews from "./ImgViews";

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
  const [imgIndex,setImgIndex] = useState(0)
  const [imgShowStatus,setImgShowStatus] = useState(false)
  const setImgViewsData = (infoData: Post[]) => {
    let imgData:any=[];
    infoData.forEach( (item: Post) =>{
      imgData.push({uri:`${imagesResUrl}/${item.content}`})
    })
    return imgData
  }
  const Item = (item: any) => {
    return (
      <TouchableWithoutFeedback onPress={()=>{
        setImgIndex(item.sort);
        setImgShowStatus(true);
        }
      }>
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
      <>
        <View style={styles.container}>
          <SwiperFlatList
              style={styles.swiper}
              showPagination= { info[3].length > 1 ? true : false}
              data={info[3]}
              renderItem={({ item }) => Item(item)}
          />
        </View>
        <ImgViews visibleStatus={imgShowStatus} images={setImgViewsData(info[3])} imageIndex={imgIndex} setImgShowStatus={setImgShowStatus}/>
      </>
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
