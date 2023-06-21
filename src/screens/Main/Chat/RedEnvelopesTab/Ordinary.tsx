import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable,} from "react-native";
import TextInputBlock from "../../../../components/TextInputBlock";
import FavorDaoButton from "../../../../components/FavorDaoButton";
import {useEffect, useMemo, useState} from "react";
import MoneyPacket from "../../../../components/RedPacket/MoneyPacket";
import UserApi from "../../../../services/DAOApi/User";
import Toast from "react-native-toast-message";
import {addDecimal} from "../../../../utils/balance";
import {string} from "prop-types";
import {useUrl} from "../../../../utils/hook";


type Props ={
    route:any
};

const Ordinary: React.FC<Props> = (props) => {
    const {route}=props
    const {memberCount, sendCustomMessage}=route.params
    const [luckyModal,setLuckyModal]=useState(false)
    const [LuckyPacketQuantitySum,setLuckyPacketQuantitySum]=useState('')
    const [TotalAmountSum,setTotalAmountSum]=useState('')
    const [balance, setBalance] = useState<string>('0');
    const [wishes,setWishes]=useState('')
    const url = useUrl();
    const amountSum=useMemo(()=>{
        // @ts-ignore
        return LuckyPacketQuantitySum * TotalAmountSum
    },[LuckyPacketQuantitySum,TotalAmountSum])
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
    const clearInp=()=>{
        setLuckyPacketQuantitySum('')
        setTotalAmountSum('')
        setWishes('')
    }
    function isPositiveInt(str:string) {
        return /^[1-9]\d*$/.test(str);
    }
    const createDisable = useMemo(() => {
        return !(
            // @ts-ignore
            !((LuckyPacketQuantitySum * TotalAmountSum) > addDecimal(balance)) && isPositiveInt(TotalAmountSum) && LuckyPacketQuantitySum.trim()!=='' && TotalAmountSum.trim()!=='' && isPositiveInt(LuckyPacketQuantitySum)  && wishes && LuckyPacketQuantitySum <= memberCount
        )
    }, [LuckyPacketQuantitySum,TotalAmountSum,wishes]);
    useEffect(()=>{
        getBalance()
    },[])
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
                    <Text style={[styles.title3, styles.titleFlexBox]}>{amountSum}</Text>
                </View>
            </ScrollView>
            <Pressable onPress={()=>setLuckyModal(true)} style={createDisable && { opacity: 0.5 }} disabled={createDisable}>
                <FavorDaoButton
                    textValue="Insert money"
                    frame1171275771BackgroundColor="#ff564f"
                    cancelColor="#fff"
                />
            </Pressable>
            <MoneyPacket
                visible={luckyModal}
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
        fontSize: 50,
        letterSpacing: -1,
        fontWeight: "700",
        alignSelf: "stretch",
    },
});

export default Ordinary;