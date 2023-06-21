import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getTime} from "../../utils/util";
import {Icon} from "@rneui/themed";
import {Color, FontSize, Padding} from "../../GlobalStyles";
import {useResourceUrl} from "../../utils/hook";

export type Props={
    avatar: string
    name: string
    unreadCount?: number
    content?: string
    createdAt?: number
    lastUserName?:string
    navigationFn: () => void,
    contentLines?:number
};

const MessageItem:React.FC<Props> = (props) => {
    const { avatar,name,unreadCount,content,createdAt,lastUserName, navigationFn,contentLines }=props;
    const resourceUrl = useResourceUrl('avatars');
    return(
        <View style={[styles.notifyBox, styles.flexRC]}>
            <View style={styles.notifyLeft}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: `${resourceUrl}/${avatar}`
                    }}
                />
            </View>
            <TouchableOpacity style={styles.notifyRight} onPress={navigationFn}>
                <View style={[styles.infoTop, styles.flexRC]}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    { createdAt!==0 && <Text style={styles.time} numberOfLines={1}>{getTime(createdAt as number)}</Text> }
                </View>
                <View style={styles.flexRC}>
                    <View style={styles.content}>
                        <Text style={styles.lastName} numberOfLines={1}>{lastUserName}</Text>
                        <Text style={styles.colon}>{lastUserName && ":"}</Text>
                        <Text style={styles.lastContent} numberOfLines={contentLines?contentLines:1}>{content}</Text>
                    </View>
                    <View style={styles.flexRC}>
                        {
                            !!unreadCount && <Text style={styles.unReadCount} numberOfLines={1}>
                                +{unreadCount}
                            </Text>
                        }
                        <View>
                            <Icon color={Color.color4} name={'chevron-right'} type={'material'}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    frameParent: {
        backgroundColor: Color.whitesmoke_300,
    },
    title: {
        fontSize: FontSize.size_15xl,
        fontWeight: '700',
        color: Color.iOSSystemLabelsLightPrimary,
        textAlign: "left",
        paddingBottom: Padding.p_3xs,
        paddingHorizontal: Padding.p_base,
    },
    systemBox: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Color.color1,
        position: "relative"
    },
    unread: {
        position: 'absolute',
        top: 0,
        right: 5,
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: Color.color
    },
    iconText: {
        fontSize: FontSize.size_mini,
        fontWeight: '500',
        lineHeight: 23,
        color: '#000',
        letterSpacing: -0.4,
        marginTop: Padding.p_9xs
    },
    list: {
        flex: 1,
        paddingHorizontal: Padding.p_base,
    },
    text: {
        fontSize: FontSize.size_mini,
        lineHeight: 23,
        color: Color.color4,
        letterSpacing: -0.4,
        marginVertical: Padding.p_3xs
    },
    notifyBox: {
        paddingHorizontal: 16,
    },
    flexRC: {
        flexDirection: 'row',
        alignItems: "center",
    },
    notifyLeft: {
        marginRight: Padding.p_5xs,
    },
    notifyRight: {
        flex: 1,
        marginVertical: Padding.p_3xs,
        paddingBottom: 10,
        paddingTop:5,
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderBottomColor: '#c1c1c4'
    },
    infoTop: {
        marginBottom: Padding.p_9xs,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    name: {
        flex: 1,
        fontWeight: "500",
        fontSize: FontSize.size_mid,
        lineHeight: 23,
        letterSpacing: -0.4,
        color: '#000',
        overflow: "hidden",
        marginRight: 10
    },
    time: {
        fontWeight: '500',
        fontSize: FontSize.paragraphP313_size,
        lineHeight: 18,
        color: Color.iOSSystemTintsDisableLight
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lastName: {
      fontSize: FontSize.size_mini,
      fontWeight: "500",
      color: '#3c3c3c',
    },
    colon: {
        fontSize: FontSize.size_sm,
        fontWeight: "400",
        color: 'rgba(60,60,60,0.6)',
        marginHorizontal: 3,
    },
    lastContent: {
        fontSize: FontSize.size_sm,
        fontWeight: "400",
        color: 'rgba(60,60,60,0.6)',
        flex:1,
    },
    unReadCount: {
        backgroundColor: Color.color,
        color: Color.color1,
        borderRadius: 7,
        fontSize: FontSize.capsCaps310SemiBold_size,
        lineHeight: 14,
        paddingHorizontal: 4
    },
    footer: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noData: {
        marginTop: '40%',
    },
});


export default MessageItem;