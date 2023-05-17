import * as React from "react";
import {StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView} from "react-native";
import ExpandedDAOHeader from "../components/ExpandedDAOHeader";
import {Color, FontFamily, FontSize} from "../GlobalStyles";
import {useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import DaoCommunityCard from "../components/DaoCommunityCard";
import {getDebounce} from "../utils/util";
import DaoInfoHeader from "../components/DaoInfoHeader";
import PostList from "../components/PostList";
import {FeedsOfDaoNavigator} from "./Main/FeedsOfDAOs/FeedsOfDaoTabBar";
import {DaoInfo} from "../declare/api/DAOApi";

type Props = {};

const FeedsOfDAO: React.FC<Props> = (props) => {
  const route = useRoute();
  // @ts-ignore
  const { daoInfo, type } = route.params as { daoInfo: DaoInfo, type: string};

  return (
    <View style={styles.feedsOfDao}>
      <ExpandedDAOHeader daoInfo={daoInfo}/>

      <FeedsOfDaoNavigator daoInfo={daoInfo} type={type}/>

    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  feedsOfDao: {
    backgroundColor: Color.color1,
    flex: 1,
    width: "100%",
  },
});

export default FeedsOfDAO;
