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
import {DaoInfo, PostInfo} from "../declare/global";

type Props = {
  time: number;
  dao?: DaoInfo;
  isReTransfer?: boolean;
  postInfo?: PostInfo;
  isQuote?: boolean;
};

const RowUser: React.FC<Props> = (props) => {
  const { time,  postInfo , isReTransfer, isQuote, dao} = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(time);

  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    console.log('avatar')
    event.stopPropagation();
  };

  return (
    <TouchableOpacity onPress={toDaoCommunity}>
    <View style={styles.rowUser}>
      <View style={styles.imageParent}>
        <Image style={styles.imageIcon} resizeMode="cover" source={{uri: `${avatarsResUrl}/${dao?.avatar}`}} />
        <View style={styles.subtitleParent}>
          <View style={styles.row}>
            <Text style={[styles.title, styles.titleTypo]} numberOfLines={1}>{dao?.name}</Text>
            {
              isReTransfer && (
                <View style={styles.reTransfer}>
                  <Text style={styles.retTransferText} numberOfLines={1}>was retransfered by</Text>
                  {/*<Text>{postInfo?.dao.name}</Text>*/}
                  <Text style={styles.daoName} numberOfLines={1}>Me</Text>
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
