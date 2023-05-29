import * as React from "react";
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from "react-native";
import ExpandedDAOHeader from "../components/ExpandedDAOHeader";
import {Color, FontFamily, FontSize} from "../GlobalStyles";
import {useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {FeedsOfDaoNavigator} from "./Main/FeedsOfDAOs/FeedsOfDaoTabBar";
import {DaoInfo} from "../declare/api/DAOApi";
import {updateState as globalUpdateState} from "../store/global";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";

type Props = {};

const FeedsOfDAO: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const route = useRoute();
  // @ts-ignore
  const {daoInfo, type} = route.params as { daoInfo: DaoInfo, type: string };
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(globalUpdateState({
      feedsOfDAOId: daoInfo.id,
    }))
    setIsShow(true)
  }, [daoInfo])

  return (
    <BackgroundSafeAreaView
      headerStyle={{paddingTop: 0}}
      headerComponent={<ExpandedDAOHeader daoInfo={daoInfo}/>}
    >
      <View style={styles.feedsOfDao}>
        {/*<ExpandedDAOHeader daoInfo={daoInfo}/>*/}
        {isShow && <FeedsOfDaoNavigator type={type}/>}
      </View>
    </BackgroundSafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedsOfDao: {
    backgroundColor: Color.color1,
    flex: 1,
    width: "100%",
  },
});

export default FeedsOfDAO;
