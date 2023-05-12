import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType, TouchableOpacity,
} from "react-native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import {useResourceUrl} from "../utils/hook";
import {getTime} from "../utils/util";
import {DaoInfo, PostInfo} from "../declare/api/DAOApi";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";

type Props = {
  time: number;
  daoInfo?: DaoInfo;
  userDao?: DaoInfo;
  isReTransfer?: boolean;
  postInfo?: PostInfo;
  isQuote?: boolean;
};

const RowUser: React.FC<Props> = (props) => {
  const { time,  postInfo , isReTransfer, isQuote, daoInfo, userDao} = props;
  const navigation = useNavigation();
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(time);
  const { dao } = useSelector((state: Models) => state.global);

  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : postInfo?.dao , type : 'Mixed'});
    event.stopPropagation();
  };

  return (
    <TouchableOpacity onPress={toDaoCommunity}>
    <View style={styles.rowUser}>
      <View style={styles.imageParent}>
        <Image style={styles.imageIcon} resizeMode="cover" source={{uri: `${avatarsResUrl}/${daoInfo?.avatar}`}} />
        <View style={styles.subtitleParent}>
          <View style={styles.row}>
            <Text style={[styles.title, styles.titleTypo]} numberOfLines={1}>{daoInfo?.name}</Text>
            {
              isReTransfer && (
                <View style={styles.reTransfer}>
                  <Text style={styles.retTransferText} numberOfLines={1}>was retransfered by</Text>
                  <Text style={styles.daoName} numberOfLines={1}>
                    { dao?.id === userDao?.id ? 'Me' : userDao?.name}
                  </Text>
                </View>
              )
            }
          </View>
          <Text style={[styles.subtitle, styles.titleTypo]}>{createTime}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
  },
  imageIcon: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  subtitle: {
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    width: 293,
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    marginRight: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  retTransferText: {
    color: Color.iOSSystemTintsDisableLight,
    marginRight: 4,
  },
  reTransfer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  daoName: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  subtitleParent: {
    flex: 1,
    height: 42,
    marginLeft: 12,
  },
  imageParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowUser: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
  },
});

export default RowUser;
