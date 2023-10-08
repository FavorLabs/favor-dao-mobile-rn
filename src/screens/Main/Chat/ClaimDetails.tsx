import * as React from "react";
import {FlatList, Image, ScrollView, RefreshControl,StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import ChatChannel from "../../../components/RedPacket/ChatChannel";
import {Color, FontFamily, Padding, FontSize, Border} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import SvgIcon from "../../../components/SvgIcon";
import ClaimDetailsRight from "../../../assets/svg/claimDetailsRight.svg";
import {useResourceUrl, useUrl} from "../../../utils/hook";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import RedpacketApi from "../../../services/RedpacketApi";
import {useEffect, useMemo, useState} from "react";
import Toast from "react-native-toast-message";
import {useRoute} from "@react-navigation/native";
import {toNumber} from "lodash";
import {getTime} from "../../../utils/util";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import {strings} from "../../../locales/i18n";

const ClaimDetails = () => {
  const navigation = useNavigation();
  const url = useUrl();
  const route=useRoute()
  // @ts-ignore
  const {id, unToRecord=false} = route.params
  const [claimSumStatus,setClaimSumStatus]=useState(true)
  const [claimSum,setClaim]=useState('')
  const [claimCount,setClaimCount]=useState('')
  const [total,setTotal]=useState('')
  const [userData,setUserData]=useState([])
  const [senderName,setSenderName]=useState('')
  const [senderAvatar,setSenderAvatar]=useState('')
  const [type,setType]=useState(0)
  const [refundStatus,setRefundStatus]=useState(0)
  const [rPTitle,setRpTitle]=useState('')
  const [loading,setLoading]=useState(true)
  const showClaimSum=useMemo(()=>{
    return  parseFloat(claimSum)/1000
  },[claimSum])
  const getRedPacketInfo = async ()=>{
    try {
      const request =  () => RedpacketApi.getRedPacketInfo(url,id)
      const { data }= await request()
      if (data.code==0){
        setClaimCount(data.data.claim_count)
        setTotal(data.data.total)
        setType(data.data.type)
        setRpTitle(data.data.title)
        setSenderName(data.data.user_nickname)
        setSenderAvatar(data.data.user_avatar)
        setRefundStatus(data.data.refund_status)
        if(data.data.claim_amount){
          await setClaim(data.data.claim_amount)
          setLoading(false)
        }else {
          setClaimSumStatus(false)
          setLoading(false)
        }
      }else {
        Toast.show({
          type: 'error',
          text1: strings('ClaimDetails.Toast.QuestFailed')
        });
      }
    }catch (e){
      if (e instanceof Error) {
        console.log(e.message)
      }
      setLoading(false)
    }

  }
  const getRedPacketUser=async ()=>{
    const request =  () => RedpacketApi.getClai(url,id,{page:1,page_size:claimCount})
    const res= await request()
    if(res.data.code==0){
      setUserData(res.data.data.list)
    }else {
      Toast.show({
        type: 'error',
        text1: strings('ClaimDetails.Toast.QuestUserFailed')
      });
    }
  }
  const avatarsResUrl = useResourceUrl('avatars');
  const {user} = useSelector((state: Models) => state.global);

  const isMaxAmount=(amount:string)=>{
    let mix=0;
    userData.forEach((e,index)=>{
      // @ts-ignore
      const eAmount=toNumber(e.amount)
      if(index==0){
        mix=eAmount
      }else {
        if(eAmount-mix>0){
          mix=eAmount
        }
      }
    })
    if(toNumber(amount)==mix){
      return true
    }
  }
  const renderItem = (item:any,isMax:boolean) => {
    return (
        <ChatChannel
            avatar={{uri:`${avatarsResUrl}/${item.user_avatar}`}}
            channelName={item.user_nickname}
            isLuckKing={isMax}
            amount={item.amount}
            time={ item.modified_on ? getTime(Math.floor(item.modified_on)) : getTime(Math.floor(Date.now() / 1000))}
        />
    );
  }
  useEffect(()=>{
    getRedPacketInfo()
  },[])
  useEffect(()=>{
    getRedPacketUser()
  },[claimCount])
  return (
    <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FavorDaoNavBar title={strings('ClaimDetails.title')} rightComponent={
            <TouchableOpacity style={[styles.right,{display:unToRecord?'none':'flex'}]} onPress={
              ()=>{
                // @ts-ignore
                navigation.navigate(Screens.LuckyPacketRecord);
              }
            }>
              <SvgIcon svg={<ClaimDetailsRight/>}/>
            </TouchableOpacity>
          }/>
        </View>
        {
          loading &&
            <View>
              <Text style={{textAlign:'center',marginTop:"35%",fontSize:25,marginBottom:15}}>{strings('ClaimDetails.loading')}</Text>
              <ActivityIndicator size="large" color="#FF5530" />
            </View>
        }
        {
          !loading &&
            <View style={{flex:1}}>
              <View style={styles.redUser}>
                <View style={styles.frameContainer}>
                  <View style={[styles.imageWrapper, styles.wrapperSpaceBlock]}>
                    <Image
                        style={[styles.imageIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={{uri: `${avatarsResUrl}/${senderAvatar}`}}
                    />
                  </View>
                  <Text style={[styles.andrewParker, styles.titleTypo]}>{senderName}</Text>
                    <Text style={[styles.mayYouBe, styles.title1Typo,{maxWidth:'70%'}]}>
                      {rPTitle}
                  </Text>
                </View>
                <View style={[styles.favt,{display: claimSumStatus?'flex':'none'}]}>
                  <Text style={styles.favtNumber}>{showClaimSum}<Text style={styles.favtText}>{'\u0020'}FavT</Text></Text>
                </View>
              </View>

              <View style={styles.frameView}>
                <View style={[styles.titleWrapper, styles.frameGroupFlexBox]}>
                  {
                    refundStatus == 0 && <Text style={styles.title1Typo}>{strings('ClaimDetails.Received')}：{claimCount}/{total}</Text>
                  }
                  {
                    refundStatus == 1 && <Text style={styles.title1Typo}>{strings('ClaimDetails.expired')} {strings('ClaimDetails.Received')}：{claimCount}/{total}</Text>
                  }
                </View>
                <View style={styles.chatchannelParent}>
                  <FlatList
                      data={userData}
                      // @ts-ignore
                      renderItem={({item,index})=>{
                        let isMax=false
                        if(type == 0) {
                          // @ts-ignore
                          if(isMaxAmount(item.amount)){
                            isMax=true
                          }
                        }
                        // @ts-ignore
                        return <>{renderItem(item,isMax)}</>
                      }}
                      // @ts-ignore
                      keyExtractor={(item,index) => item.id+index}
                  />
                </View>
                <View style={[styles.bottomBox,{display:refundStatus==0?'none':'flex'}]}>
                  <Text style={styles.bottomText}>
                    {strings('ClaimDetails.Unclaimed')}
                  </Text>
                </View>
              </View>
            </View>
        }
      </View>
    </BackgroundSafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  redPacketTitle:{
    textAlign:"center",
    maxWidth:"80%",
    color:'#999999',
    marginTop:5,
  },
  bottomBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0
  },
  bottomText:{
    color:'#939393',
    fontSize:FontSize.size_mini,
    textAlign:'center',
    maxWidth:'70%',
  },
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Color.color2,
  },
  right: {
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color1,
  },
  frameParentFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  back1FlexBox: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
  },
  titleTypo: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "600",
    textAlign: "left",
    letterSpacing: 0,
  },
  wrapperSpaceBlock: {
    padding: Padding.p_3xs,
    flexDirection: "row",
  },
  frameGroupFlexBox: {
    paddingVertical: Padding.p_3xs,
    alignSelf: "stretch",
    alignItems: "center",
  },
  iconLayout: {
    height: 50,
    width: 50,
    borderRadius:50
  },
  title1Typo: {
    color: '#999999',
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontWeight: '400',
  },
  channelnameTypo: {
    fontWeight: "500",
    color: Color.iOSSystemLabelsLightPrimary,
    fontSize: FontSize.bodyBody17_size,
  },
  chevronLeftIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  back1: {
    color: Color.color2,
    fontWeight: '300',
    fontSize: FontSize.bodyBody17_size,
  },
  back: {
    width: 63,
    flexDirection: "row",
  },
  title: {
    marginLeft: 56,
    fontSize: FontSize.size_xl,
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "600",
    lineHeight: 22,
    flex: 1,
  },
  backParent: {
    paddingLeft: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  vectorIcon: {
    width: 18,
    height: 18,
  },
  vectorWrapper: {
    borderRadius: Border.br_xl,
    width: 38,
    backgroundColor: Color.color,
  },
  frameParent: {
    paddingRight: Padding.p_base,
    alignItems: "center",
    flex: 1,
  },
  placeholder: {
    marginLeft: -99,
    fontSize: FontSize.size_xl,
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: "600",
    lineHeight: 22,
    width: 63,
  },
  simpleheader: {
    // height: 90,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_5xs,
    alignItems: "flex-end",
    alignSelf: "stretch",
    backgroundColor: Color.color4,
  },
  imageIcon: {
    borderRadius: Border.br_5xs,
  },
  imageWrapper: {
    borderRadius: 75,
    backgroundColor: '#FF8D1A',
  },
  andrewParker: {
    marginTop: 5,
    fontSize: FontSize.bodyBody17_size,
  },
  mayYouBe: {
    marginTop: 5,
  },
  frameContainer: {
    alignItems: "center",
  },
  favtNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: '#FF8D1A',
    marginRight: 10,
  },
  favtText: {
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    color: '#FF8D1A',
  },
  favt: {
    display: "flex",
    flexDirection: 'row',
  },
  redUser: {
    paddingVertical: 20,
    backgroundColor: Color.color2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  titleWrapper: {
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.color1,
  },
  vectorIcon1: {
    width: 23,
    height: 25,
    display: "none",
  },
  iconwithbackground: {
    borderRadius: 25,
    backgroundColor: Color.color2,
    display: "none",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  channelname: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
    flex: 1,
  },
  lastmsgtime: {
    width: 70,
    marginLeft: 12,
    textAlign: "right",
    lineHeight: 18,
  },
  channelnamelLasttime: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  messageinfo: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    flex: 1,
  },
  lastmessage: {
    width: 202,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  chatchannelParent: {
    alignSelf: "stretch",
    paddingBottom:"13%"
  },
  channelinfoChild: {
    borderStyle: "solid",
    borderColor: "#c1c1c4",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 12,
    alignSelf: "stretch",
  },
  channelinfo: {
    marginLeft: 10,
    flex: 1,
  },
  channelitemwithseperator: {
    marginLeft: 8,
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
  frameView: {
    alignItems: "center",
    flex:1,
    paddingBottom:20,
    position:"relative"
  },
  background: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  seperator: {
    marginLeft: -66.5,
    bottom: 10,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.iOSSystemLabelsLightPrimary,
    width: 134,
    height: 5,
    position: "absolute",
  },
  homeIndicator: {
    width: 375,
    height: 34,
    marginTop: 20,
  },
});

export default ClaimDetails;
