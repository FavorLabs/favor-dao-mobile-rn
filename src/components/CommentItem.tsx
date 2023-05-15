import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {getTime} from "../utils/util";
import {Color} from "../GlobalStyles";
import {CommentInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";

export type Props = {
    style?: ViewStyle
    commentInfo: CommentInfo,
    clickReplyHandel?: Function
}
const CommentItem = ({commentInfo, clickReplyHandel,style}: Props) => {
    const avatarsResUrl = useResourceUrl('avatars');

    return <View style={[styles.commentItem, style]}>
        <Image
          style={styles.userAvatar}
          resizeMode="cover"
          source={{uri: `${avatarsResUrl}/${commentInfo.user.avatar}`}}
        />
        <View style={styles.details}>
            <View style={styles.nameAndLike}>
                <Text style={styles.name}>{commentInfo.user.nickname}</Text>
            </View>
            <Text style={styles.replyContent}>{commentInfo.contents[0].content}</Text>
            <View style={styles.replyCountTime}>
                <View style={styles.replyCountWrap}>
                    <TouchableOpacity onPress={() => {
                        clickReplyHandel?.();
                    }}>
                        <Text style={styles.replyCount}>{commentInfo.replies.length} Replies</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.replyTime}>{getTime(commentInfo.created_on)}</Text>
            </View>
        </View>
    </View>
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingRight: 32,
    },

    commentItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    details: {
        flex: 1,
        marginLeft: 16
    },
    nameAndLike: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: '500',
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: -0.24
    },
    replyContent: {
        marginVertical: 6,
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: -0.24
    },
    replyCountTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    replyCountWrap: {
        paddingVertical: 4,
        paddingHorizontal: 15,
        marginRight: 16,
        backgroundColor: Color.whitesmoke_200,
        borderRadius: 20
    },
    replyCount: {
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 23,
        letterSpacing: -0.4
    },
    replyTime: {
        color: Color.iOSSystemLabelsLightSecondary
    },
})
export default CommentItem;
