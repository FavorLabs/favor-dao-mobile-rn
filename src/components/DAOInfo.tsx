import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {useIsLogin, useResourceUrl, useUrl} from "../utils/hook";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import JoinButton from "./JoinButton";
import {useEffect, useState} from "react";
import DaoApi from "../services/DAOApi/Dao";
import Toast from "react-native-toast-message";

type Props = {
  daoInfo: DaoInfo;
  joinStatus: boolean;
  setJoinStatus: (a:boolean) => void;
};

const DAOInfo: React.FC<Props> = (props) => {
  const url = useUrl();
  const [isLogin, gotoLogin] = useIsLogin();
  const { daoInfo, joinStatus, setJoinStatus } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const { dao } = useSelector((state: Models) => state.global);
  // const [joinStatus, setJoinStatus] = useState<boolean>(false);
  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const bookmarkHandle = async () => {
    if (!isLogin) return gotoLogin();
    if(btnLoading) return;
    setBtnLoading(true);
    try {
      const { data } = await DaoApi.bookmark(url, daoInfo.id);
      if(data.data) {
        setJoinStatus(data.data.status);
        if(data.data.status) Toast.show({type: 'info', text1: 'Join success!'});
      }

    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const checkJoinStatus = async () => {
    try {
      const { data } = await DaoApi.checkBookmark(url, daoInfo.id);
      setJoinStatus(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  useEffect(() => {
    if(isLogin) checkJoinStatus()
  },[daoInfo])

  return (
    <View style={styles.daoinfo}>
      {
        daoInfo ?
          <>
            <Image
              style={styles.userImageIcon}
              resizeMode="cover"
              source={{uri: `${avatarsResUrl}/${daoInfo.avatar}`}}
            />
            <View style={styles.daoname}>
              <Text style={styles.title} numberOfLines={1}>{daoInfo.name}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{daoInfo.follow_count} members</Text>
            </View>
            {
              dao?.id !== daoInfo.id &&
                <JoinButton isJoin={joinStatus} handle={bookmarkHandle} isLoading={btnLoading}/>
            }
          </>
          :
          <></>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  userImageIcon: {
    width: 32,
    height: 32,
    borderRadius: 32,
  },
  title: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontWeight: "600",
    textAlign: "left",
    color: Color.color1,
  },
  subtitle: {
    fontSize: FontSize.size_xs,
    lineHeight: 16,
    fontWeight: '400',
    opacity: 0.8,
    marginTop: 2,
    color: Color.color1,
  },
  daoname: {
    flex: 1,
    marginLeft: 4,
  },
  daoinfo: {
    width: '55%',
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DAOInfo;
