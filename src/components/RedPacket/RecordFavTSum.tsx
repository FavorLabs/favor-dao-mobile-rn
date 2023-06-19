
import * as React from "react";
import {ScrollView, StyleSheet, Text, View, Image} from "react-native";
import {useResourceUrl, useUrl} from "../../utils/hook";
import {useSelector} from "react-redux";
import Models from "../../declare/storeTypes";
import RedpacketApi from "../../services/RedpacketApi";
import {useEffect, useState} from "react";
export type Props = {
    type:number
};
const RecordFavTSum :React.FC<Props> = (props) => {
    const {type}=props
    const url = useUrl();
    const avatarsResUrl = useResourceUrl('avatars');
    const {user} = useSelector((state: Models) => state.global);
    const [receivedSum,setReceivedSum]=useState(0)
    const [distributedSum,setDistributedSum]=useState(0)
    const getReceivedSum=async ()=>{
        const request =  () => RedpacketApi.getUserClaims(url,{year:2023})
        const res= await request()
        if(res.data.code==0){
            setReceivedSum(res.data.data.total_amount)
        }else {
            console.log('getReceivedSum Failed')
        }
    }
    const getDistributedSum=async ()=>{
        const request =  () => RedpacketApi.getUserSends(url,{year:2023})
        const res= await request()
        if(res.data.code==0){
            setDistributedSum(res.data.data.total_amount)
        }else {
            console.log('getReceivedSum Failed')
        }
    }
    useEffect(()=>{
        getReceivedSum()
        getDistributedSum()
    },[])
return (
    <View style={styles.body}>
        <View style={styles.yearNum}>
            <Text style={styles.yearText}>2023</Text>
        </View>
        <View style={styles.imgBox}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri: `${avatarsResUrl}/${user?.avatar}`}}
            />
        </View>
        <View style={styles.descriptionTextBox}>
          <Text style={styles.descriptionText}>
            Andrew Parker received a total of
          </Text>
        </View>
        <View style={styles.favTBox}>
            {
                type == 0 &&
                <Text style={styles.favTSum}>
                    {receivedSum}
                </Text>
            }
            {
                type == 1 &&
                <Text style={styles.favTSum}>
                    {distributedSum}
                </Text>
            }
          <Text style={styles.favtText}>
            FavT
          </Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    image:{
        width:70,
        height:70,
        borderRadius:70,
    },
    imgBox:{
        height:70,
        alignItems:'center',
        marginTop:20,
        marginBottom:20
    },
    descriptionText:{
        fontSize:18,
        textAlign:'center'
    },
    descriptionTextBox:{
        marginTop:5
    },
    yearNum:{
        marginTop:20,
        marginRight:15
    },
    yearText:{
        color:"#FF8D1A",
        textAlign:'right',
        fontSize:21
},
    body:{
        backgroundColor:"#F8F8F8"
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
        alignItems:'center',
        marginBottom:32
    }
});

export default RecordFavTSum;
