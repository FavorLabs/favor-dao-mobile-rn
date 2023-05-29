import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import AddChannel from "./AddChannel";
import ChannelItem from "./ChannelItem";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const ChatChannelsContainer = () => {
  return (
    <View style={styles.chatchannel}>
      <View style={[styles.chatchannels, styles.channelsPosition]}>
        <Text style={[styles.chatChannels, styles.mainChannelTypo]}>
          Chat Channels
        </Text>
        <AddChannel />
      </View>
      <View style={[styles.channels, styles.channelsPosition]}>
        <View style={styles.mainchannel}>
          <Text style={[styles.mainChannel, styles.mainChannelTypo]}>
            Main Channel
          </Text>
        </View>
        <View style={styles.flexchannels}>
          <ChannelItem />
          <ChannelItem channelItemMarginTop={10} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  channelsPosition: {
    alignItems: "center",
    width: 344,
    left: 16,
    position: "absolute",
  },
  mainChannelTypo: {
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: '600',
    letterSpacing: 0,
  },
  chatChannels: {
    fontSize: FontSize.size_sm,
  },
  chatchannels: {
    top: 12,
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    flexDirection: "row",
  },
  mainChannel: {
    fontSize: FontSize.capsCaps310SemiBold_size,
  },
  mainchannel: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.color,
    width: 258,
    overflow: "hidden",
    paddingHorizontal: Padding.p_70xl,
    paddingVertical: Padding.p_2xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  flexchannels: {
    marginTop: 10,
  },
  channels: {
    top: 55,
  },
  chatchannel: {
    backgroundColor: Color.color1,
    width: 376,
    height: 196,
    marginTop: 20,
  },
});

export default ChatChannelsContainer;
