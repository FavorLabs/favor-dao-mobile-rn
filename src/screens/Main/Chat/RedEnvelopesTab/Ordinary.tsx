import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable,} from "react-native";
import TextInputBlock from "../../../../components/TextInputBlock";
import FavorDaoButton from "../../../../components/FavorDaoButton";
import {useMemo, useState} from "react";
import MoneyPacket from "../../../../components/RedPacket/MoneyPacket";


type Props ={
    route:any
};

const Ordinary: React.FC<Props> = (props) => {
    const {route}=props
    const {memberCount, sendCustomMessage}=route.params
    const [luckyModal,setLuckyModal]=useState(false)
    const [LuckyPacketQuantitySum,setLuckyPacketQuantitySum]=useState('')
    const [TotalAmountSum,setTotalAmountSum]=useState('')
    const [wishes,setWishes]=useState('')
    const clearInp=()=>{
        setLuckyPacketQuantitySum('')
        setTotalAmountSum('')
        setWishes('')
    }
    const createDisable = useMemo(() => {
        return !(
            LuckyPacketQuantitySum.trim()!=='' && TotalAmountSum.trim()!==''&& wishes && LuckyPacketQuantitySum <= memberCount
        )
    }, [LuckyPacketQuantitySum,TotalAmountSum,wishes]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInputBlock
                    title={`OrdinaryPacket quantity`}
                    placeholder={`Please enter the quantity of ordinarypacket`}
                    value={LuckyPacketQuantitySum}
                    setValue={setLuckyPacketQuantitySum}
                    AdditionalInformation={`(There are ${memberCount} people in this group)`}
                />
                <TextInputBlock
                    title={'Total amount'}
                    placeholder={`Please enter the amounts                                FavT`}
                    value={TotalAmountSum}
                    setValue={setTotalAmountSum}
                />
                <TextInputBlock
                    title={'Best wishes'}
                    placeholder={`Please enter best wishes`}
                    value={wishes}
                    setValue={setWishes}
                />
                <View style={[styles.titleParent, styles.contentSpaceBlock]}>
                    <Text style={[styles.title3, styles.titleFlexBox]}>0.00</Text>
                </View>
            </ScrollView>
            <Pressable onPress={()=>setLuckyModal(true)} style={createDisable && { opacity: 0.5 }} disabled={createDisable}>
                <FavorDaoButton
                    textValue="Insert money"
                    frame1171275771BackgroundColor="#ff564f"
                    cancelColor="#fff"
                />
            </Pressable>
            <MoneyPacket visible={luckyModal}
                         type={3}
                         setVisible={setLuckyModal}
                         redPacketType={1}
                         title={wishes}
                         amount={TotalAmountSum}
                         total={LuckyPacketQuantitySum}
                         clearInp={clearInp}
                         sendCustomMessage={sendCustomMessage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"#F8F8F8"
    },
    titleParent: {
        paddingBottom: 143,
        marginTop: 20,
    },
    titleFlexBox: {
        textAlign: "center",
        color:"#000",
        marginBottom:25
    },
    contentSpaceBlock: {
        paddingHorizontal: 16,
        alignSelf: "stretch",
    },
    title3: {
        fontSize: 60,
        letterSpacing: -1,
        fontWeight: "700",
        height: 59,
        alignSelf: "stretch",
    },
});

export default Ordinary;