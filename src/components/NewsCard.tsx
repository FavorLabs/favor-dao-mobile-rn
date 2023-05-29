import * as React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import NewsContent from "./NewsContent";
import OperationBlock from "./OperationBlock";
import { Color, Padding } from "../GlobalStyles";
import { PostInfo } from "../declare/api/DAOApi";
import VideoBlockItem from "./VideoBlockItem";
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";

export type Props = {
  postInfo: PostInfo;
};

const NewsCard: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const { contents, orig_contents, type, orig_type, dao } = postInfo;
  const navigation = useNavigation();

  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : dao , type : 'Mixed'});
    event.stopPropagation();
  };

  return (
    <View style={styles.feedsJoinedInner}>
      <View style={styles.groupParent}>
        {
          !contents &&
            <TouchableOpacity onPress={toDaoCommunity}>
              <View style={styles.retransRow}>
                <Image source={require('../assets/reTransFerIcon.png')} style={styles.retransImg}/>
                <Text style={styles.daoName} numberOfLines={1}>{dao.name}</Text>
                <Text style={styles.retranText}>retransfer this</Text>
              </View>
            </TouchableOpacity>
        }

        {
          contents?.length &&
            <NewsContent postInfo={postInfo} />
        }

        {
          orig_contents?.length ?
            orig_type === 0 ? <NewsContent postInfo={postInfo} isQuote={true}/>
              : orig_type === 1 ? <VideoBlockItem postInfo={postInfo} isQuote={true}/> : <></>
            : <></>
        }

        <OperationBlock postInfo={postInfo} type={contents?.length && orig_contents?.length ? 0 : orig_type}/>
        <View style={styles.frameChild} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedsJoinedInner: {
    paddingHorizontal: 0,
    alignItems: "center",
    alignSelf: "stretch",
  },
  groupParent: {
    paddingTop: 10,
    backgroundColor: Color.color1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
  retransImg: {
    width: 24,
    height: 20,
  },
  retransRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Padding.p_base,
    paddingVertical: 10,
  },
  daoName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    marginHorizontal: 5,
  },
  retranText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#999'
  }
});

export default NewsCard;
