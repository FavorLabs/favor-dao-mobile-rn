import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {PostInfo} from "../declare/api/DAOApi";
import NewsDescription from "./NewsDescription";
import RotationImage from "./RotationImage";
import {getContent} from "../utils/util";
import Screens from "../navigation/RouteNames";
import {useNavigation, useRoute} from "@react-navigation/native";

type Props = {
  postInfo: PostInfo
  isQuote?: boolean
  isReTransfer?: boolean
}

const NewsBlock: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer } = props;
  const {  contents, orig_contents } = props.postInfo;
  const info = getContent(isQuote || isReTransfer ? orig_contents : contents);
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;

  const toPostDerail = () => {
    if(routeName !== Screens.PostDetail) {
      // @ts-ignore
      navigation.navigate(Screens.PostDetail,{ postId:  isQuote ? props.postInfo.ref_id : props.postInfo.id});
    }
  };

  return(
    <View>
      <TouchableOpacity onPress={toPostDerail} style={styles.text}>
        <NewsDescription postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
      </TouchableOpacity>

      {
        info[3] && <RotationImage postInfo={props.postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingBottom: 12
  }
});

export default NewsBlock;