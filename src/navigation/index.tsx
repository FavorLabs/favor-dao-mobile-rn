import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import CreateDAOScreen from '../screens/CreateDAOScreen';
import CreateNewsScreen from '../screens/CreateNewsScreen';
import CreateVideoScreen from '../screens/CreateVideoScreen';
import VideoPlayScreen from '../screens/VideoPlayScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import QuoteNewsScreen from '../screens/QuoteNewsScreen';
import InputWalletPasswordScreen from '../screens/InputWalletPasswordScreen';
import MnemonicBackupScreen from '../screens/MnemonicBackupScreen';
import DAOSettingScreen from '../screens/Main/Setting/DAOSettingScreen';
import {BottomTabNavigator} from "./BottomTabBar";
import Screens from './RouteNames';
import StartNode from "../screens/StartNode";
import Favor, {group_sub_method} from "../libs/favor";
import Loading from "../components/Loading";
import QuoteEditScreen from "../screens/QuoteEditScreen";

const Stack = createStackNavigator();

function EmptyScreen() {
    return null;
}

function RootStack() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [requestLoading, setRequestLoading] = useState(true);
    const [routeName, setRouteName] = useState(Screens.StartNode);
    useEffect(() => {
        Favor.on(group_sub_method, (res) => {
            setRequestLoading(!res.connected?.length)
        })
        return () => {
            Favor.removeAllListeners(group_sub_method)
        }
    }, [])
    useEffect(() => {
        if (firstLoad && !requestLoading) {
            setFirstLoad(false);
        }
    }, [requestLoading])
    const visible = useMemo(() => {
          return routeName === Screens.StartNode ? false : requestLoading
      },
      [requestLoading, routeName])

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
              <Stack.Screen name={Screens.QuoteNews} component={QuoteNewsScreen}/>
              <Stack.Screen name={Screens.InputWalletPassword} component={InputWalletPasswordScreen}/>
              <Stack.Screen name={Screens.MnemonicBackup} component={MnemonicBackupScreen}/>
              <Stack.Screen name={Screens.DAOSetting} component={DAOSettingScreen}/>
              <Stack.Screen name={Screens.QuoteEdit} component={QuoteEditScreen} />
          </Stack.Navigator>
          <Loading visible={visible} text={'Connecting to a p2p network'}/>
      </>
    );
}

export default RootStack;
