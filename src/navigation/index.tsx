import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import CreateDAOScreen from '../screens/CreateDAOScreen';
import CreateNewsScreen from '../screens/CreateNewsScreen';
import CreateVideoScreen from '../screens/CreateVideoScreen';
import VideoPlayScreen from '../screens/VideoPlayScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import MnemonicBackupScreen from '../screens/MnemonicBackupScreen';
import DAOSettingScreen from '../screens/Main/Setting/DAOSettingScreen';
import {BottomTabNavigator} from "./BottomTabBar";
import Screens from './RouteNames';
import StartNode from "../screens/StartNode";
import Favor, {group_sub_method} from "../libs/favor";
import Loading from "../components/Loading";
import QuoteEditScreen from "../screens/QuoteEditScreen";
import FeedsOfDAO from "../screens/FeedsOfDAO";
import {useDispatch, useSelector} from "react-redux";
import WalletController from "../libs/walletController";
import {CometChatMessages} from "../cometchat-pro-react-native-ui-kit/CometChatWorkspace"
import ToolDaoDetailScreen from "../screens/ToolDaoDetailScreen";
import UserSetting from "../screens/Main/Setting/UserSetting";
import ModifyName from "../screens/Main/Setting/ModifyName";
import AccountCancellation from "../screens/Main/Setting/AccountCancellation";
import LogOut from "../screens/Main/Setting/LogOut";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import UserAgreementScreen from "../screens/UserAgreementScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ComplaintScreen from "../screens/ComplaintScreen";
import ChatInDAOScreen from "../screens/Main/Chat/ChatInDAOScreen";
import RedEnvelopesScreen from '../screens/Main/Chat/RedEnvelopesScreen'
import LuckyPacketRecordScreen from "../screens/Main/Chat/LuckyPacketRecordScreen";
import Toast from "react-native-toast-message";
import analytics from "@react-native-firebase/analytics";
import {Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getDAOInfo} from "../utils/util";
import ClaimDetails from "../screens/Main/Chat/ClaimDetails";
import NodeApi from "../services/NodeApi";
import BackgroundService from "react-native-background-actions";
import Models from "../declare/storeTypes";

const Stack = createStackNavigator();

function EmptyScreen() {
  return null;
}

function RootStack() {
  const dispatch = useDispatch();
  const {start} = useSelector((state: Models) => state.favorx)
  const [firstLoad, setFirstLoad] = useState(true);
  const [requestLoading, setRequestLoading] = useState(true);
  const [routeName, setRouteName] = useState(Screens.StartNode);
  const fullCount = useRef(0)
  const proxyCount = useRef(0)
  let timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (start) {
      if (Platform.OS === 'android') getFullCount();
      Favor.on(group_sub_method, (res) => {
        console.log(res)
        setRequestLoading(!res.connected?.length)
        proxyCount.current = res.connected?.length || 0
        updateService();
      })
    }
  }, [start])

  useEffect(() => {
    async function fetch() {
      if (!requestLoading) {
        if (firstLoad) {
          try {
            await Favor.getBucket();
            analytics().logEvent('favorDAO_open', {
              platform: Platform.OS,
              networkId: Favor.networkId,
              region: Favor.bucket?.Settings.Region
            });
            if (WalletController.token) {
              await getDAOInfo(dispatch);
            }
          } catch (e) {
            if (e instanceof Error) {
              Toast.show({
                type: "error",
                text1: e.message
              })
            }
          }
          setFirstLoad(false);
        } else {
          if (timer.current) clearTimeout(timer.current);
        }
      } else if (requestLoading && !firstLoad) {
        timer.current = setInterval(() => {
          Favor.observeProxyGroup();
        }, 2000)
      }
    }

    fetch()
  }, [requestLoading])
  const getFullCount = async () => {
    const {data} = await NodeApi.getTopology(Favor.debugApi!);
    fullCount.current = data.connected ?? 0;
    updateService();
    setTimeout(getFullCount, 5000)
  }
  const updateService = () => {
    BackgroundService.updateNotification({taskDesc: `Full Peers : ${fullCount.current}, Proxy : ${proxyCount.current}`})
  }

  const
    visible = useMemo(() => {
        return routeName === Screens.StartNode ? false : firstLoad || requestLoading
      },
      [requestLoading, routeName, firstLoad])
  return (
    <>
      <Stack.Navigator
        initialRouteName={Screens.StartNode}
        screenOptions={{
          header: () => null,
        }}
        screenListeners={({route}) => ({
          state: () => {
            setRouteName(route.name);
          }
        })}
      >
        <Stack.Screen name={Screens.StartNode} component={StartNode}/>
        <Stack.Screen name={Screens.Root} component={firstLoad ? EmptyScreen : BottomTabNavigator}/>
        <Stack.Screen name={Screens.CreateWallet} component={CreateWalletScreen}/>
        <Stack.Screen name={Screens.ImportWallet} component={ImportWalletScreen}/>
        <Stack.Screen name={Screens.CreateDAO} component={CreateDAOScreen}/>
        <Stack.Screen name={Screens.CreateNews} component={CreateNewsScreen}/>
        <Stack.Screen name={Screens.CreateVideo} component={CreateVideoScreen}/>
        <Stack.Screen name={Screens.VideoPlay} component={VideoPlayScreen}/>
        <Stack.Screen name={Screens.PostDetail} component={PostDetailScreen}/>
        <Stack.Screen name={Screens.MnemonicBackup} component={MnemonicBackupScreen}/>
        <Stack.Screen name={Screens.DAOSetting} component={DAOSettingScreen}/>
        <Stack.Screen name={Screens.QuoteEdit} component={QuoteEditScreen}/>
        <Stack.Screen name={Screens.FeedsOfDAO} component={FeedsOfDAO}/>
        <Stack.Screen name={"CometChatMessages"} component={CometChatMessages}/>
        <Stack.Screen name={Screens.ToolDaoDetail} component={ToolDaoDetailScreen}/>
        <Stack.Screen name={Screens.UserSetting} component={UserSetting}/>
        <Stack.Screen name={Screens.ModifyName} component={ModifyName}/>
        <Stack.Screen name={Screens.AccountCancellation} component={AccountCancellation}/>
        <Stack.Screen name={Screens.LogOut} component={LogOut}/>
        <Stack.Screen name={Screens.ChangePassword} component={ChangePasswordScreen}/>
        <Stack.Screen name={Screens.UserAgreement} component={UserAgreementScreen}/>
        <Stack.Screen name={Screens.Complaint} component={ComplaintScreen}/>
        <Stack.Screen name={Screens.ChatInDAO} component={ChatInDAOScreen}/>
        <Stack.Screen name={Screens.RedEnvelopes} component={RedEnvelopesScreen}/>
        <Stack.Screen name={Screens.LuckyPacketRecord} component={LuckyPacketRecordScreen}/>
        <Stack.Screen name={Screens.Notifications} component={NotificationsScreen}/>
        <Stack.Screen name={Screens.ClaimDetails} component={ClaimDetails}/>
      </Stack.Navigator>
      <Loading visible={visible} text={'Connecting to a p2p network'} timeout={7000}/>
    </>
  );
}

export default RootStack;
