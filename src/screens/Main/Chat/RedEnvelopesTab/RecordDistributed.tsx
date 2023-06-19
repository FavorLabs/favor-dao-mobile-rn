import * as React from "react";
import RecordFavTSum from "../../../../components/RedPacket/RecordFavTSum";
import {useEffect, useState} from "react";
import {useResourceUrl, useUrl} from "../../../../utils/hook";
import RedpacketApi from "../../../../services/RedpacketApi";
import ChatChannel from "../../../../components/RedPacket/ChatChannel";
import {getTime} from "../../../../utils/util";
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
const RecordDistributed = () => {
    const [userData,setUserData]=useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [page,setPage]=useState(1)
    const [loading, setLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const avatarsResUrl = useResourceUrl('avatars');
    const url = useUrl();
    const getRedPacketUser=async ()=>{
        const request =  () => RedpacketApi.getMySendList(url,{year:2023})
        const res= await request()
        if(res.data.code==0){
            setUserData(res.data.data.list)
            setPage(page+1)
        }else {
            console.log('getRedPacketUser Failed')
        }
    }
    const loadMore = async () => {
        const request =  () => RedpacketApi.getMySendList(url,{year:2023,page:page,page_size:5})
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
                record={`${item.refund_status?'Expired':''} ${item.claim_count}/${item.total}`}
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
            <RecordFavTSum type={1} />
            <ScrollView >
                <View style={styles.body}>
                    <Text style={[styles.text,{display:'flex'}]}> Distributed a total of {userData.length} luckypackets</Text>
                    <FlatList
                        data={userData}
                        // @ts-ignore
                        renderItem={({item})=>{
                            // @ts-ignore
                            return <>{renderItem(item)}</>
                        }}
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
export default RecordDistributed