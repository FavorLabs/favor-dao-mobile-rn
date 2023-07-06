import React from "react";
import {StyleSheet, View} from "react-native";
import { PostInfo } from "../declare/api/DAOApi";
import RowUser from "./RowUser";
import NewsBlock from "./NewsBlock";

export type Props = {
  postInfo: PostInfo;
  isQuote?: boolean;
  isReTransfer?: boolean;
  showOperate:boolean
};

const NewsContent: React.FC<Props> = (props) => {
  const { isQuote, isReTransfer, postInfo,showOperate } = props;
  const { created_on, dao, author_dao, origCreatedAt } = postInfo;
  return (
    <View style={[styles.frameParent, {backgroundColor: isQuote || isReTransfer ? '#eaeaea' : '#fff'}]}>
      <RowUser
        time={isQuote ? origCreatedAt : created_on }
        daoInfo={isQuote || isReTransfer ? author_dao : dao}
        postInfo={postInfo}
        showOperate={showOperate}
      />
      <NewsBlock postInfo={postInfo} isQuote={isQuote} isReTransfer={isReTransfer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 12
  },
});

export default NewsContent;
