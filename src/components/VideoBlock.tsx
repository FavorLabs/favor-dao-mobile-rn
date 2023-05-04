import * as React from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import RowUser from "./RowUser";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import OperationBlock from "./OperationBlock";
import { PostInfo } from "../declare/global";
import { BottomSheetModal,BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {useCallback, useMemo, useRef, useState} from "react";
import SubscribeBlock from "./SubscribeBlock";
import {getContent} from "../utils/util";
import {useResourceUrl} from "../utils/hook";

type Props = {
  postInfo: PostInfo
};

const VideoBlock: React.FC<Props> = (props) => {
  const { postInfo } = props;
  const {  created_on, contents, dao } = props.postInfo;
  const imagesResUrl = useResourceUrl('images');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isSubscriptionVisilbe, setIsSubscriptionVisilbe] = useState(false);
  const snapPoints = useMemo(() => ["65%"], []);
  const info = getContent(contents);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const subscribe = () => {
    // setIsSubscriptionVisilbe(true);
    // bottomSheetModalRef.current?.present();
  }

  return (
    // <BottomSheetModalProvider>
    <View style={styles.rowUserParent}>
      <RowUser
        time={created_on}
        dao={dao}
      />
      <TouchableOpacity onPress={subscribe}>
      <View style={[styles.description, styles.likeSpaceBlock]}>
        <Text style={styles.description1}>
          Stream thousands of episodes, live.
        </Text>
      </View>
      <View style={[styles.imageParent, styles.likeSpaceBlock]}>
        <Image
          style={styles.imageIcon}
          resizeMode="cover"
          // source={require("../assets/image4.png")}
          source={{uri:`${imagesResUrl}/${info?.[3]?.[0]?.content}`}}
        />
        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          <View style={[styles.groupChild, styles.lockIconPosition]} />
          <View style={styles.subtitleParent}>
            <Text style={styles.subtitle}>Unlock</Text>
            <Image
              style={[styles.lockIcon, styles.lockIconPosition]}
              resizeMode="cover"
              source={require("../assets/lock.png")}
            />
          </View>
        </View>
        <Image
          style={styles.playCircleIcon}
          resizeMode="cover"
          source={require("../assets/playcircle.png")}
        />
      </View>
      </TouchableOpacity>
      <OperationBlock postInfo={postInfo}/>
      <View style={[styles.frameChild, styles.likeSpaceBlock]} />
      {/*<BottomSheetModal*/}
      {/*  ref={bottomSheetModalRef}*/}
      {/*  index={isSubscriptionVisilbe?1:-1}*/}
      {/*  snapPoints={snapPoints}*/}
      {/*  onChange={handleSheetChanges}*/}
      {/*>*/}
      {/*  <SubscribeBlock />*/}
      {/*</BottomSheetModal>*/}
    </View>
    // </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  likeSpaceBlock: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  groupChildLayout: {
    width: 82,
    height: 24,
  },
  lockIconPosition: {
    left: 0,
    position: "absolute",
  },
  symbolTypo: {
    marginLeft: 6,
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
  },
  description1: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    textAlign: "left",
    fontFamily: FontFamily.paragraphP313,
    letterSpacing: 0,
    color: Color.iOSSystemLabelsLightPrimary,
  },
  description: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    marginTop: 14,
    flexDirection: "row",
  },
  imageIcon: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_xs,
    top: 0,
    left: 0,
    height: 24,
    width: 82,
    backgroundColor: Color.color1,
  },
  subtitle: {
    left: 21,
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    fontFamily: FontFamily.headingH613,
    color: Color.darkslategray_400,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    lineHeight: 20,
    height: 19,
    top: 0,
    position: "absolute",
    letterSpacing: 0,
  },
  lockIcon: {
    top: 1,
    width: 16,
    height: 15,
    overflow: "hidden",
  },
  subtitleParent: {
    top: 3,
    left: 7,
    width: 67,
    height: 19,
    position: "absolute",
  },
  rectangleParent: {
    top: 14,
    right: 14,
    height: 24,
    position: "absolute",
  },
  playCircleIcon: {
    top: 84,
    left: 182,
    width: 47,
    height: 43,
    overflow: "hidden",
    position: "absolute",
  },
  imageParent: {
    height: 210,
  },
  icons8Share1: {
    width: 20,
    height: 21,
    overflow: "hidden",
  },
  symbol: {
    color: Color.iOSSystemLabelsLightSecondary,
  },
  icons8Share1Parent: {
    top: 0,
    left: 0,
    flexDirection: "row",
  },
  look: {
    width: 52,
    height: 21,
  },
  comments: {
    flexDirection: "row",
  },
  symbol3: {
    color: Color.iOSSystemLabelsLightPrimary,
    marginLeft: 6,
    fontSize: FontSize.size_mini,
  },
  like: {
    paddingTop: Padding.p_8xs,
    justifyContent: "space-between",
    height: 24,
    paddingHorizontal: Padding.p_base,
    marginTop: 14,
    flexDirection: "row",
    backgroundColor: Color.color1,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
  },
  rowUserParent: {
    paddingHorizontal: 0,
    paddingTop: Padding.p_3xs,
    marginTop: 10,
    backgroundColor: Color.color1,
    alignSelf: "stretch",
  },
});

export default VideoBlock;
