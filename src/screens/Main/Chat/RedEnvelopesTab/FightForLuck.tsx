import * as React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity,ScrollView,} from "react-native";
import TextInputBlock from "../../../../components/TextInputBlock";
import FavorDaoButton from "../../../../components/FavorDaoButton";
import {useState} from "react";
import MoneyPacket from "../../../../components/RedPacket/MoneyPacket";


type Props ={};

const FightForLuck: React.FC<Props> = (props) => {
    const [luckyModal,setLuckyModal]=useState(true)
    const [LuckyPacketQuantitySum,setLuckyPacketQuantitySum]=useState('')
    const [TotalAmountSum,setTotalAmountSum]=useState('')
    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInputBlock
                    title={`LuckyPacket quantity`}
                    placeholder={`Please enter the quantity of luckypacket`}
                    value={LuckyPacketQuantitySum}
                    setValue={setLuckyPacketQuantitySum}
                    AdditionalInformation={'(There are 6 people in this group)'}
                />
                <TextInputBlock
                    title={'Total amount'}
                    placeholder={`Please enter the amounts                                             FavT`}
                    value={TotalAmountSum}
                    setValue={setTotalAmountSum}
                />
                <TextInputBlock
                    title={'Best wishes'}
                    placeholder={`Please enter best wishes`}
                    value={TotalAmountSum}
                    setValue={setTotalAmountSum}
                />
                <View style={[styles.titleParent, styles.contentSpaceBlock]}>
                    <Text style={[styles.title3, styles.titleFlexBox]}>0.00</Text>
                        <FavorDaoButton
                            textValue="Insert money"
                            frame1171275771BackgroundColor="#ff564f"
                            cancelColor="#fff"
                        />
                </View>
            </ScrollView>
            <MoneyPacket visible={luckyModal} setVisible={setLuckyModal}/>
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

export default FightForLuck;