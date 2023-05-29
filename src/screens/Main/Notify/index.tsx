import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotifyTopTabNavigator} from "../../../navigation/TopTabBar";
import {Color, FontFamily, FontSize, Padding} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";

export type Props = {};
const NotifyScreen: React.FC<Props> = (props) => {
  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <View style={styles.frameParent}>
          <View style={[styles.titleParent, styles.selectionBg]}>
            <Text style={styles.title}>Notifications</Text>
          </View>
          <NotifyTopTabNavigator/>
        </View>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Color.whitesmoke_300,
  },
  titleParent: {
    paddingBottom: Padding.p_3xs,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_base,
  },
  selectionBg: {
    backgroundColor: Color.whitesmoke_300,
    alignSelf: "stretch",
  },
  title: {
    fontSize: FontSize.size_15xl,
    lineHeight: 41,
    fontWeight: '700',
    display: "flex",
    width: 343,
    alignItems: "center",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: -1,
    textAlign: "left",
  },
});

export default NotifyScreen;