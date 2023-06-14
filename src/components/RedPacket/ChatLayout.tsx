import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ChatNameBox from "./ChatNameBox";
export type Props = {
};

const ChatLayout: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <View style={styles.container}>
            <ChatNameBox isUser={true} showTime={true}></ChatNameBox>
            <ChatNameBox isUser={false} showTime={true}></ChatNameBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    aa:{
        width:430,
        height:20,
        backgroundColor:"red"
    }
})

export default ChatLayout