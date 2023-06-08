import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import PublishesItem from "./PublishesItem";
import {DaoInfo, Post} from "../declare/api/DAOApi";
import DaoApi from "../services/DAOApi/Dao";
import {getContent, getTime} from "../utils/util";
import {useEffect, useState} from "react";
import {useUrl} from "../utils/hook";

type Props = {
  daoInfo: DaoInfo;
  setIsShow?: (a: boolean) => void;
};
const PublishContainer: React.FC<Props> = (props) => {
  const { daoInfo, setIsShow } = props;
  const url = useUrl();
  const [lastPostNews, setLastPostNews] = useState({
    text: 'no news',
    createTime: '',
  });

  const [lastPostVideo, setLastPostVideo] = useState({
    text: 'no video',
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
            text: 'no video',
            createTime: '',
          });
        } else {
          setLastPostVideo({
            text: obj[1][0]?.content,
            createTime: getTime(item.created_on),
          });
          setLastPostNews({
            text: 'no news',
            createTime: '',
          });
        }
      });
    } else {
      setLastPostNews({
        text: 'no news',
        createTime: '',
      });
      setLastPostVideo({
        text: 'no video',
        createTime: '',
      });
    }
  };

  useEffect(() => {
    getDaoInfo();
  },[daoInfo]);

  return (
    <View style={styles.publishes}>
      <Text style={styles.title}>Publishes</Text>
      {
        daoInfo.type === 0 ?
          <>
            <PublishesItem type={'News'} daoInfo={daoInfo} lastPost={lastPostNews} setIsShow={setIsShow}/>
            <PublishesItem type={'Videos'} daoInfo={daoInfo} lastPost={lastPostVideo} setIsShow={setIsShow}/>
          </>
          :
          <PublishesItem type={'HomePage'} daoInfo={daoInfo}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  iconwithbackgroundFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  subtitleTypo: {
    fontWeight: '500',
  },
  subtitleLayout: {
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0,
  },
  title: {
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  vectorIcon: {
    height: 25,
    width: 23,
  },
  iconwithbackground: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    backgroundColor: Color.color2,
  },
  channelname: {
    textAlign: "left",
    fontWeight: '500',
    flex: 1,
    color: Color.iOSSystemLabelsLightPrimary,
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.size_mid,
  },
  lastmsgtime: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    color: Color.color3,
    textAlign: "right",
    width: 70,
    marginLeft: 12,
  },
  channelnamelLasttime: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  messageinfo: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.iOSSystemLabelsLightSecondary,
    flex: 1,
  },
  msgcountChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_6xs,
    width: 22,
    position: "absolute",
    height: 14,
    backgroundColor: Color.color2,
  },
  subtitle: {
    height: "100%",
    width: "95.65%",
    top: "0%",
    left: "4.35%",
    fontSize: FontSize.capsCaps310SemiBold_size,
    color: Color.color,
    display: "flex",
    position: "absolute",
    fontWeight: '500',
    alignItems: "center",
  },
  msgcount: {
    display: "none",
    height: 14,
    width: 23,
  },
  enterIcon: {
    height: 18,
    overflow: "hidden",
    width: 18,
  },
  msgcountParent: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 18,
    marginLeft: 12,
    flexDirection: "row",
  },
  lastmessage: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  publishes: {
    alignSelf: "stretch",
  },
  channelinfoChild: {
    borderStyle: "solid",
    borderColor: "#c1c1c4",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 12,
    alignSelf: "stretch",
  },
  channelinfo: {
    marginLeft: 10,
    flex: 1,
  },
  channelitemwithseperator: {
    marginTop: 16,
    alignSelf: "stretch",
  },
});

export default PublishContainer;
