import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useEffect, useState} from "react";
import UserApi from "../services/DAOApi/User";
import {useUrl} from "../utils/hook";
import {addDecimal} from "../utils/balance";

type Props = {};
const BalanceBackContainer: React.FC<Props> = (props) => {
  const url = useUrl();
  const [balance, setBalance] = useState<string>('0');
  const getBalance = async () => {
    try {
      const {data} = await UserApi.getAccounts(url);
      console.log(data,'data')
      // setBalance(data.data[0].balance)
    } catch (e) {
      if (e instanceof Error) console.error(e)
    }
  }

  useEffect(() => {
    // getBalance()
  }, [])

  return (
    <View style={styles.balanceback}>
      <View>
        <Text style={styles.title}>Balance</Text>
        <View style={styles.balances}>
          <Image
            style={styles.tokenavatarIcon}
            resizeMode="cover"
            source={require("../assets/subtract.png")}
          />
          <View style={styles.values}>
            <Text style={[styles.valuesofusdt]}>
              { addDecimal(balance) } FavT
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  valuesofusdtFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  title: {
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  tokenavatarIcon: {
    // borderRadius: Border.br_21xl,
    width: 50,
    height: 56,
  },
  valuesofusdt: {
    fontSize: FontSize.size_15xl,
    letterSpacing: -1,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  valueoftoken: {
    top: 0,
    left: 0,
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 20,
    fontFamily: FontFamily.paragraphP313,
    color: '#939393',
    width: 88,
    letterSpacing: 0,
  },
  values: {
    flex: 1,
    height: 65,
    marginLeft: 12,
    justifyContent: 'center',
  },
  balances: {
    width: 224,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  balanceback: {
    alignSelf: "stretch",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xl,
  },
});

export default BalanceBackContainer;
