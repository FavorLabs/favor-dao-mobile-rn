import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import {useEffect, useState} from "react";
import UserApi from "../services/DAOApi/User";
import {useUrl} from "../utils/hook";
import {addDecimal} from "../utils/balance";
import Toast from "react-native-toast-message";
import SvgIcon from "./SvgIcon";
import ReTransFerIcon from '../assets/svg/NewsFeed/reTransFerIcon.svg';
import Subtract from '../assets/svg/Setting/subtract.svg';
import {strings} from "../locales/i18n";

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
        <View style={styles.row}>
          <Text style={styles.title}>{strings('BalanceBackContainer.Balance')}</Text>
          <TouchableOpacity onPress={getBalance}>
            <SvgIcon svg={<ReTransFerIcon/>} width={20}/>
          </TouchableOpacity>
        </View>
        <View style={styles.balances}>
          <SvgIcon svg={<Subtract/>} width={30} height={34}/>
          <View style={styles.values}>
            <Text style={styles.balanceNum} numberOfLines={1}>
              { addDecimal(balance) }
            </Text>
            <Text style={styles.valuesofusdt}>FavT</Text>
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
  title: {
    fontSize: FontSize.size_mini,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  valuesofusdt: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: Color.iOSSystemLabelsLightPrimary,
    alignSelf: 'flex-end',
    bottom: 6
  },
  balanceNum: {
    letterSpacing: -1,
    fontSize: FontSize.size_15xl,
    fontWeight: "700",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  values: {
    maxWidth: '80%',
    marginLeft: 12,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  balances: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10,
  },
  balanceback: {
    alignSelf: "stretch",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
  },
});

export default BalanceBackContainer;
