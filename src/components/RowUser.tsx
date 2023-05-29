import * as React from "react";
import {useEffect, useState, useRef} from "react";
import Toast from 'react-native-toast-message';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ImageSourcePropType, TouchableOpacity,
} from "react-native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import {useResourceUrl} from "../utils/hook";
import {getTime} from "../utils/util";
import {DaoInfo, Page, PostInfo} from "../declare/api/DAOApi";
import {useNavigation , useRoute} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {useSelector,useDispatch} from "react-redux";
import {useIsLogin, useUrl} from '../utils/hook';
import Models from "../declare/storeTypes";
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';
import PostApi from '../services/DAOApi/Post';
import {updateState as globalUpdateState} from "../store/global";
type Props = {
  time: number;
  daoInfo?: DaoInfo;
  postInfo: PostInfo;
};

const RowUser: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [resetImgStatus,setResetImgStatus] = useState<boolean>(false)
  const { time , daoInfo,postInfo } = props;
  const url = useUrl();
  const navigation = useNavigation();
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(time);
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;
  const { dao } = useSelector((state: Models) => state.global);

  const delSheetRef = useRef<ActionSheet>(null);
  const getSetStates = () => {
    if(dao?.id == daoInfo?.id ){
      if(routeName==='Mixed'||routeName==='News'||routeName==='Videos'){
        setResetImgStatus(true)
      }
    }
  }
  const uDelDaoMsg = async () => {
    try {

      const request =  () => PostApi.deletePost(url,postInfo.id)
      const {data}=await request()
      if(data.code==0){
        Toast.show({
          type: 'info',
          text1: 'Delete dao success!'
        });
        dispatch(globalUpdateState({
          delDaoMsgId:postInfo.id,
          delStatus:true
        }));
      }
    } catch (e) {
      if (e instanceof Error)
      {
        Toast.show({
          type: 'error',
          text1: e.message
        });
      }
    }
  };
  const delAct=()=>{
    delSheetRef.current?.show();
  }
  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : daoInfo , type : 'Mixed'});
    event.stopPropagation();
  };
  useEffect(()=>{
    getSetStates()
  },[])

  const delDaoMsg=()=>{
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this ?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "destructive"
          },
          { text: "Yes", onPress: () => {
              uDelDaoMsg()
            }
          }
        ]
    )
  }
  const delStyles = {
    titleBox: {
      background: 'pink'
    },
    titleText: {
      fontSize: 16,
      color: '#000'
    }
  }
  return (

      <View style={styles.rowUser}>
        <View style={styles.Flexbox}>
            <View style={styles.imageParent}>
              <TouchableOpacity onPress={toDaoCommunity}>
                <Image style={styles.imageIcon}   resizeMode="cover" source={{uri: `${avatarsResUrl}/${daoInfo?.avatar}`}}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.subtitleParent}>
                <View style={styles.row}>
                  <Text style={[styles.title, styles.titleTypo]} onPress={toDaoCommunity} numberOfLines={1}>{daoInfo?.name}</Text>
                </View>
                <Text style={[styles.subtitle, styles.titleTypo]} onPress={toDaoCommunity}>{createTime}</Text>
              </TouchableOpacity>
            </View>
          <TouchableOpacity onPress={delAct}>
            <View style={styles.delActArea}>
              <Image style={[styles.resetImg,{display:resetImgStatus?"flex":"none"}]} source={require("../assets/operate.png")}  />
            </View>
          </TouchableOpacity>
        </View>
        <ActionSheet
            ref={delSheetRef}
            title={'delete'}
            options={['Delete', 'Cancel']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            userInterfaceStyle={'dark'}
            onPress={(index: number) => {
              if(index==0) delDaoMsg()
            }}
        />
      </View>

  );
};

const styles = StyleSheet.create({
  Flexbox:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  titleTypo: {
    textAlign: "left",
    // fontWeight: '400',
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
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    marginRight: 4,
    fontWeight: '500'
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
    height: 42,
    marginLeft: 12
  },
  imageParent: {
    flexDirection: "row",
    alignItems: "center",
    width:"80%"
  },
  rowUser: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0
  },
  resetImg:{
    width:20,
    height:5
  },
  delActArea:{
    width:30,
    height:15,
    marginTop:5,
    marginRight:-8,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});

export default RowUser;
