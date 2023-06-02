import * as React from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import OperationBlock from "./OperationBlock";
import { PostInfo } from "../declare/api/DAOApi";
import VideoBlockItem from "./VideoBlockItem";
import {useSelector,useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {updateState as globalUpdateState} from "../store/global";
import Models from "../declare/storeTypes";

type Props = {
  postInfo: PostInfo,
  isReTransfer?: boolean
};

const VideoBlock: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const { postInfo, isReTransfer } = props;
  const { contents, orig_contents, type, orig_type, dao } = postInfo;
  const [shieldStatus,setShieldStatus]=useState(true)
  const { ShieldAct} = useSelector((state: Models) => state.global);

  const Shield = () => {
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
      console.log(postInfo,'type2')
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
  }
  useEffect(()=>{
    Shield()
  },[ShieldAct])
  return (
    <View style={[styles.rowUserParent,{display:shieldStatus?'flex':'none'}]}>
      <VideoBlockItem postInfo={postInfo} isReTransfer={isReTransfer} showOperate={true} />
      <OperationBlock postInfo={postInfo} type={1}/>
      <View style={[styles.frameChild, styles.likeSpaceBlock]} />
    </View>
  );
};

const styles = StyleSheet.create({
  likeSpaceBlock: {
    marginTop: 14,
    alignSelf: "stretch",
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
    // marginTop: 10,
    backgroundColor: Color.color1,
    alignSelf: "stretch",
  },
});

export default VideoBlock;
