import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageSourcePropType
} from 'react-native';
export type Props = {
    fn:Function,
    title:string,
    imageUrl: ImageSourcePropType
};
const BottomItem: React.FC<Props> = (props) => {
    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const {fn,title,imageUrl}=props
    return (
        <TouchableOpacity style={{height:0.22 * 0.35 * Height,width:0.1 * Width}} onPress={()=>fn()}>
            <View style={[styles.boxHead,{height:0.1 * Width,borderRadius:0.01 * Width,width:0.1 * Width}]}>
                <Image style={{height:0.06 * Width,width:0.06 * Width}}
                       source={imageUrl}
                       resizeMode={"contain"}/>
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
    boxHead: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFF'
    }
})
export default BottomItem