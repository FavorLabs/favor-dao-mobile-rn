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
  const { daoInfo, type } = route.params as { daoInfo: DaoInfo};
  const [activeOption, setActiveOption] = useState<number>(0);
  const activeList = ['Mixed','News','Videos'];
  const objParams = {
    daoInfo: daoInfo,
    activeOption: activeOption
  } as { daoInfo: DaoInfo, activeOption: number};

  const onActiveHandle = (index:number) => {
    setActiveOption(index);
  };

  useEffect(() => {
    if(type === 'News'){
      setActiveOption(1);
    } else if(type === 'Videos') {
      setActiveOption(2)
    } else {
      setActiveOption(0);
    }
  },[type])

  return (
    // <SafeAreaView style={styles.safeAreaView} >
    <View style={styles.feedsOfDao}>
      <ExpandedDAOHeader daoInfo={daoInfo}/>

      <FeedsOfDaoNavigator daoInfo={daoInfo}/>

    </View>
    // </SafeAreaView>
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
  select: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  option: {
    height: 30,
    paddingHorizontal: 11,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    fontFamily: FontFamily.headingH613,
    fontWeight: "600",
    color: '#939393',
    fontSize: FontSize.size_sm
  },
  active: {
    backgroundColor: '#FF8D1A',
    borderRadius: 14,
  },
  activeText: {
    color: Color.color1
  },
  daoUnderLine: {
    borderBottomWidth: 1,
    borderColor: '#E6E5EB',
  }
});

export default FeedsOfDAO;
