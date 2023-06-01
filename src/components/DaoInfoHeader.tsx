import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {useResourceUrl, useUrl} from "../utils/hook";
import JoinButton from "./JoinButton";
import DaoApi from "../services/DAOApi/Dao";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import TextParsed from "./TextParsed";
import Toast from "react-native-toast-message";

type Props = {
  daoInfo: DaoInfo;
  isJoin: boolean;
  setIsJoin: (a:boolean) => void;
}

const DaoInfoHeader: React.FC<Props> = (props) => {
  const url = useUrl();
  const { dao } = useSelector((state: Models) => state.global);

  const { daoInfo, isJoin, setIsJoin } = props;
  const avatarsResUrl = useResourceUrl('avatars');

  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const [isMore, setIsMore] = useState<boolean>(false);
  const [introductionRow, setIntroductionRow] = useState<number>(2);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [moreText, setMoreText] = useState<string>('More');

  const handleTextLayout = (event: { nativeEvent: { lines: any; }; }) => {
    const { lines } = event.nativeEvent;
    if (lines.length >= introductionRow) {
      setIsMore(true)
    } else {
      setIsMore(false)
    }
  }

  const switchMore = () => {
    setShowMore(!showMore)
  }

  useEffect(() => {
    if(showMore) {
      setMoreText('Show less');
    } else {
      setMoreText('Show More');
    }
  },[showMore])

  const bookmarkHandle = async () => {
    if(btnLoading) return;
    try {
      setBtnLoading(true);
      const { data } = await DaoApi.bookmark(url, daoInfo.id);
      setIsJoin(data.data.status);
      if(data.data.status) Toast.show({type: 'info', text1: 'Join success!'});
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

          {/*<View style={styles.level}>*/}
          {/*  <Text style={styles.levelText}>8 level</Text>*/}
          {/*</View>*/}
        </View>
      </View>

      <View style={styles.bottom}>
        <TextParsed
          content={daoInfo.introduction}
          /* @ts-ignore */
          style={styles.introduction}
          numberOfLines={showMore ? undefined : introductionRow}
          onTextLayout={handleTextLayout}
        />
      </View>
      { isMore &&
          <TouchableOpacity onPress={switchMore} style={styles.more}>
              <Text style={styles.moreText}>{ moreText }</Text>
          </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  more: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  moreText: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.accentLight,
  },
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
    // width: '65%',
  },
  name: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  joined: {
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    textAlign: "left",
    fontWeight: '400',
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
    color: Color.color,
  },
  bottom: {
    marginTop: 10,
  },
  introduction: {
    lineHeight: 21,
    fontWeight: '400',
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
  }
});

export default DaoInfoHeader;
