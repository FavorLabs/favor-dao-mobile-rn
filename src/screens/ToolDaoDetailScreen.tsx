import * as React from "react";
import {StyleSheet, View } from "react-native";
import {WebView} from 'react-native-webview';
import ExpandedDAOHeader from "../components/ExpandedDAOHeader";
import { Color } from "../GlobalStyles";
import {useRoute} from "@react-navigation/native";
import {DaoInfo} from "../declare/api/DAOApi";
import {useEffect, useState} from "react";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";

const ToolDaoDetailScreen = () => {
  const route = useRoute();
  // @ts-ignore
  const {daoInfo} = route.params as { daoInfo: DaoInfo };
  const [uri, setUri] = useState<string>('')

  useEffect(() => {
    setUri(daoInfo.home_page);
  }, [])

  return (
    <BackgroundSafeAreaView
      headerStyle={{paddingTop: 0}}
      headerComponent={<ExpandedDAOHeader daoInfo={daoInfo} isShowBtnChatToggle={false}/>}
    >
      <View style={styles.feedsOfDao}>
        <View style={styles.urlBlock}>
          <WebView source={{uri}}/>
        </View>

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
  urlBlock: {
    flex: 1,
  }
});

export default ToolDaoDetailScreen;
