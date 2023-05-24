import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {useResourceUrl, useUrl} from "../utils/hook";
import JoinButton from "./JoinButton";
import DaoApi from "../services/DAOApi/Dao";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import TextParsed from "./TextParsed";

type Props = {
  daoInfo: DaoInfo;
}

const DaoInfoHeader: React.FC<Props> = (props) => {
  const url = useUrl();
  const { dao } = useSelector((state: Models) => state.global);

  const { daoInfo } = props;
  const avatarsResUrl = useResourceUrl('avatars');

  const [isJoin, setIsJoin] = useState(false);
  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const bookmarkHandle = async () => {
    if(btnLoading) return;
    try {
      setBtnLoading(true);
      const { data } = await DaoApi.bookmark(url, daoInfo.id);
      setIsJoin(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const checkJoinStatus = async () => {
    try {
      const { data } = await DaoApi.checkBookmark(url, daoInfo.id);
      setIsJoin(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  useEffect(() =>  {
    checkJoinStatus();
  },[daoInfo.id])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={{uri: `${avatarsResUrl}/${daoInfo.avatar}`}}
          />
          <View style={styles.topLeftRight}>
            <Text style={styles.name} numberOfLines={1}>{daoInfo.name}</Text>
            <Text style={styles.joined} numberOfLines={1}>joined: {daoInfo.follow_count}</Text>
          </View>
        </View>

        <View style={styles.topRight}>

          { dao?.id !== daoInfo.id &&
              <JoinButton isJoin={isJoin} handle={bookmarkHandle} isLoading={btnLoading}/>
          }

          <View style={styles.level}>
            <Text style={styles.levelText}>8 level</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        {/* @ts-ignore */}
        <TextParsed content={daoInfo.introduction} style={styles.introduction} numberOfLines={2} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ccc',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: 'space-between',
    flex: 1,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  topLeftRight: {
    marginLeft: 12,
    width: '65%',
  },
  name: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  joined: {
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
  topRight: {
    justifyContent: 'space-between'
  },
  level: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 48,
    backgroundColor: Color.darkorange_100,
  },
  levelText: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.color,
  },
  bottom: {
    marginTop: 10,
  },
  introduction: {
    lineHeight: 21,
    fontFamily: FontFamily.paragraphP313,
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
  }
});

export default DaoInfoHeader;