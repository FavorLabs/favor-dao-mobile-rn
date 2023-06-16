import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import BottomSheetModal from "../BottomSheetModal";

import {useNavigation} from "@react-navigation/native";
import {Border, Color, FontSize, Padding} from "../../GlobalStyles";
import FavorDaoButton from "../FavorDaoButton";
import WalletController from "../../libs/walletController";

import RedpacketApi from "../../services/RedpacketApi";
import {useUrl} from "../../utils/hook";
import {toNumber} from "lodash";
import Toast from "react-native-toast-message";
import {addDecimal} from "../../utils/balance";
import UserApi from "../../services/DAOApi/User";
import {CometChat} from "@cometchat-pro/react-native-chat";
import sendCustomMessage = CometChat.sendCustomMessage;


export type Props ={
   visible:boolean,
    setVisible:any,
    // fn?: <T=any>(data: T) => void
    fn?: () => void
    // signType?: number
    // type: 'password' | 'm' | 'sign'
    type?: number
    psd?: () => void
    redPacketType:number
    title:string
    amount:string
    total:string
    clearInp?:()=>void
    sendCustomMessage:Function
}

const MoneyPacket = ({visible, setVisible,fn, type, psd,redPacketType,total,title,amount,clearInp,sendCustomMessage}: Props) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const totalToNumber=useMemo(()=> toNumber(total),[total])
    const [balance, setBalance] = useState<string>('0');
    const showAmount=useMemo(()=>
    {
        if (redPacketType==0){
           return  toNumber(amount)
        }else{
            return  toNumber(total)*toNumber(amount)
        }

    }
        ,[total,amount])

    const getBalance = async () => {
        try {
            const {data} = await UserApi.getAccounts(url);
            setBalance(data.data[0].balance)
        } catch (e) {
            if (e instanceof Error)
                Toast.show({
                    type: 'error',
                    // @ts-ignore
                    text1: e.message,
                });
        }
    }
    const url = useUrl();
    const confirm = async () => {
        try {
                const privateKey = WalletController.exportPrivateKey(password);
                const auth =  await WalletController.getSignatureData(privateKey, type);
                const res={
                    auth:{
                        ...auth,
                        type:'wallet_connect'
                    },
                    type:redPacketType,
                    title:title,
                    amount:amount,
                    total:totalToNumber
                }
                console.log(res,'创建数据')
                const request =  () => RedpacketApi.creatRedpacket(url,res)
                const {data}= await request()
                if (data.code==0){
                    console.log(data.data.redpacket_id,title,'6666')
                    sendCustomMessage({id:data.data.redpacket_id,title:title})
                    Toast.show({
                        type: 'info',
                        text1: 'Send success!'
                    });
                    navigation.goBack()
                    }else {
                    Toast.show({
                        type: 'error',
                        text1: 'Send faild!'
                    });
                    setVisible(false)
                }
        } catch (e){
            if (e instanceof Error)
            {
                Toast.show({
                    type: 'error',
                    text1: e.message
                });
            }
            console.log(e)
        }
    }
    useEffect(() => {
        getBalance()
    }, [])
    return <View style={styles.body}>
        <BottomSheetModal
            height={'50%'}
            visible={visible}
            setVisible={setVisible}
            bgColor={'#F8F8F8'}
        >
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>For luckypacket</Text>
                <View style={styles.bodyText}>
                    <View>
                        <Text style={styles.BalanceText}>
                          Amount of money
                        </Text>
                    </View>

                    <View style={styles.favTBox}>
                        <Text style={styles.favTSum}>
                            {showAmount}
                        </Text>
                        <Text style={styles.favtText}>
                            FavT
                        </Text>
                    </View>
                    <View style={styles.BalanceBox}>
                            <Text style={styles.BalanceText}>
                                Balance :
                            </Text>
                            <Text style={[styles.BalanceText,styles.BalanceText1]}>
                                { addDecimal(balance) }
                            </Text>
                            <Text style={styles.BalanceText}>
                                FavT
                            </Text>
                    </View>
                </View>
                <View style={styles.pswBox}>
                    <Text style={styles.pswText}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.textInp}
                        placeholder={'Please enter password here'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    ></TextInput>
                </View>
                <Pressable onPress={confirm}>
                    <FavorDaoButton
                        textValue="Confirm"
                        frame1171275771BackgroundColor="#ff8d1a"
                        cancelColor="#fff"
                    />
                </Pressable>
            </ScrollView>
        </BottomSheetModal>
    </View>
};
const styles = StyleSheet.create({
    body:{
      backgroundColor:"red"
    },
    pswText:{
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        color: Color.iOSSystemLabelsLightPrimary,
        display: "flex",
        width: '100%',
        alignItems: "center",
        marginBottom:4
    },
    pswBox:{
        marginBottom:22
    },
    textInp:{
        marginTop: 10,
        height:57,
        backgroundColor: '#FFF',
        borderRadius: Border.br_3xs,
        padding: Padding.p_smi,
        paddingTop: Padding.p_smi,
    },
    scroll:{
        marginLeft:15,
        marginRight:15,
        marginTop:15
    },
    favtText:{
        fontSize:16,
        height:16,
        position:'absolute',
        bottom:13,
        right:"13%"
    },
    favTSum:{
        fontSize: 60,
        fontWeight: "700",
    },
    favTBox:{
        marginTop:8,
        display:"flex",
        alignItems:'center'
    },
    BalanceText:{
        fontSize:16,
        textAlign:'center',
        marginLeft:5,
        marginRight:5
    },
    BalanceText1:{
        color:'#FF8D1A',
        fontWeight:'700'
    },
    BalanceBox:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        backgroundColor:'white',
        borderRadius:10
    },
    Balance:{

    },
    bodyText:{
        marginTop:23
    },
    title: {
        textAlign: "left",
        letterSpacing: 0,
        fontSize: 26,
        fontWeight: "600",
        color: Color.iOSSystemLabelsLightPrimary,
        display: "flex",
        width: '100%',
        alignItems: "center"
    },

});

export default MoneyPacket;