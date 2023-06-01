import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import {useEffect, useState} from "react";
import BottomSheetModal from "./BottomSheetModal";
import {addDecimal} from "../utils/balance";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import UserApi from "../services/DAOApi/User";
import Favor from "../libs/favor";
import {useUrl} from "../utils/hook";
import Toast from "react-native-toast-message";
import {TransactionInfo} from "../declare/api/DAOApi";

type Props = {};
const Transactions: React.FC<Props> = (props) => {
  const { user } = useSelector((state: Models) => state.global);
  const url = useUrl();
  const [popUpShow,setPopUpShow] = useState<boolean>(false);
  const [transactions,setTransactions] = useState<TransactionInfo[]>([])

  const showPopUp = () => {
    getTransaction();
    setPopUpShow(true);
  }

  const getTransaction = async () => {
    try {
      const res = await UserApi.getTransaction(url);
      setTransactions(res.data.data.list);
    } catch (e) {
      // @ts-ignore
      Toast.show({type: 'error', text1: e.message});
    }
  }

  const sliceStr = (str: string) => {
    let string = str.slice(1);
    return string;
  }

  return (
    <>
      <TouchableOpacity style={styles.mainbuttonParent} onPress={showPopUp}>
        <Image
          style={styles.mainbuttonIcon}
          resizeMode="cover"
          source={require("../assets/transaction-icon.png")}
        />
        <Text style={styles.text}>Transaction</Text>
      </TouchableOpacity>

      <BottomSheetModal visible={popUpShow} setVisible={setPopUpShow} height={'50%'}>
        <Text style={styles.title}>Transaction</Text>
        <ScrollView style={styles.scrollView}>
          {transactions.map((item, index) => (
            <View key={index} style={[styles.transRow, index === transactions.length-1 && styles.lastItem]}>
              <View style={styles.transRowLeft}>
                <Image
                  style={styles.transRowIcon}
                  source={ user?.address === item.subject_id ? require('../assets/revenueIcon.png') : require('../assets/expensesIcon.png')}
                />
                <View style={styles.transBlock}>
                  {/*<Text style={styles.transName} numberOfLines={1}>{item.name}</Text>*/}
                  <Text style={styles.transAddress} numberOfLines={1} ellipsizeMode="middle">FavT • { user?.address === item.subject_id ? item.account_id.reference : item.subject_id }</Text>
                </View>
              </View>
              <Text style={[styles.transName,styles.transPrice]} numberOfLines={1} ellipsizeMode="middle">{addDecimal(user?.address === item.subject_id ? sliceStr(item.pay_amount) : item.pay_amount)}.00</Text>
            </View>
          ))}
        </ScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  mainbuttonIcon: {
    borderRadius: Border.br_101xl,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "500",
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "center",
    marginTop: 4,
  },
  mainbuttonParent: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 55,
  },
  transRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: .5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  transRowLeft: {
    maxWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  transRowIcon: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  transBlock: {
    flex: 1,
    alignItems: 'flex-start',
  },
  transName: {
    fontSize: FontSize.bodyBody17_size,
    fontWeight: '400',
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 22,
  },
  transAddress: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.color4,
    lineHeight: 20,
  },
  transPrice: {
    maxWidth: '28%',
  },
});

export default Transactions;
