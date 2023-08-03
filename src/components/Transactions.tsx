import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {Border, FontSize, Color} from "../GlobalStyles";
import {useEffect, useState} from "react";
import BottomSheetModal from "./BottomSheetModal";
import {addDecimal} from "../utils/balance";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import UserApi from "../services/DAOApi/User";
import {useUrl} from "../utils/hook";
import Toast from "react-native-toast-message";
import {Page, TransactionInfo} from "../declare/api/DAOApi";
import SvgIcon from "./SvgIcon";
import TransactionIcon from '../assets/svg/Setting/transactionIcon.svg';
import RevenueIcon from '../assets/svg/Setting/revenueIcon.svg';
import ExpensesIcon from '../assets/svg/Setting/expensesIcon.svg';
import {strings} from "../locales/i18n";

type Props = {};
const Transactions: React.FC<Props> = (props) => {
  const {user} = useSelector((state: Models) => state.global);
  const url = useUrl();
  const [popUpShow, setPopUpShow] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageInfo, setPageInfo] = useState<Page>({
    page: 1,
    page_size: 10,
  });

  const showPopUp = () => {
    getTransaction(true);
    setPopUpShow(true);
  }

  const getTransaction = async (refresh?: boolean) => {
    const pageData = await refresh ? {page: 1, page_size: pageInfo.page_size} : pageInfo;
    try {
      const {data} = await UserApi.getTransaction(url, pageData);
      if (data.data.list) {
        refresh ? setTransactions(data.data.list) : setTransactions(v => [...v, ...data.data.list]);
        setIsLoadingMore(data.data.pager.total_rows > pageData.page * pageData.page_size);
        setPageInfo({...pageInfo, page: ++pageData.page})
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        })
      }
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getTransaction(true);
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (isLoadingMore && !loading) {
      setLoading(true);
      await getTransaction();
      setLoading(false);
    }
  };

  const sliceStr = (str: string) => {
    let string = str.slice(1);
    return string;
  }

  return (
    <>
      <TouchableOpacity style={styles.mainbuttonParent} onPress={showPopUp}>
        <SvgIcon svg={<TransactionIcon/>} width={50} height={50}/>
        <Text style={styles.text}>{strings('Transactions.title')}</Text>
      </TouchableOpacity>

      <BottomSheetModal visible={popUpShow} setVisible={setPopUpShow} height={'50%'}>
        <Text style={styles.title}>{strings('Transactions.title')}</Text>
        <FlatList
          style={styles.scrollView}
          data={transactions}
          renderItem={({item, index}) => (
            <View style={[styles.transRow, index === transactions.length - 1 && styles.lastItem]}>
              <View style={styles.transRowLeft}>
                <View style={{marginRight: 10}}>
                  <SvgIcon svg={user?.address === item.subject_id ? <RevenueIcon/> : <ExpensesIcon/>} width={20}
                           height={20}/>
                </View>
                <View style={styles.transBlock}>
                  <Text style={styles.transAddress} numberOfLines={1} ellipsizeMode="middle">FavT
                    • {user?.address === item.subject_id ? item.account_id.reference : item.subject_id}</Text>
                </View>
              </View>
              <Text style={[styles.transName, styles.transPrice]} numberOfLines={1}
                    ellipsizeMode="middle">{addDecimal(user?.address === item.subject_id ? sliceStr(item.pay_amount) : item.pay_amount)}.00</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <>
              {
                loading &&
                  <View style={styles.footer}>
                      <ActivityIndicator size="large"/>
                  </View>
              }
            </>
          )}
        />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
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
