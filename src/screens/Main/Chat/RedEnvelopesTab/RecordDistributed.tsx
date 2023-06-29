import * as React from "react";
import RecordFavTSum from "../../../../components/RedPacket/RecordFavTSum";
import {useEffect, useState} from "react";
import {useResourceUrl, useUrl} from "../../../../utils/hook";
import RedpacketApi from "../../../../services/RedpacketApi";
import ChatChannel from "../../../../components/RedPacket/ChatChannel";
import {getTime} from "../../../../utils/util";
import {ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Screens from "../../../../navigation/RouteNames";
import {useNavigation} from "@react-navigation/native";
const RecordDistributed = () => {
    const navigation = useNavigation();
    const [userData,setUserData]=useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [page,setPage]=useState(1)
    const [loading, setLoading] = useState(false);
    const [total_rows,setTotal_rows]=useState(0)
    const year =new Date().getFullYear()
    const [years,setYears]=useState(year)
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const avatarsResUrl = useResourceUrl('avatars');
    const url = useUrl();
    const getRedPacketUser=async ()=>{
        const request =  () => RedpacketApi.getMySendList(url,{year:years,page:1})
        const res= await request()
        if(res.data.code==0){
            // @ts-ignore
            await setUserData(() => [...res.data.data.list])
            await setIsLoadingMore(
                true
            );
            setTotal_rows(res.data.data.pager.total_rows)
            await setPage(2)
        }else {
            console.log('getRedPacketUser Failed')
        }
    }
    const loadMore = async () => {
        const request =  () => RedpacketApi.getMySendList(url,{year:years,page:page})
        const res= await request()
        if(res.data.code==0){
            // @ts-ignore
            await setUserData([...userData,...res.data.data.list])
            await setIsLoadingMore(
                res.data.data.pager.total_rows > page * 10,
            );
            await setPage(page+1)
        }else {
            console.log('loadMore Failed')
        }
    }
    const handleLoadMore = async () => {
        if (isLoadingMore && !loading) {
            setLoading(true);
            await loadMore();
            setLoading(false);
        }
    };
    const renderItem = (item:any) => {
        return (
            <TouchableOpacity  onPress={()=> {
                // @ts-ignore
                navigation.push(Screens.ClaimDetails,{unToRecord:true,id:item.id})}}>
            <ChatChannel
                isShowAvatar={false}
                avatar={{uri:`${avatarsResUrl}/${item.user_avatar}`}}
                channelName={item.title}
                isLuckKing={false}
                amount={item.amount}
                time={getTime(item.modified_on)}
                record={`${item.refund_status?'Expired':''} ${item.claim_count}/${item.total}`}
            />
            </TouchableOpacity>
        );
    }
    const onRefresh = async () => {
        await setRefreshing(true);
        await getRedPacketUser();
        await setRefreshing(false);
    };
    useEffect(()=>{
        getRedPacketUser()
    },[years])
    return(
        <>
            <RecordFavTSum type={1} setYears={setYears} years={years}/>
            <Text style={[styles.text,{display:'flex'}]}> Distributed a total of {total_rows} luckypackets</Text>
            <View style={styles.body}>
                    <FlatList
                        data={userData}
                        // @ts-ignore
                        renderItem={({item})=>{
                            // @ts-ignore
                            return <>{renderItem(item)}</>
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={() => (
                            <>
                                {
                                    loading &&
                                    <View style={styles.footer}>
                                        <ActivityIndicator size="large"/>
                                    </View>
                                }
                            </>
                        )}
                        // @ts-ignore
                        keyExtractor={(item,index) => item.id+`${index}`}
                    />
                </View>
        </>
    )
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:'#FFFFFF',
        flex:1
    },
    text:{
        textAlign:'center',
        fontSize:15,
        color:'#939393',
        fontWeight:"400",
        backgroundColor:'#FFF'
    },
    footer: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default RecordDistributed