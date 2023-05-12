import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import {Post, PostInfo} from "../declare/api/DAOApi";
import {useEffect, useState} from "react";
import {getContent} from "../utils/util";
import {useResourceUrl} from "../utils/hook";

type Props = {
  postInfo: PostInfo | null
};

const QuotePreview: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const imagesResUrl = useResourceUrl('images');
  const avatarsResUrl = useResourceUrl('avatars');

  const [info, setInfo] = useState<Record<number, Post[]>>([]);
  const [isReTransfer, setIsReTransfer] = useState<boolean>(false);


  useEffect(() => {
    if(postInfo){
      setInfo(
        getContent(
          postInfo?.type === 2 ? postInfo?.orig_contents : postInfo?.contents,
        ),
      );
      if (postInfo?.type === 2) setIsReTransfer(true);
    }
  },[postInfo]);

  return (
    <View style={styles.quote}>
      {
        info[3] ? (
          <Image
            style={styles.imageIcon}
            resizeMode="cover"
            source={{uri: `${imagesResUrl}/${info[3][0]?.content}`}}
          />
        ) : (
          <View style={styles.imageIcon}/>
        )
      }
      <View style={styles.content}>
        <View style={styles.nameandavatar}>
          {
            postInfo && (
              <Image
                style={styles.imageIcon1}
                resizeMode="cover"
                source={ isReTransfer ? {uri: `${avatarsResUrl}/${postInfo.author_dao.avatar}`} : {uri: `${avatarsResUrl}/${postInfo.dao.avatar}`}}
              />
            )
          }
          <Text style={styles.title} numberOfLines={2}>
            {postInfo &&
              (isReTransfer
                ? `${postInfo.author_dao.name}`
                : `${postInfo.dao.name}`)}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {info[2] && `${info[2][0].content}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageIcon: {
    width: 100,
    height: 100,
    borderRadius: Border.br_3xs,
  },
  imageIcon1: {
    borderRadius: Border.br_5xs,
    width: 25,
    height: 25,
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontFamily: FontFamily.paragraphP313,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    marginLeft: 5,
    flex: 1,
  },
  description: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontFamily: FontFamily.paragraphP313,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  nameandavatar: {
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
  },
  quote: {
    flex: 1,
    backgroundColor: Color.color1,
    flexDirection: "row",
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
});

export default QuotePreview;
