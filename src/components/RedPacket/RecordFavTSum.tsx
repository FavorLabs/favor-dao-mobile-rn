
import * as React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    Pressable,
    Dimensions,
    FlatList,
    RefreshControl, ActivityIndicator
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useResourceUrl, useUrl} from "../../utils/hook";
import {useSelector} from "react-redux";
import Models from "../../declare/storeTypes";
import RedpacketApi from "../../services/RedpacketApi";
import {useEffect, useState} from "react";
import ChatChannel from "./ChatChannel";
import {getTime} from "../../utils/util";
import {addDecimal} from "../../utils/balance";
export type Props = {
    type:number
    setYears:Function,
    years:number
};
const RecordFavTSum :React.FC<Props> = (props) => {
    const {type,setYears,years} = props
    const url = useUrl();
    const year =new Date().getFullYear()
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const avatarsResUrl = useResourceUrl('avatars');
    const {user} = useSelector((state: Models) => state.global);
    const [receivedSum,setReceivedSum]=useState(0)
    const [distributedSum,setDistributedSum]=useState(0)
    const [pickerStatus,setPickerStatus]=useState(false)
    const [loding,setLoding]=useState(false)

    const getReceivedSum=async ()=>{
        await setLoding(true)
        const request =  () => RedpacketApi.getUserClaims(url,{year:years})
        const res= await request()
        if(res.data.code==0){
            await setReceivedSum(res.data.data.total_amount)
            await setLoding(false)
        }else {
            console.log('getReceivedSum Failed')
            await setLoding(false)
        }
    }
    const getDistributedSum=async ()=>{
        await setLoding(true)
        const request =  () => RedpacketApi.getUserSends(url,{year:years})
        const res= await request()
        if(res.data.code==0){
            await setDistributedSum(res.data.data.total_amount)
            await setLoding(false)
        }else {
            console.log('getReceivedSum Failed')
            await setLoding(false)
        }
    }
    useEffect(()=>{
        getReceivedSum()
        getDistributedSum()
    },[years])
return (
    <View style={styles.body}>
        <Pressable style={styles.yearNum} onPress={()=>setPickerStatus(true)}>
            <Text style={styles.yearText}>{years}</Text>
        </Pressable>
        <View style={styles.imgBox}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri: `${avatarsResUrl}/${user?.avatar}`}}
            />
        </View>
        <View style={styles.descriptionTextBox}>
          <Text style={styles.descriptionText}>
              {user?.nickname} received a total of
          </Text>
        </View>
        <View style={styles.favTBox}>
            {
                type == 0 && !loding &&
                <Text style={styles.favTSum}>
                    {
                        // @ts-ignore
                        parseFloat(receivedSum)/1000
                    }
                    {'\u0020'}
                    <Text style={styles.favtText}>
                         FavT
                    </Text>
                </Text>
            }
            {
                type == 1 && !loding &&
                <Text style={styles.favTSum}>
                    {
                        // @ts-ignore
                        parseFloat(distributedSum)/1000
                    }
                    {'\u0020'}
                    <Text style={styles.favtText}>
                        FavT
                    </Text>
                </Text>
            }
            {
                loding &&
                <View>
                    <Text style={{textAlign:'center',marginTop:"35%",fontSize:25,marginBottom:15}}>Loding...</Text>
                    <ActivityIndicator size="large" color="block" />
                </View>
            }
        </View>
        <Modal
            visible={pickerStatus}
            transparent
            animationType={'slide'}
        >
            <View style={[styles.yearPickerBox,{width:Width,height:Height,backgroundColor:'rgba(0,0,0,0.2)'}]}>
                <Picker
                    selectedValue={years}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                        setYears(itemValue)
                        setPickerStatus(false)
                    }
                }
                    style={styles.yearPicker}

                >
                    <Picker.Item label={`${year}`} value={year} color={'#0078FF'} />
                    <Picker.Item label={`${year-1}`} value={year-1} color={'#0078FF'}/>
                    <Picker.Item label={`${year-2}`} value={year-2} color={'#0078FF'}/>
                </Picker>
            </View>
            </Modal>
    </View>
);
};

const styles = StyleSheet.create({
    yearPickerBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    yearPicker:{
       backgroundColor:'rgb(255,255,255)',
        borderRadius:50,
        width:'60%',
        color:'#0078FF33'
    },
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
        textAlign:'center',
        fontSize:20
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
        fontSize:20,
        fontWeight:'normal'
    },
    favTSum:{
        fontSize: 40,
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
