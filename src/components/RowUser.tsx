import * as React from "react";
import {useEffect, useState, useRef} from "react";
import Toast from 'react-native-toast-message';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
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
import SvgIcon from "./SvgIcon";
import Operate from "../assets/svg/NewsFeed/operate.svg"
import {strings} from "../locales/i18n";


type Props = {
  time: number;
  daoInfo: DaoInfo;
  postInfo: PostInfo;
  showOperate:boolean
};

const RowUser: React.FC<Props> = (props) => {
  const [isLogin, gotoLogin] = useIsLogin();
  const dispatch = useDispatch()
  const [operateImgStatus,setOperateImgStatus] = useState<boolean>(true)
  const [actionSheetType,setActionSheetType] = useState<number>(1)
  const { time , daoInfo,postInfo,showOperate } = props;
  const url = useUrl();
  const navigation = useNavigation();
  const avatarsResUrl = useResourceUrl('avatars');
  const createTime = getTime(time);
  const route = useRoute();
  // @ts-ignore
  const routeName = route.name;
  const { dao } = useSelector((state: Models) => state.global);

  const delSheetRef = useRef<ActionSheet>(null);
  const shieldSheetRef = useRef<ActionSheet>(null);
  const getSetStates = ()=>{
      if(!showOperate){
        setOperateImgStatus(false)
      }else{
        if(dao?.id == daoInfo?.id){
          if (isLogin){
            setActionSheetType(0)
          }else {
            setActionSheetType(1)
          }
        } else {
          if(routeName=='Mixed'){
            setOperateImgStatus(false)
          }
          if(routeName=='News'){
            setOperateImgStatus(false)
          }
          if(routeName=='Videos'){
            setOperateImgStatus(false)
          }
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
            text1: `${strings('RowUser.Toast.DeleteSuccess')}`
          });
          dispatch(globalUpdateState({
            ShieldAct:{
              Type:'2',
              Id:postInfo.id
            }
          }))
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
  const ShieldDaoMsg = async () => {
    try {
          if(postInfo.ref_id=='000000000000000000000000'){
            const request =  () => PostApi.shieldMsg(url,postInfo.id)
            const {data}=await request()
            if(data.code==0){
              Toast.show({
                type: 'info',
                text1: `${strings('RowUser.Toast.BlockSuccess')}`
              });
              dispatch(globalUpdateState({
                ShieldAct:{
                  Type:'1',
                  Id:postInfo.id
                }
              }))
            }
          }else {
            const request =  () => PostApi.shieldMsg(url,postInfo.ref_id)
            const {data}=await request()
            if(data.code==0){
              Toast.show({
                type: 'info',
                text1: `${strings('RowUser.Toast.BlockSuccess')}`
              });
              dispatch(globalUpdateState({
                ShieldAct:{
                  Type:'1',
                  Id:postInfo.ref_id
                }
              }))
            }
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
  const ShieldUser = async () => {
    try {
      const request =  () => PostApi.shieldUser(url,daoInfo.id)
      const {data}=await request()
      if(data.code==0){
        Toast.show({
          type: 'info',
          text1: `${strings('RowUser.Toast.BlockSuccess')}`
        });
          dispatch(globalUpdateState({
            ShieldAct:{
              Type:'0',
              Id:daoInfo.id
            }
          }))
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
  const OperateAct = async (index:number) => {
    try {
      if (index==0){
        ShieldUser()
      }
      if(index==1){
        ShieldDaoMsg()
      }
      if(index==2){
        delDaoMsg()
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
  const ActShow = ()=>{
    if(actionSheetType==0){
      delSheetRef.current?.show();
    }
    if(actionSheetType==1){
      shieldSheetRef.current?.show();
    }
  }
  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : daoInfo , type : strings('FeedsOfDaoTabBar.Mixed')});
    event.stopPropagation();
  };
  useEffect(()=>{
    getSetStates()
  },[operateImgStatus,dao,isLogin])

  const delDaoMsg=()=>{
    Alert.alert(
      `${strings('RowUser.ActionSheet.Delete')}`,
        `${strings('RowUser.alertDeleteMessage')}`,
        [
          {
            text: `${strings('RowUser.No')}`,
            onPress: () => console.log("Cancel Pressed"),
            style: "destructive"
          },
          { text: `${strings('RowUser.Yes')}`, onPress: () => {
              uDelDaoMsg()
            }
          }
        ]
    )
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
          <TouchableOpacity onPress={ActShow}>
            {
              operateImgStatus &&
                <View style={styles.delActArea}>
                    <SvgIcon svg={<Operate/>} width={20} height={5}/>
                </View>
            }
          </TouchableOpacity>
        </View>
        { actionSheetType== 0 &&
          <ActionSheet
              ref={delSheetRef}
              title={strings('RowUser.ActionSheet.deleteTitle')}
              options={[strings('RowUser.ActionSheet.Delete'), strings('RowUser.ActionSheet.Cancel')]}
              cancelButtonIndex={1}
              destructiveButtonIndex={0}
              userInterfaceStyle={'dark'}
              onPress={(index: number) => {
                if(index==0) OperateAct(2)
              }}
          />
        }
        { actionSheetType== 1 &&
          <ActionSheet
              ref={shieldSheetRef}
              title={strings('RowUser.ActionSheet.BlockReportTitle')}
              options={[`${strings('RowUser.ActionSheet.Block')} @${daoInfo?.name}`, strings('RowUser.ActionSheet.BlockThisPost') ,strings('RowUser.ActionSheet.Report'),strings('RowUser.ActionSheet.Cancel')]}
              cancelButtonIndex={3}
              onPress={(index:number) => {
                if (isLogin){
                  if (index==0) {
                    OperateAct(index)
                  }
                  if (index==1){
                    OperateAct(index)
                  }
                  if(index==2){
                    // @ts-ignore
                    navigation.navigate(Screens.Complaint,{postInfo:postInfo,daoInfo:daoInfo})
                  }
                }else{
                  if (index!==3){
                    gotoLogin();
                  }
                }
              }}
          />
        }
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
    color: Color.iOSSystemLabelsLightPrimary,
    marginRight: 4,
    fontWeight: '500'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleParent: {
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
