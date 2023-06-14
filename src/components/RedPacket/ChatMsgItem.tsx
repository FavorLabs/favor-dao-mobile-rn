import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import Video from 'react-native-video';
import {useResourceUrl} from "../../utils/hook";
import LinearGradient from 'react-native-linear-gradient';
export type Props={
    msgType:number,
    isUser?:boolean,
    contextData?:string,
    openStatus?:boolean
};

const ChatMsgItem:React.FC<Props> = (props) => {
    const avatarsResUrl = useResourceUrl('avatars');
    const {msgType,isUser,contextData,  openStatus}=props
    return(
        <View style={styles.item}>
            {
                msgType == 1 &&
                    <View style={[styles.container,styles.BDRmax,{backgroundColor:isUser?'#FF8D1A':'rgba(116, 116, 128, 0.08)'}]}>
                        <Text style={[styles.text,{color:isUser?'white':'black'}]}>{contextData}</Text>
                    </View>
            }
            {
                msgType == 2 &&
                    <Image
                        style={[styles.image,styles.BDRmax]}
                        resizeMethod={"resize"}
                        resizeMode={"contain"}
                        source={{uri:contextData}}/>
            }
            {
                msgType == 3 &&
                <View style={[styles.videoBox,styles.video,styles.BDRmax]}>
                    <Video
                        style={styles.video}
                        paused={true}
                        source={{uri:contextData}}/>
                    <View style={[styles.playPause,styles.video]}>
                        <Image
                            resizeMode="cover"
                            source={require("../../assets/playcircle.png")}
                        />
                    </View>
                </View>
            }
            {
                msgType == 4 &&
                <LinearGradient  start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
                                 colors={['#FF8D1A','#FF5530']}
                                 style={[styles.redPacket,styles.BDRmax,{opacity:openStatus?0.7:1},{
                                     height: openStatus?88:79
                                 }]}>
                    <View style={styles.RPContainer}>
                        {
                            !openStatus &&
                            <View style={styles.RPClose}>
                                <View style={styles.Abserlut}></View>
                                <View style={styles.RPCHead}>
                                    <View style={styles.SC1}>
                                        <View style={styles.SC2}></View>
                                    </View>
                                </View>
                                <View style={styles.LogoNameBox}>
                                    <Text style={styles.LogoName}>FavorDAO</Text>
                                </View>
                            </View>
                        }
                        {
                            openStatus &&
                            <View style={styles.RPOpen}>
                                <View style={styles.RPCHeadOP}>
                                <View />
                                <View style={styles.SCOP}>
                                </View>
                                </View>
                                <View style={styles.LogoNameBox}>
                                    <Text style={styles.LogoName}>FavorDAO</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.RPText}>
                            <Text style={styles.Msg} numberOfLines={1} ellipsizeMode={"tail"}>{contextData}</Text>
                            <Text style={[styles.Received,{display:openStatus?'flex':'none'}]}>Received</Text>
                        </View>
                    </View>
                </LinearGradient>
            }
            {
                msgType == 5 &&
                <View style={styles.actionMsg}>

                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    actionMsg:{

    },
    Msg:{
        color:'white',
        fontSize:22,
        width:100
    },
    Received:{
        color:'white',
        fontSize:16,
    },
    LogoNameBox:{
        width:37,
        height:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    LogoName:{
        fontSize:4.8,
        textAlign:'center',
        color:'#FF5530'
    },
    RPText:{
        marginLeft:15,
        display:'flex',
        justifyContent:'space-between'
    },
    SC2:{
        height:5.5,
        width:5.5,
        backgroundColor:"#FFB11A",
        borderRadius:2.5
    },
    SC1:{
        height:12.3,
        width:12.3,
        backgroundColor:'#FF5530',
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6
    },
    Abserlut:{
        width:34,
        height:46,
        position:'absolute',
        top:-23,
        backgroundColor:"#FFB11A",
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
    },
    RPCHead:{
        width:34,
        height:23,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
    },
    SCOP:{
        width:25,
        height:13,
        backgroundColor:"#FF5530",
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    RPCHeadOP:{
        width:34,
        height:24,
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        display:"flex",
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:"#FFB11A"
    },
    RPClose:{
        height:44,
        width:34,
        backgroundColor:'rgba(255,255,255,0.1)',
        borderRadius:5,
        overflow:"hidden",
        display:'flex',
        justifyContent:'space-between'
    },
    RPOpen:{
        height:53,
        width:34,
        backgroundColor:'rgba(255,255,255,0.1)',
        borderRadius:5,
        borderTopLeftRadius:19,
        borderTopRightRadius:19,
        overflow:"hidden",
        display:'flex',
        justifyContent:'space-between',
        marginTop:-3
    },
    RPContainer:{
        marginLeft:18,
        height:48,
        display:'flex',
        flexDirection:'row'
    },
    redPacket:{
        width:243,
        backgroundColor:'#FF7A00',
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        opacity:0.7
    },
    item:{
        marginTop:4
    },
    container:{
        alignSelf:'flex-start',
        maxWidth:256
    },
    text:{
        fontSize:17,
        paddingTop:7,
        paddingBottom:8,
        paddingLeft:12,
        paddingRight:12,
        textAlign: "left",
        maxWidth:256
    },
    playPause:{
        position:'absolute',
        display:"flex",
        justifyContent:'center',
        alignItems:'center'
    },
    videoBox:{
        position:'relative',
        backgroundColor:"red",
    },
    video: {
        width:250,
        height:200
    },
    BDRmax:{
        borderRadius:17
    },
    image:{
        width:150,
        height:150
    }
});

export default ChatMsgItem;