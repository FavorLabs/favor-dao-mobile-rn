import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ChatNameBox from "./ChatNameBox";
export type Props = {
};

const MessageBox: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <View style={styles.container}>
            <ChatNameBox isUser={true} showTime={true}></ChatNameBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:15
    },
    aa:{
        width:430,
        height:20,
        backgroundColor:"red"
    }
})

export default MessageBox