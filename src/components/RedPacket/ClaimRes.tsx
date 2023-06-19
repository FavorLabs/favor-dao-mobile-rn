import React, { useEffect,  useState, } from 'react';
import {Modal,View, Text, StyleSheet, FlatList,Pressable, RefreshControl, ActivityIndicator, TouchableOpacity, Image, TextInput,} from 'react-native';
import { Dimensions } from 'react-native';
import RedpacketApi from "../../services/RedpacketApi";
import Screens from "../../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
import {useUrl} from "../../utils/hook";
import Toast from "react-native-toast-message";
import {stat} from "react-native-fs";
import {isLoading} from "expo-font";
export type Props = {
    claimResStatus:boolean,
    setClaimResStatus:Function,
    id:string
};

const ClaimRes: React.FC<Props> = (props) => {
    const {claimResStatus,setClaimResStatus,id}=props
    const url = useUrl();
    const navigation = useNavigation();
    const status=false
    const [state,setState]=useState(status)
    const [redId,setRedId]=useState('')
    const [loding,setLoding]=useState(false)
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
            if(data.code==0){
                setClaimResStatus(false)
                setLoding(false)
                // @ts-ignore
                navigation.navigate(Screens.ClaimDetails,{id:redId})
            }
        } catch (e) {
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
       <View style={[styles.container,{width:Width,height:Height}]}>
           <View style={styles.body}>
               <View style={styles.redpackbody}>
                   <View style={styles.redpackHead}>
                   </View>
                   <View style={styles.msgbox}>
                       <View style={styles.flex}>
                           <View style={[styles.avatarbox,styles.flex]}>
                               <Image style={styles.avatar} source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}></Image>
                           </View>
                       </View>
                       <View style={styles.name}>
                           <Text style={styles.nametext}>Andrew parker</Text>
                       </View>
                       <View style={[styles.notice,styles.flex]}>
                           <Text style={styles.noticetext}>It has been collected completely </Text>
                       </View>
                   </View>
                           <View style={[styles.todetails,styles.bottom,{display: state?'flex':'none'}]}>
                               <Pressable onPress={todetails} style={styles.textres}>
                               <Text style={styles.nametext}>View claim details</Text>
                                   <Image
                                       style={styles.icon}
                                       resizeMode="cover"
                                       source={require("../../assets/setting-right-icon.png")}
                                   />
                               </Pressable>
                           </View>
                           <View style={[styles.todetails,styles.bottom,{display: !state?'flex':'none'}]}>
                               <View style={[styles.openBox1,styles.flex]}>
                                   <View style={[styles.openBox2,styles.flex]}>
                                       <Pressable onPress={toopen}>
                                       <Text style={styles.opentext}>{loding?'Loding...':'Open'}</Text>
                                       </Pressable>
                                   </View>
                               </View>
                           </View>
               </View>

                   <View style={[styles.close,{position:"absolute",bottom:0},styles.flex]}>
                       <TouchableOpacity onPress={()=>setClaimResStatus(false)}>
                       <Image
                           resizeMode={"contain"}
                           style={styles.closeimg}
                           source={require("../../assets/xCircle.png")}
                       />
                       </TouchableOpacity>
                   </View>

           </View>
       </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    textres:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        height:14,
        width:14
    },
    closeimg:{
        height:"60%"
    },
    close:{
        width:'100%',
        height:'12%'
    },
    opentext:{
        fontSize:16,
        color:'#FFFFFF',
        fontWeight:"600",
        textAlign:'center'
    },
    openBox1:{
      width:94,
        height:94,
        borderRadius:47,
        backgroundColor:'#FA4D26'
    },
    openBox2:{
        width:74,
        height:74,
        borderRadius:37,
        backgroundColor:'#FF8D1A'
    },
    todetails:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'center',
        width:'100%'
    },
    bottom:{
      position:'absolute',
      bottom:'5%'
    },
    noticetext:{
        fontSize:14,
        color:'#FF8D1A',
        textAlign:'center',
        width:'80%'
    },
    notice:{
        marginTop:20
    },
    nametext:{
        fontSize:14,
        color:'white',
        textAlign:'center'
    },
    name:{
      marginTop:10
    },
    avatar:{
      width:46,
      height:46,
        borderRadius:23
    },
    flex:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center'
    },
    avatarbox:{
        width:66,
        height:66,
        borderRadius:33,
        backgroundColor:'#FF8D1A'
    },
    msgbox:{
        width:"100%",
        position:"absolute",
        top:210-33,
    },
    redpackHead:{
        height:370,
        width:'100%',
        backgroundColor:'orange',
        borderBottomRightRadius:140,
        borderBottomLeftRadius:140,
        position:'absolute',
        top:-160
    },
    redpackbody:{
        width:'100%',
        height:'88%',
        backgroundColor:'#E0362B',
        borderRadius:30,
        overflow:'hidden'
    },
    body:{
        width:'75%',
        height:'65%',
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