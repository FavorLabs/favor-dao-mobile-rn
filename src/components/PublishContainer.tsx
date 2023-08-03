import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import PublishesItem from "./PublishesItem";
import {DaoInfo, Post} from "../declare/api/DAOApi";
import DaoApi from "../services/DAOApi/Dao";
import {getContent, getTime} from "../utils/util";
import {useEffect, useState} from "react";
import {useUrl} from "../utils/hook";
import {strings} from "../locales/i18n";

type Props = {
  daoInfo: DaoInfo;
  setIsShow?: (a: boolean) => void;
};
const PublishContainer: React.FC<Props> = (props) => {
  const { daoInfo, setIsShow } = props;
  const url = useUrl();
  const [lastPostNews, setLastPostNews] = useState({
    text: strings('PublishContainer.noNews'),
    createTime: '',
  });

  const [lastPostVideo, setLastPostVideo] = useState({
    text: strings('PublishContainer.noVideo'),
    createTime: '',
  });

  const getDaoInfo = async () => {
    try {
      const { data } = await DaoApi.getById(url, daoInfo.id);
      if (data.data) {
        processMessage(data.data);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  const processMessage = (arrData: DaoInfo) => {
    if (arrData.last_posts?.length > 1) {
      arrData.last_posts.forEach((item) => {
        let obj = getContent(item.contents.length ? item.contents as Post[] : item.orig_contents);
        if (item.type === 0) {
          setLastPostNews({
            text: obj[2]?.[0]?.content,
            createTime: getTime(item.created_on),
          });
        } else {
          setLastPostVideo({
            text: obj[1][0]?.content,
            createTime: getTime(item.created_on),
          });
        }
      });
    } else if (arrData.last_posts?.length === 1) {
      arrData.last_posts.forEach((item) => {
        let obj = getContent(item.contents as Post[]);
        if (item.type === 0) {
          setLastPostNews({
            text: obj[2]?.[0]?.content,
            createTime: getTime(item.created_on),
          });
          setLastPostVideo({
            text: strings('PublishContainer.noVideo'),
            createTime: '',
          });
        } else {
          setLastPostVideo({
            text: obj[1][0]?.content,
            createTime: getTime(item.created_on),
          });
          setLastPostNews({
            text: strings('PublishContainer.noNews'),
            createTime: '',
          });
        }
      });
    } else {
      setLastPostNews({
        text: strings('PublishContainer.noNews'),
        createTime: '',
      });
      setLastPostVideo({
        text: strings('PublishContainer.noVideo'),
        createTime: '',
      });
    }
  };

  useEffect(() => {
    getDaoInfo();
  },[daoInfo]);

  return (
    <View style={styles.publishes}>
      <Text style={styles.title}>{daoInfo.type === 0 ? strings('PublishContainer.Publishes') : strings('PublishContainer.Tool')}</Text>
      {
        daoInfo.type === 0 ?
          <>
            <PublishesItem type={strings('FeedsOfDaoTabBar.News')} daoInfo={daoInfo} lastPost={lastPostNews} setIsShow={setIsShow}/>
            <PublishesItem type={strings('FeedsOfDaoTabBar.Videos')} daoInfo={daoInfo} lastPost={lastPostVideo} setIsShow={setIsShow}/>
          </>
          :
          <PublishesItem type={daoInfo.name} daoInfo={daoInfo}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  publishes: {
    alignSelf: "stretch",
  },
});

export default PublishContainer;
