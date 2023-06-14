import React, { useEffect,  useState, } from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Image, TextInput,} from 'react-native';
export type Props = {
};

const MessageInputer: React.FC<Props> = (props) => {
    const {} = props;
    return (
        <View style={styles.container}>
            <View style={styles.Inputbox}>
                <View style={styles.flexBox}>
                    <TextInput style={styles.textInp} placeholder={'Message'} ></TextInput>
                    <Image style={styles.image} source={require("../../assets/ChatSmail.png")}/>
                    <Image style={styles.image} source={require("../../assets/ChatAdd.png")}/>
                    <Image style={styles.image} source={require("../../assets/ChatToTop.png")}/>
                </View>
            </View>
            <View style={styles.ationBox}>
                <View style={styles.flexToAct}>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatPicIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>Picture</Text>
                    </View>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatCaptureIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>Capture</Text>
                    </View>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatVideoIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>Video</Text>
                    </View>
                </View>
                <View style={styles.flexToAct}>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatRecordIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>Record</Text>
                    </View>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatFileIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>File</Text>
                    </View>
                    <View style={styles.actBox}>
                        <View style={styles.boxHead}>
                            <Image style={styles.boxIcon} source={require("../../assets/ChatLuckyPacketIcon.png")} resizeMode={"contain"}/>
                        </View>
                        <Text style={styles.actName}>LuckyPacket</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    actName:{
        fontSize: 16,
        fontWeight: '400',
        opacity: 0.8,
        color:'#999999',
        width:"200%",
        position:'absolute',
        left:"-50%",
        bottom:-7,
        textAlign:"center"
    },
    boxIcon:{
        width:18,
        height:18
    },
    boxHead:{
      width:44,
      height:44,
        borderRadius:8,
        backgroundColor:"#FFFFFF",
        display:"flex",
        justifyContent:'center',
        alignItems:'center'
    },
    actBox:{
        height:60,
        width:44,
    },
    flexToAct:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    ationBox:{
        height:220,
        display:"flex",
        justifyContent:'space-evenly',
        paddingLeft:45,
        paddingRight:45
    },
    image:{
        width:26,
        height:26,
        borderRadius:13,
        marginLeft:10
    },
    textInp:{
        flex:1,
        height:40,
        fontSize:22,
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"white"
    },
    container:{
        position:"absolute",
        bottom:0,
        backgroundColor:'#F4F4F5'
    },
    Inputbox:{
        height:65,
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    flexBox:{
        marginLeft:15,
        marginRight:15,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    }
})

export default MessageInputer