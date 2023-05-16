import React from "react";
import FeedsScreen from "../screens/Main/Feeds";
import ChatScreen from "../screens/Main/Chat";
import DAOScreen from "../screens/Main/DAO";
import NotifyScreen from "../screens/Main/Notify";
import SettingScreen from "../screens/Main/Setting";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Screens from './RouteNames';
import SvgIcon from "../components/SvgIcon";
import FeedsActiveSvg from '../assets/svg/feeds_active.svg';
import FeedsInActiveSvg from '../assets/svg/feeds_inactive.svg';
import ChatActiveSvg from '../assets/svg/chat_active.svg';
import ChatInActiveSvg from '../assets/svg/chat_inactive.svg';
import DaoActiveSvg from '../assets/svg/dao_active.svg';
import DaoInActiveSvg from '../assets/svg/dao_inactive.svg';
import NotifyActiveSvg from '../assets/svg/notify_active.svg';
import NotifyInActiveSvg from '../assets/svg/notify_inactive.svg';
import SettingActiveSvg from '../assets/svg/setting_active.svg';
import SettingInActiveSvg from '../assets/svg/setting_inactive.svg';
import {Color} from "../GlobalStyles";
import {useIsLogin} from "../utils/hook";
import {CometChatGroupListWithMessages} from "../cometchat-pro-react-native-ui-kit/CometChatWorkspace"

const BottomTabBar = createBottomTabNavigator();

export function BottomTabNavigator() {
    const [isLogin, gotoLogin] = useIsLogin()
    return (
      <BottomTabBar.Navigator
        initialRouteName={Screens.Main.Feeds}
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Color.color,
        }}
        safeAreaInsets={{bottom: 0}}
        screenListeners={({navigation, route}) => ({
            tabPress: e => {
                if (route.name !== 'Feeds' && !isLogin) {
                    gotoLogin();
                    e.preventDefault()
                }
            },
        })}
      >
          <BottomTabBar.Screen
            name={Screens.Main.Feeds}
            component={FeedsScreen}
            options={{
                tabBarLabel: 'Feeds',
                tabBarIcon: ({focused, color, size}) => (
                  <SvgIcon svg={focused ? <FeedsActiveSvg/> : <FeedsInActiveSvg/>}/>
                )
            }}
          />
          <BottomTabBar.Screen
            name={Screens.Main.Chat}
            component={CometChatGroupListWithMessages}
            options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({focused, color, size}) => (
                  <SvgIcon svg={focused ? <ChatActiveSvg/> : <ChatInActiveSvg/>}/>
                )
            }}
          />
          <BottomTabBar.Screen
            name={Screens.Main.DAO}
            component={DAOScreen}
            options={{
                tabBarLabel: 'DAO',
                tabBarIcon: ({focused, color, size}) => (
                  <SvgIcon svg={focused ? <DaoActiveSvg/> : <DaoInActiveSvg/>}/>
                )
            }}
          />
          <BottomTabBar.Screen
            name={Screens.Main.Notify}
            component={NotifyScreen}
            options={{
                tabBarLabel: 'Notify',
                tabBarIcon: ({focused, color, size}) => (
                  <SvgIcon svg={focused ? <NotifyActiveSvg/> : <NotifyInActiveSvg/>}/>
                )
            }}
          />
          <BottomTabBar.Screen
            name={Screens.Main.Setting}
            component={SettingScreen}
            options={{
                tabBarLabel: 'Setting',
                tabBarIcon: ({focused, color, size}) => (
                  <SvgIcon svg={focused ? <SettingActiveSvg/> : <SettingInActiveSvg/>}/>
                )
            }}
          />
      </BottomTabBar.Navigator>
    );
}
