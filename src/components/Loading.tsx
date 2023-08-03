import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontSize, FontFamily, Color} from "../GlobalStyles";
import FastImage from 'react-native-fast-image';
import {useEffect, useState} from "react";
import RNExitApp from "react-native-exit-app";
import {strings} from "../locales/i18n";
const Image = require('../assets/loading_gif.gif');

type LoadingType = {
  text?: string;
  visible?: boolean
  timeout?: number
};

const Loading = ({text, visible, timeout}: LoadingType) => {
  if (!visible) {
    return null
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setShow(true);
      }, timeout)
    }
  }, [])

  return (
    <View style={styles.vectorParent}>
      <FastImage
        style={styles.vectorIcon}
        resizeMode="cover"
        source={Image}
      />

      {
        show ?
          <>
            <Text style={styles.loading}>{strings('Loading.text')}</Text>
            <TouchableOpacity style={styles.exit} onPress={() => {
              RNExitApp.exitApp();
            }}>
              <Text style={styles.exit_text}>{strings('Loading.exit')}</Text>
            </TouchableOpacity>
          </>
          :
          <Text style={styles.loading}>{text}</Text>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: 80,
    height: 80,
  },
  loading: {
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    marginTop: 23,
  },
  vectorParent: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Color.whiteTransparent,
  },
  exit: {
    marginTop: 5,
    backgroundColor: Color.color,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exit_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "500",
  }
});

export default Loading;
