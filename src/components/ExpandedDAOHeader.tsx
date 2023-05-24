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
import {useNavigation} from "@react-navigation/native";
import {DaoInfo, Post} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import {getContent, getDebounce, getTime} from "../utils/util";
import {h64} from 'xxhashjs';
import Favor from "../libs/favor";
import {CometChat} from "@cometchat-pro/react-native-chat";
import Screens from "../navigation/RouteNames";
import Toast from "react-native-toast-message";
import {useEffect, useState} from "react";

type Props = {
    daoInfo: DaoInfo;
    isShowBtnChatToggle?: boolean;
};

const ExpandedDAOHeader: React.FC<Props> = (props) => {
    const {daoInfo, isShowBtnChatToggle = true} = props;
    const navigation = useNavigation();
    const [isLogin, gotoLogin] = useIsLogin();
    const [isJoin,setIsJoin] = useState<boolean>(daoInfo.is_joined);

    const imagesResUrl = useResourceUrl('images');

    const toBack = () => {
        navigation.goBack();
    }

    const toFeedsOfDao = async () => {
        if (!isLogin) return gotoLogin();
        if(!isJoin){
            return Toast.show({
                type:'info',
                text1: 'You need to join this dao to enter the chat!!!'
            })
        }
        const str = `${Favor.bucket?.Settings.TagRegion.split('_')[1]}-${Favor.networkId}-group_${daoInfo.id}`
        const guid = h64(Buffer.from(str), 0).toString()
        const group = await CometChat.getGroup(guid)
        // @ts-ignore
        navigation.navigate(Screens.Main.Chat, {
            group,
            time: Date.now()
        })
    }

    return (
      <ImageBackground
        style={[styles.expandeddaoheaderIcon, styles.maskeddaoinfoLayout]}
        resizeMode="cover"
        source={{uri: `${imagesResUrl}/${daoInfo?.banner}`}}
      >
          <View style={[styles.maskeddaoinfo, styles.maskeddaoinfoLayout]}>
              <TouchableOpacity onPress={toBack}>
                  <Back/>
              </TouchableOpacity>

              <DAOInfo daoInfo={daoInfo} joinStatus={isJoin} setJoinStatus={setIsJoin}/>

              {
                  isShowBtnChatToggle ?
                    <TouchableOpacity onPress={getDebounce(toFeedsOfDao)}>
                        <BtnChatToggle/>
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
    maskeddaoinfoLayout: {
        height: 60,
        alignSelf: "stretch",
    },
    maskeddaoinfo: {
        backgroundColor: Color.gray_700,
        flexDirection: "row",
        padding: Padding.p_3xs,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    expandeddaoheaderIcon: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

export default ExpandedDAOHeader;
