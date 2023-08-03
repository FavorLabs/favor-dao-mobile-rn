import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import NewsContent from "./NewsContent";
import OperationBlock from "./OperationBlock";
import {Color, FontSize, Padding} from "../GlobalStyles";
import { PostInfo } from "../declare/api/DAOApi";
import VideoBlockItem from "./VideoBlockItem";
import Screens from "../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/global";
import SvgIcon from "./SvgIcon";
import ReTransFerIcon from "../assets/svg/NewsFeed/reTransFerIcon.svg"
import {strings} from "../locales/i18n";

export type Props = {
  postInfo: PostInfo;
};

const NewsCard: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const { postInfo } = props;
  const { contents, orig_contents, type, orig_type, dao ,ref_id} = postInfo;
  const navigation = useNavigation();
  const [shieldStatus,setShieldStatus]=useState(true)
  const [delContents,setDelContents]=useState(false)
  const [oldDelContents,setOldDelContents]=useState(true)
  const toDaoCommunity = (event: { stopPropagation: () => void; }) => {
    // @ts-ignore
    navigation.navigate(Screens.FeedsOfDAO,{ daoInfo : dao , type : strings('FeedsOfDaoTabBar.Mixed')});
    event.stopPropagation();
  };
  const { ShieldAct} = useSelector((state: Models) => state.global);
  const Shield = async () => {
    if(ShieldAct.Type=='0'){
     if(ShieldAct.Id==dao.id || ( postInfo.author_dao && ShieldAct.Id==postInfo.author_dao.id)){
       setShieldStatus(false)
       dispatch(globalUpdateState({
         ShieldAct:{
           Type:'',
           Id:''
         }
       }))
     }
    }
    if(ShieldAct.Type=='1'){
      if(ShieldAct.Id==postInfo.id || ShieldAct.Id==postInfo.ref_id){
        setShieldStatus(false)
        dispatch(globalUpdateState({
          ShieldAct:{
            Type:'',
            Id:''
          }
        }))
      }
    }
    if(ShieldAct.Type=='2'){
      if(ShieldAct.Id==postInfo.id){
        setShieldStatus(false)
        dispatch(globalUpdateState({
          ShieldAct:{
            Type:'',
            Id:''
          }
        }))
      }
      if(ShieldAct.Id==postInfo.ref_id){
        setOldDelContents(false)
        setDelContents(true)
        dispatch(globalUpdateState({
          ShieldAct:{
            Type:'',
            Id:''
          }
        }))
      }
    }
  }
  useEffect(()=>{
    Shield()
  },[ShieldAct])
  useEffect(()=>{
    if(orig_contents==null && ref_id!=='000000000000000000000000'){
      setDelContents(true)
    }
  },[])
  return (
    <View style={[styles.feedsJoinedInner,{display:shieldStatus?'flex':'none'}]}>
      <View style={styles.groupParent}>
          {
              !contents &&
              <TouchableOpacity onPress={toDaoCommunity}>
                <View style={styles.retransRow}>
                  <SvgIcon svg={<ReTransFerIcon/>} width={20} height={16}/>
                  <Text style={styles.daoName} numberOfLines={1}>{dao.name}</Text>
                  <Text style={styles.retranText}>{strings('NewsCard.retransferThis')}</Text>
                </View>
              </TouchableOpacity>
          }

          {
              contents?.length &&
              <NewsContent postInfo={postInfo}  showOperate={true}/>
          }
        <View style={{display:oldDelContents?"flex":'none'}}>
          {
            orig_contents?.length ?
                orig_type === 0 ? <NewsContent postInfo={postInfo} isQuote={true}  showOperate={!contents  ? true : false }/>
                    : orig_type === 1 ? <VideoBlockItem postInfo={postInfo} isQuote={true} isReTransfer={!contents  ? true : false} showOperate={!contents  ? true : false}/> : <></>
                : <></>
          }
        </View>
            <View style={{backgroundColor:'#EAEAEA',display:delContents?'flex':'none'}}>
              <Text style={{
                fontSize: FontSize.bodyBody17_size,
                letterSpacing: 0,
                lineHeight: 22,
                // fontWeight: '400',
                fontWeight: '400',
                textAlign: "left",
                paddingHorizontal: Padding.p_base,
                paddingVertical: 10}}>{strings('NewsCard.deletedText')}</Text>
            </View>
        <OperationBlock postInfo={postInfo} type={contents?.length && orig_contents?.length ? 0 : orig_type}/>
        <View style={styles.frameChild} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedsJoinedInner: {
    paddingHorizontal: 0,
    alignItems: "center",
    alignSelf: "stretch",
  },
  groupParent: {
    paddingTop: 10,
    backgroundColor: Color.color1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "#e6e5eb",
    borderTopWidth: 1,
    height: 1,
    marginTop: 14,
    alignSelf: "stretch",
  },
  retransRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    paddingVertical: 10,
  },
  daoName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    marginHorizontal: 5,
  },
  retranText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#999'
  }
});

export default NewsCard;
