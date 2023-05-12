import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import DefaultContentModeContainer from "./DefaultContentModeContainer";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import SwitchButton from "./SwitchButton";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type Props = {
  daoMode: number;
  setDaoMode: React.Dispatch<React.SetStateAction<number>>;
};
const ContentInfoContainer: React.FC<Props> = (props) => {
  const { daoMode, setDaoMode } = props;

  return (
    <View style={styles.contentinfo}>
      <SwitchButton mode={daoMode} setMode={setDaoMode} />
      <View style={[styles.price, styles.priceFlexBox]}>
        <Text style={[styles.membershipPrice, styles.textFlexBox]}>
          Subscribe Price
        </Text>
        <View style={styles.frameParent}>
          <View style={styles.rectangleParent}>
            <View style={styles.frameChild} />
            <Text style={[styles.text, styles.textFlexBox]}>3000</Text>
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
    fontFamily: FontFamily.capsCaps310SemiBold,
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
    fontSize: FontSize.capsCaps310SemiBold_size,
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
    position: "absolute",
  },
  rectangleParent: {
    height: 35,
    flex: 1,
  },
  favt: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.paragraphP313,
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
