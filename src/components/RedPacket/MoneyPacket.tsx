import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import BottomSheetModal from "../BottomSheetModal";

import {useNavigation} from "@react-navigation/native";
import {Border, Color, FontSize, Padding} from "../../GlobalStyles";
import FavorDaoButton from "../FavorDaoButton";


export type Props ={
   visible:boolean,
    setVisible:any
}


const MoneyPacket = ({visible, setVisible}: Props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [psw,setPsw] = useState('')

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
                    <View style={styles.BalanceBox}>
                        <Text style={styles.BalanceText}>
                            Balance
                        </Text>
                    </View>
                    <View style={styles.favTBox}>
                        <Text style={styles.favTSum}>
                            234.20
                        </Text>
                        <Text style={styles.favtText}>
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
                    ></TextInput>
                </View>
                <FavorDaoButton
                    isLoading={loading}
                    textValue="Confirm"
                    frame1171275771BackgroundColor="#ff8d1a"
                    cancelColor="#fff"
                />
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
        color:'#939393',
        textAlign:'center'
    },
   BalanceBox:{

   } ,
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
