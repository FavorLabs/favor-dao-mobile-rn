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
import {toNumber} from "lodash";
import {strings} from "../../../../locales/i18n";


type Props ={
    route:any
};

const Ordinary: React.FC<Props> = (props) => {
    const {route}=props
    const {memberCount, sendCustomMessage}=route.params
    const [luckyModal,setLuckyModal]=useState(false)
    const [LuckyPacketQuantitySum,setLuckyPacketQuantitySum]=useState('')
    const [TotalAmountSum,setTotalAmountSum]=useState('')
    const [balance, setBalance] = useState(0);
    const [wishes,setWishes]=useState('')
    const url = useUrl();
    const amountSum=useMemo(()=>{
        // @ts-ignore
        return LuckyPacketQuantitySum * TotalAmountSum
    },[LuckyPacketQuantitySum,TotalAmountSum])
    const getBalance = async () => {
        try {
            const {data} = await UserApi.getAccounts(url);
            setBalance(toNumber(data.data[0].balance))
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
    function isIntege(str:string) {
        return /^\d+$/.test(str);
    }
    const createDisable = useMemo(() => {
        return !(
            // @ts-ignore
            !(toNumber((LuckyPacketQuantitySum * TotalAmountSum)) > parseFloat(balance)/1000) && isPositiveInt(TotalAmountSum) && LuckyPacketQuantitySum.trim()!=='' && TotalAmountSum.trim()!=='' && isPositiveInt(LuckyPacketQuantitySum)  && LuckyPacketQuantitySum <= memberCount
        )
    }, [LuckyPacketQuantitySum,TotalAmountSum]);
    useEffect(()=>{
        getBalance()
    },[])
    useEffect(()=>{
        if(!isIntege(TotalAmountSum) && TotalAmountSum!=''){
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: strings('FightForLuck.Toast.mustInteger'),
            });
        }
    },[TotalAmountSum])
    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInputBlock
                    title={strings('FightForLuck.LuckyPacketTitle')}
                    placeholder={strings('FightForLuck.LuckyPacketPlaceholder')}
                    value={LuckyPacketQuantitySum}
                    numberInput={true}
                    setValue={setLuckyPacketQuantitySum}
                    AdditionalInformation={`(${strings('FightForLuck.Information1')}${memberCount}${strings('FightForLuck.Information2')})`}
                />
                <TextInputBlock
                    title={strings('FightForLuck.TotalAmountTitle')}
                    placeholder={strings('FightForLuck.TotalAmountPlaceholder')}
                    value={TotalAmountSum}
                    numberInput={true}
                    lastPlaceholder={'FavT'}
                    setValue={setTotalAmountSum}
                />
                <TextInputBlock
                    title={strings('FightForLuck.BestWishesTitle')}
                    placeholder={strings('FightForLuck.BestWishesPlaceholder')}
                    value={wishes}
                    setValue={setWishes}
                    maxLength={30}
                />
                <View style={[styles.titleParent, styles.contentSpaceBlock]}>
                    <Text style={[styles.title3, styles.titleFlexBox]}>{amountSum}</Text>
                </View>
            </ScrollView>
            <Pressable onPress={()=>setLuckyModal(true)} style={createDisable && { opacity: 0.5 }} disabled={createDisable}>
                <FavorDaoButton
                    textValue={strings('FightForLuck.InsertMoney')}
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
