import * as React from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import {FontSize, FontFamily, Color, Border, Padding} from "../GlobalStyles";
import {useEffect, useState} from "react";

type TextInputBlockType = React.ComponentProps<typeof TextInput> & {
    title?: string
    value: string
    setValue?: (value: string) => void
    height?: number
    disable?:boolean
    username?:string
}

const TextInputBlock = (props: TextInputBlockType) => {
    const [editablestatus,setEditablestatus] = useState(true)
    const {
        title,
        value,
        setValue,
        height = 100,
        username,
        disable,
        ...inputProps
    } = props;
    const disableStatus = ()=>{
        if(disable){
            setEditablestatus(false)
        }
    }
    useEffect(()=>{
        disableStatus()
    })
    return (

      <View style={[styles.createWalletInner, !title && {marginTop: -10} ]}>
          <Text style={styles.title}>{title}</Text><Text style={[styles.title,styles.username]}>{username}</Text>
          <TextInput
            style={[styles.input, inputProps.multiline && {height: height,textAlignVertical: 'top'}]}
            value={value}
            onChangeText={setValue}
            editable={editablestatus}
            {
                ...inputProps
            }
          />
      </View>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "left",
        lineHeight: 23,
        letterSpacing: 0,
        fontSize: FontSize.bodyBody17_size,
        fontWeight: "600",
        color: Color.iOSSystemLabelsLightPrimary,
        display: "flex",
        width: '100%',
        alignItems: "center"
    },
    username:{
        color:'#007AFF'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: Border.br_3xs,
        padding: Padding.p_smi,
        paddingTop: Padding.p_smi,
    },
    createWalletInner: {
        justifyContent: "center",
        marginTop: 20,
        alignSelf: "stretch",
    },
});

export default TextInputBlock;
