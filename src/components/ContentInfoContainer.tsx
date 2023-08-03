import * as React from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import DefaultContentModeContainer from "./DefaultContentModeContainer";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import SwitchButton from "./SwitchButton";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {DaoInfo} from "../declare/api/DAOApi";
import {addDecimal, mulDecimal} from "../utils/balance";
import {getDebounce} from "../utils/util";
import Toast from "react-native-toast-message";
import {strings} from "../locales/i18n";

type Props = {
  daoMode: number;
  setDaoMode: React.Dispatch<React.SetStateAction<number>>;
  daoPrice: string;
  setDaoPrice: (a: string) => void;
};
const ContentInfoContainer: React.FC<Props> = (props) => {
  const { daoMode, setDaoMode, daoPrice, setDaoPrice } = props;

  return (
    <View style={styles.contentinfo}>
      <SwitchButton mode={daoMode} setMode={setDaoMode} />
      <View style={[styles.price, styles.priceFlexBox]}>
        <Text style={[styles.membershipPrice, styles.textFlexBox]}>
          {strings('ContentInfoContainer.SubscribePrice')}
        </Text>
        <View style={styles.frameParent}>
          <View style={styles.rectangleParent}>
            <View style={styles.frameChild} />
            <TextInput
              // keyboardType="numeric"
              style={styles.searchInput}
              placeholder={strings('ContentInfoContainer.placeholder')}
              value={daoPrice}
              onChangeText={text => setDaoPrice(text)}
            />
          </View>
          <View style={[styles.favtWrapper, styles.priceFlexBox]}>
            <Text style={styles.favt}>FavT</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
  },
  priceFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textFlexBox: {
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  membershipPrice: {
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    width: 110,
  },
  frameChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_5xs,
    backgroundColor: Color.color1,
    width: 166,
    position: "absolute",
    height: 35,
  },
  text: {
    top: 12,
    left: 10,
    fontWeight: "300",
    position: "absolute",
  },
  rectangleParent: {
    height: 35,
    flex: 1,
  },
  favt: {
    fontSize: FontSize.size_xs,
    fontWeight: '400',
    textAlign: "right",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  favtWrapper: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    justifyContent: "flex-end",
    marginLeft: 15,
    flex: 1,
  },
  frameParent: {
    marginLeft: 33,
    flex: 1,
    flexDirection: "row",
  },
  price: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  contentinfo: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_xl,
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default ContentInfoContainer;
