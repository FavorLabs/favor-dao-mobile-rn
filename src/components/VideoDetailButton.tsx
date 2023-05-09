import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import {PostInfo} from "../declare/global";
import {useResourceUrl, useUrl} from "../utils/hook";
import {useEffect, useState} from "react";
import PostApi from "../services/DAOApi/Post";
import {getDebounce} from "../utils/util";

type Props = {
  postInfo: PostInfo | null
};

const VideoDetailButton: React.FC<Props> = (props) => {
  const { postInfo } = props;
  if(!postInfo) return <></>;
  const url = useUrl();
  const avatarsResUrl = useResourceUrl('avatars');

  const [like, setLike] = useState<boolean>(false);
  const [isPostLike, setIsPostLike] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(postInfo.upvote_count);
  // const [watchCount, setWatchCount] = useState<number>(postInfo.view_count);
  const [refCount, setRefCount] = useState<number>(postInfo.ref_count);
  const [commentOnCount, setCommentOnCount] = useState<number>(postInfo.comment_count);

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, postInfo.id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    if (isPostLike && postInfo) {
      try {
        setIsPostLike(false);
        const { data } = await PostApi.postLike(url, postInfo.id);
        if (data.data) {
          setLike(data.data.status);
          if (data.data.status) { // @ts-ignore
            setLikeCount(likeCount + 1);
          }
          else { // @ts-ignore
            setLikeCount(likeCount - 1);
          }
        }
      } catch (e) {
        setIsPostLike(true);
      }
    }
  };

  useEffect(() => {
    if(postInfo) {
      getPostLikeStatus();
    }
  },[]);

  useEffect(() => {
    setIsPostLike(true);
  }, [like]);

  return (
    <View style={styles.groupParent}>
      {
        postInfo && (
          <View style={styles.placeholderParent}>
            <View>
              <Image
                style={[styles.avatar]}
                resizeMode="cover"
                source={{uri: `${avatarsResUrl}/${postInfo.author_dao.avatar ? postInfo.author_dao.avatar : postInfo.dao.avatar}`}}
              />
            </View>

            <View style={[styles.threeButton]}>
              <TouchableOpacity onPress={getDebounce(postLike)}>
                <Image
                  style={[styles.image]}
                  resizeMode="cover"
                  source={like ? require("../assets/frameLiked.png") : require("../assets/frame.png")}
                />
              </TouchableOpacity>
              <Text style={[styles.text]}>{likeCount}</Text>
            </View>

            <View style={[styles.threeButton]}>
              <Image
                style={[styles.image]}
                resizeMode="cover"
                source={require("../assets/icons8comments-2.png")}
              />
              <Text style={[styles.text]}>{commentOnCount}</Text>
            </View>

            <View style={[styles.threeButton]}>
              <Image
                style={[styles.image]}
                resizeMode="cover"
                source={require("../assets/frame1.png")}
              />
              <Text style={[styles.text]}>{refCount}</Text>
            </View>
          </View>
        )
      }
      <View>
        <Image
          style={[styles.alertCircleIcon]}
          resizeMode="cover"
          source={require("../assets/alertcircle.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderParent: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-between',

  },
  avatar: {
    height: 30,
    borderRadius: 30,
    width: 30,
  },
  threeButton: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // like: {
  //   backgroundColor: 'red',
  // },
  // comment: {
  //   backgroundColor: 'blue',
  // },
  // ref: {
  //   backgroundColor: 'green',
  // },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    marginTop: 10,
    color: Color.color1,
    fontFamily: FontFamily.paragraphP313,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },

  alertCircleIcon: {
    overflow: "hidden",
    height: 30,
    width: 30,
  },
  groupParent: {
    bottom: 30,
    right: 30,
    height: 336,
    width: 30,
    position: "absolute",
    display: 'flex',
    justifyContent: 'center'
  },
});

export default VideoDetailButton;
