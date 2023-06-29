import React, {useEffect, useMemo, useRef, useState,} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Keyboard,
    Dimensions
} from 'react-native';
import {CometChat} from "@cometchat-pro/react-native-chat";
export type Props = {
    fn:Function,
    title:string,
    children:React.ReactNode
};
const BottomItem: React.FC<Props> = (props) => {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const {fn,title,children}=props
    return (
        <TouchableOpacity style={{height:0.22 * 0.35 * Height,width:0.1 * Width}} onPress={()=>fn()}>
            <View style={[styles.boxHead,{height:0.1 * Width,borderRadius:0.01 * Width,width:0.1 * Width}]}>
                {children}
            </View>
            <Text style={[styles.actName,{fontSize: 0.22 * 0.35 * 0.2 * Height,bottom: 0}]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    actName: {
        fontSize: 12,
        fontWeight: '400',
        opacity: 0.8,
        color: '#999999',
        width: "300%",
        position: 'absolute',
        left: "-100%",
        textAlign: "center",
    },
    boxIcon: {
        width: 18,
        height: 18
    },
    boxHead: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFF'
    },
    actBox: {
        height:'60%',
        width:'10%',
    },
    flexToAct: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginLeft: 10
    },
    textInp: {
        flex: 1,
        paddingVertical: 5,
        fontWeight: '400',
        fontSize: 17,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white"
    },
    container: {
        backgroundColor: '#F4F4F5'
    },
    Inputbox: {
        // height:65,
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    flexBox: {
        marginLeft: 15,
        marginRight: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
})
export default BottomItem