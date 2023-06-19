import * as React from "react";
import RecordFavTSum from "../../../../components/RedPacket/RecordFavTSum";
import {FlatList, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator} from "react-native";
import ChatChannel from "../../../../components/RedPacket/ChatChannel";
import {getTime} from "../../../../utils/util";
import {useEffect, useState,} from "react";
import {useResourceUrl, useUrl} from "../../../../utils/hook";
import RedpacketApi from "../../../../services/RedpacketApi";
import Toast from "react-native-toast-message";
const RecordReceived = () => {
    const [userData,setUserData]=useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [page,setPage]=useState(1)
    const [loading, setLoading] = useState(false);
    const avatarsResUrl = useResourceUrl('avatars');
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const url = useUrl();
    const getRedPacketUser=async ()=>{
        const request =  () => RedpacketApi.getMyClaimList(url,{year:2023})
        const res= await request()
        if(res.data.code==0){
            setUserData(res.data.data.list)
            setPage(page+1)
        }else {
            console.log('getRedPacketUser Failed')
        }
    }
    const loadMore = async () => {
        const request =  () => RedpacketApi.getMyClaimList(url,{year:2023,page:page,page_size:5})
        const res= await request()
        if(res.data.code==0){
            // @ts-ignore
            setUserData([...userData,...res.data.data.list])
            setPage(page+1)
        }else {
            console.log('loadMore Failed')
        }
    }
    const handleLoadMore = async () => {
        if (isLoadingMore && !loading) {
            setLoading(true);
            // await sleep(2000);
            await loadMore();
            setLoading(false);
        }
    };
    const renderItem = (item:any) => {
        return (
            <ChatChannel
                avatar={{uri:`${avatarsResUrl}/${item.user_avatar}`}}
                channelName={item.user_nickname}
                isLuckKing={false}
                amount={item.amount}
                time={getTime(item.modified_on)}
            />
        );
    }
    const onRefresh = async () => {
        setRefreshing(true);
        await getRedPacketUser();
        setRefreshing(false);
    };
    useEffect(()=>{
        getRedPacketUser()
    },[])
    return(
        <>
        <RecordFavTSum type={0}/>
        <ScrollView >
        <View style={styles.body}>
            <Text style={[styles.text,{display:'flex'}]}> Received a total of {userData.length} luckypackets</Text>
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
                keyExtractor={item => item.id}
            />
        </View>
        </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:'#FFFFFF'
    },
    text:{
        textAlign:'center',
        fontSize:15,
        color:'#939393',
        fontWeight:"400"
    },
    footer: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default RecordReceived