import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useEffect, useState} from "react";
import UserApi from "../services/DAOApi/User";
import {useUrl} from "../utils/hook";
import {addDecimal} from "../utils/balance";
import Toast from "react-native-toast-message";

type Props = {};
const BalanceBackContainer: React.FC<Props> = (props) => {
  const url = useUrl();
  const [balance, setBalance] = useState<string>('0');
  const getBalance = async () => {
    try {
      const {data} = await UserApi.getAccounts(url);
      setBalance(data.data[0].balance)
    } catch (e) {
      if (e instanceof Error)
        Toast.show({
          type: 'error',
          // @ts-ignore
          text1: e.message,
        });
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <View style={styles.balanceback}>
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>Balance</Text>
          <TouchableOpacity onPress={getBalance}>
            <Image source={require('../assets/reTransFerIcon.png')} style={styles.retransImg}/>
          </TouchableOpacity>
        </View>
        <View style={styles.balances}>
          <Image
            style={styles.tokenavatarIcon}
            resizeMode="cover"
            source={require("../assets/subtract.png")}
          />
          <View style={styles.values}>
            <Text style={styles.balanceNum} numberOfLines={1}>
              { addDecimal(balance) }
            </Text>
            <Text style={styles.valuesofusdt}>FavT</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valuesofusdtFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  title: {
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    fontWeight: "600",
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
    lineHeight: 41,
    fontWeight: "700",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  balanceNum: {
    flex: 1,
    fontSize: FontSize.size_15xl,
    lineHeight: 41,
    fontWeight: "700",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  valueoftoken: {
    top: 0,
    left: 0,
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 20,
    fontWeight: '400',
    color: '#939393',
    width: 88,
    letterSpacing: 0,
  },
  values: {
    flex: 1,
    height: 65,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  balances: {
    flex: 1,
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
  retransImg: {
    width: 18,
    height: 15,
  }
});

export default BalanceBackContainer;
