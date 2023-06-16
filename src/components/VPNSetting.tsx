import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from "react-native";
import {Color} from "../GlobalStyles";
import {Icon} from "@rneui/themed";
import VPNStopSvg from "../assets/svg/vpn_stop.svg"
import VPNStartSvg from "../assets/svg/vpn_start.svg"
import * as FavorX from "react-native-favor";
import Favor from "../libs/favor";
import AppJson from "../../app.json"
import Toast from "react-native-toast-message";

const VPNSetting = () => {
  if (!(Favor.config!.proxyVPN && Favor.config!.proxyVPN.enabled) || Platform.OS === 'ios') {
    return null;
  }
  const [state, setState] = useState<FavorX.VPNState>({
    up: "",
    down: "",
    total: "",
    running: false
  })

  const startVPN = async () => {
    FavorX.addVpnStateListener((e) => {
      setState(e);
      if (!e.running) FavorX.removeVpnStateListener();
    })
    const vpnConfig = Favor.config!.proxyVPN!;
    const list = vpnConfig.whitelist.length ? {whitelist: vpnConfig.whitelist} : {blacklist: [AppJson.expo.android.package]}
    await FavorX.startVPN({
      group: vpnConfig.proxy[0].group,
      nodes: vpnConfig.proxy[0].boot,
      ...list,
    }).catch(e => {
      Toast.show({
        type: "error",
        text1: e.message
      })
    })
  }

  const stopVPN = async () => {
    await FavorX.stopVPN().catch(e => {
      Toast.show({
        type: "error",
        text1: e.message
      })
    })
  }

  const color = state.running ? Color.color : '#999999';
  return <View style={styles.container}>
    <Text style={styles.title}>VPN</Text>
    <View style={styles.info}>
      <View style={styles.left}>
        <View style={styles.flex1}>
          <View style={styles.circle}>
            <Icon size={20} color={color} name={'arrow-up'} type={'ionicon'}/>
          </View>
          {state.running && <Text style={styles.text}>{state.up}</Text>}
        </View>
        <View style={styles.flex1}>
          <View style={styles.circle}>
            <Icon size={20} color={color} name={'arrow-down'} type={'ionicon'}/>
          </View>
          {state.running && <Text style={styles.text}>{state.down}</Text>}
        </View>
        <View style={styles.flex1}>
          <View style={styles.circle}>
            <Icon size={20} color={color} name={'water-outline'} type={'ionicon'}/>
          </View>
          {state.running && <Text style={styles.text}>{state.total}</Text>}
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.right}>
        {
          state.running ?
            <TouchableOpacity onPress={stopVPN}>
              <VPNStopSvg/>
              <Text style={[styles.text, {textAlign: 'center'}]}>Stop</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={startVPN}>
              <VPNStartSvg/>
              <Text style={[styles.text, {textAlign: 'center'}]}>Start</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Color.color1,
  },
  title: {
    color: '#000',
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 18,
  },
  info: {
    flexDirection: 'row',
    alignItems: "center"
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginRight: 36
  },
  right: {
    paddingLeft: 31,
    paddingRight: 15,
  },
  circle: {
    // flex: 1,
    width: 24,
    height: 24,
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: "center",
    alignItems: 'center'
  },
  largeCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  start: {
    backgroundColor: Color.color
  },
  text: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: 'rgba(0,0,0,.8)'
  },
  flex1: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center"
  },
  line: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cbcbcb',
    height: 24
  }
})

export default VPNSetting;
