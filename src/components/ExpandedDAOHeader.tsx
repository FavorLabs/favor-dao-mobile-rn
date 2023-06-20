import * as React from "react";
import {
    StyleSheet,
    View,
    ImageBackground, TouchableOpacity,
} from "react-native";
import Back from "./Back";
import DAOInfo from "./DAOInfo";
import BtnChatToggle from "./BtnChatToggle";
import {Color, Padding} from "../GlobalStyles";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {DaoInfo, Post} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import {getContent, getDebounce, getTime} from "../utils/util";
import {h64} from 'xxhashjs';
import Favor from "../libs/favor";
import {CometChat} from "@cometchat-pro/react-native-chat";
import Screens from "../navigation/RouteNames";
import Toast from "react-native-toast-message";
import {useCallback, useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type Props = {
    daoInfo: DaoInfo;
    isShowBtnChatToggle?: boolean;
    isShowJoined?:boolean;
};

const ExpandedDAOHeader: React.FC<Props> = (props) => {
    const { top } = useSafeAreaInsets();
    const {daoInfo, isShowBtnChatToggle = true, isShowJoined = true } = props;
    const navigation = useNavigation();
    const [isLogin, gotoLogin] = useIsLogin();
    const [isJoin,setIsJoin] = useState<boolean>(daoInfo.is_joined);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const [isChat, setIsChat] = useState(false);

    const imagesResUrl = useResourceUrl('images');

    const toBack = () => {
        navigation.goBack();
    }

    const toFeedsOfDao = async () => {
        // @ts-ignore
        if(route.name === 'ChatInDAO') return  navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : daoInfo , type : 'Mixed'});
        if (!isLogin) return gotoLogin();
        if(isLoading) return;
        if(!isJoin){
            return Toast.show({
                type:'info',
                text1: 'You need to join this dao to enter the chat!!!'
            })
        }
        setIsLoading(true);
        const str = `${Favor.bucket?.Settings.TagRegion.split('_')[1]}-${Favor.networkId}-group_${daoInfo.id}`
        const guid = h64(Buffer.from(str), 0).toString()
        const group = await CometChat.getGroup(guid)
        // @ts-ignore
        navigation.navigate(Screens.ChatInDAO,{ info: group });
    }

    useFocusEffect(useCallback(()=> {
        setIsLoading(false);
        if(route.name === 'ChatInDAO') setIsChat(true);
    },[]))

    return (
      <ImageBackground
        style={[styles.expandeddaoheaderIcon, {height: top + 60}]}
        resizeMode="cover"
        source={{uri: `${imagesResUrl}/${daoInfo?.banner}`}}
      >
          <View style={[styles.maskeddaoinfo, {height: top + 60}]}>
              <TouchableOpacity onPress={toBack}>
                  <Back/>
              </TouchableOpacity>

              <DAOInfo daoInfo={daoInfo} joinStatus={isJoin} setJoinStatus={setIsJoin} isShowJoined={isShowJoined}/>

              {
                  isShowBtnChatToggle ?
                    <TouchableOpacity onPress={toFeedsOfDao}>
                        <BtnChatToggle isChat={isChat}/>
                    </TouchableOpacity>
                    : <View></View>
              }

          </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    channelDao: {
        flex: 1,
        padding: Padding.p_xs,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Color.color1,
    },
    maskeddaoinfo: {
        backgroundColor: Color.gray_700,
        flexDirection: "row",
        padding: Padding.p_3xs,
        alignItems: "flex-end",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    expandeddaoheaderIcon: {
        alignItems: "center",
        justifyContent: "flex-end",
        alignSelf: "stretch",
    },
});

export default ExpandedDAOHeader;
