import React, { useEffect,  useState, } from 'react';
import {Modal,View, Text, StyleSheet, FlatList,Pressable, RefreshControl, ActivityIndicator, TouchableWithoutFeedback,TouchableOpacity, Image, TextInput,} from 'react-native';
import { Dimensions } from 'react-native';
import RedpacketApi from "../../services/RedpacketApi";
import Screens from "../../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {useResourceUrl, useUrl} from "../../utils/hook";
import {getChatsAvatarUrl} from "../../utils/util";
import {CometChat} from "@cometchat-pro/react-native-chat";
export type Props = {
    claimResStatus:boolean,
    setClaimResStatus:Function,
    id:string,
    senderName:string,
    messageInfo:CometChat.BaseMessage,
    setRedStatus:Function
};

const ClaimRes: React.FC<Props> = (props) => {
    const {claimResStatus,setClaimResStatus,id,senderName,messageInfo,setRedStatus}=props
    const url = useUrl();
    const navigation = useNavigation();
    const status=false
    const [state,setState]=useState(status)
    const [redId,setRedId]=useState('')
    const [loding,setLoding]=useState(false)
    const avatarsResUrl = useResourceUrl('avatars');
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const todetails =  () => {
        // @ts-ignore
        navigation.navigate(Screens.ClaimDetails,{id:redId})
        setClaimResStatus(false)
    }
    const toopen = async () => {
        setLoding(true)
        try{
            const request =  () => RedpacketApi.claimRedpacket(url,redId)
            const {data}= await request()
            setRedStatus(1)
            if(data.code==0){
                setClaimResStatus(false)
                setLoding(false)
                // @ts-ignore
                navigation.navigate(Screens.ClaimDetails,{id:redId})
            }
        } catch (e) {
            setRedStatus(1)
            setLoding(false)
            setState(!state)
    }
    }
    useEffect(()=>{
        setRedId(id)
    },[id])
    return (
        <Modal
            visible={claimResStatus}
            transparent
            animationType={'slide'}
        >
            <TouchableWithoutFeedback onPress={()=>setClaimResStatus(false)}>
                <View style={[styles.container,{width:Width,height:Height}]}>
                    <TouchableWithoutFeedback>
                    <View style={{width:0.75 * Width,height:0.65 * Height}}>
                        <View style={[styles.redpackBody,{width:0.75 * Width,height:0.65 * 0.88 * Height,borderRadius: 0.75 * Width * 0.1}]}>
                            <View style={[styles.redpackHead,{shadowOffset:{width:0,height:0.65 * 0.88 * Height * 0.006},height: 0.65 * 0.88 * Height * 0.8,borderBottomRightRadius:0.65 * 0.88 * Height * 0.4,borderBottomLeftRadius: 0.65 * 0.88 * Height * 0.4,top:-0.65 * 0.88 * Height * 0.4 }]}>
                            </View>
                            <View style={[styles.msgbox,{top:0.65 * 0.88 * Height * 0.4 - (0.75 * Width * 0.25 * 0.5)}]}>
                                <View style={styles.flex}>
                                    <View style={[styles.avatarbox,styles.flex,{width: 0.75 * Width * 0.25,height:0.75 * Width * 0.25,borderRadius:0.75 * Width * 0.25 * 0.5}]}>
                                        <Image style={[{width: 0.75 * Width * 0.25 * 0.7,height:0.75 * Width * 0.25 * 0.7,borderRadius:0.75 * Width * 0.25 * 0.7 * 0.5}]} source={{uri:`${avatarsResUrl}/${getChatsAvatarUrl(messageInfo.getSender().getAvatar())}`}}></Image>
                                    </View>
                                </View>
                                <View style={{marginTop:0.75 * Width * 0.25 * 0.7 * 0.1}}>
                                    <Text style={[styles.nametext,{fontSize:0.75 * Width * 0.25 * 0.7*0.3}]}>{senderName}</Text>
                                </View>
                                <View style={[{marginTop:0.75 * Width * 0.25 * 0.7 * 0.2},styles.flex]}>
                                    <Text style={[styles.noticetext,{fontSize:0.75 * Width * 0.25 * 0.7*0.3 }]}>It has been collected completely </Text>
                                </View>
                            </View>
                            <View style={[styles.todetails,styles.bottom,{display: state?'flex':'none'}]}>
                                <Pressable onPress={todetails} style={styles.textres}>
                                    <Text style={styles.nametext}>View claim{'\u0020'}details{'\u0020'}</Text>
                                    <Image
                                        style={{width:0.75 * Width * 0.25*0.7*0.5*0.5,height:0.75 * Width * 0.25*0.7*0.5*0.5}}
                                        resizeMode="contain"
                                        source={require("../../assets/right-vector.png")}
                                    />
                                </Pressable>
                            </View>
                            <View style={[styles.todetails,styles.bottom,{display: !state?'flex':'none'}]}>
                                <View style={[styles.openBox1,styles.flex,{width: 0.75 * Width * 0.25,height: 0.75 * Width * 0.25,borderRadius: 0.75 * Width * 0.25 *0.5}]}>
                                    <Pressable onPress={toopen}>
                                        <View style={[styles.openBox2,{width: 0.75 * Width * 0.25 *0.7,height: 0.75 * Width * 0.25*0.7,borderRadius: 0.75 * Width * 0.25*0.7*0.5},styles.flex]}>
                                            <Text style={[styles.opentext,{fontSize:0.75 * Width * 0.25*0.7*0.5*0.5}]}>{loding?'Loding':'Open'}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.close,{position:"absolute",bottom:0},styles.flex]}>
                            <TouchableOpacity onPress={()=>setClaimResStatus(false)}><Image
                                resizeMode={"contain"}
                                style={styles.closeimg}
                                source={require("../../assets/xCircle.png")}
                            />
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    textres:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    closeimg:{
        height:"60%"
    },
    close:{
        width:'100%',
        height:'12%'
    },
    opentext:{
        color:'#FFFFFF',
        fontWeight:"600",
        textAlign:'center',
    },
    openBox1:{
        backgroundColor:'#FA4D26'
    },
    openBox2:{
        backgroundColor:'#FF8D1A'
    },
    todetails:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
    },
    bottom:{
      position:'absolute',
      bottom:'5%'
    },
    noticetext:{
        color:'#FF8D1A',
        textAlign:'center',
        width:'80%'
    },
    nametext:{
        color:'white',
        textAlign:'center',
    },
    flex:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center'
    },
    avatarbox:{
        backgroundColor:'#FF8D1A'
    },
    msgbox:{
        width:"100%",
        position:"absolute",
    },
    redpackHead:{
        width:'100%',
        backgroundColor:'orange',
        position:'absolute',
        elevation: 5,
        shadowColor:'black',
        shadowOpacity: 0.6,
        shadowRadius: 5,
    },
    redpackBody:{
        backgroundColor:'#E0362B',
        overflow:'hidden'
    },
    container:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        zIndex:2,
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})
export default ClaimRes