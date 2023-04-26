import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { FontSize, Color, Border, FontFamily, Padding } from "../GlobalStyles";
import DaoCommunityCard from "./DaoCommunityCard";

export type Props = {};

const DaoCardList: React.FC<Props> = (props) => {
  const [daoCardInfo,setDaoCardInfo] = useState([
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/ellipse-1.png"),
      daoName: 'Mr. Bean',
      joined: 'Joined: 50.1k',
      level: 'Level 8',
      description: 'Stream thousands of episodes, live sports, iconic movies, and exclusive originals from CBS, BET, Comedy...'
    },
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/avatar-image3.png"),
      daoName: '小廖社区',
      joined: 'Joined: 40k',
      level: 'Level 2',
      description: '这是小廖的私人社区'
    },
    {
      backgroundImg: require("../assets/preview1.png"),
      avatar: require("../assets/ellipse-1.png"),
      daoName: 'Mr. Bean',
      joined: 'Joined: 50.1k',
      level: 'Level 8',
      description: 'Stream thousands of episodes, live sports, iconic movies, and exclusive originals from CBS, BET, Comedy...'
    },
  ])

  return (
      <View style={styles.frameContainer}>
        <View style={styles.frameView}>
          <ScrollView horizontal={true}>
            <FlatList
                style={styles.postList}
                data={daoCardInfo}
                renderItem={({ item }) => <DaoCommunityCard daoCardInfo={item} />}
                horizontal={true}
            />
          </ScrollView>
        </View>
        <View style={[styles.frameInner, styles.lineViewBorder]} />
      </View>
  )
}

const styles = StyleSheet.create({
  postList: {

  },
  frameContainer: {
    paddingTop: Padding.p_5xs,
    alignSelf: "stretch",
    backgroundColor: Color.color1,
  },
  frameView: {
    flexDirection: "row",
  },
  frameInner: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  lineViewBorder: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#e6e5eb",
    borderStyle: "solid",
  },
})

export default DaoCardList