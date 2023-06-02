import React, {useCallback} from 'react';
import {NotifyGroup} from "../declare/api/DAOApi";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import {View} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import NotifyApi from "../services/DAOApi/Notify";
import {useUrl} from "../utils/hook";

const NotificationsScreen = () => {
    const route = useRoute();
    const url = useUrl();
    const {id, avatar, name, isSystem} = route.params as NotifyGroup['fromInfo'] & { isSystem?: boolean }

    const getNotify = async () => {
        const {data} = isSystem ? await NotifyApi.getNotifySys(url, id) : await NotifyApi.getNotifyFromId(url, id);
        if(data.data.list){

        }
    }

    const readNotify = async () => {
        await NotifyApi.readNotifyFromId(url, id);
    }

    useFocusEffect(
      useCallback(() => {
          getNotify();
          readNotify()
      }, [])
    )

    return <BackgroundSafeAreaView>
        <View>
        </View>
    </BackgroundSafeAreaView>;
};

export default NotificationsScreen;
