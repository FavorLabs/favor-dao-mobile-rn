import * as React from "react";
import {Text, StyleSheet, View, TextInput, Platform} from "react-native";
import {FontSize, FontFamily, Color, Border, Padding} from "../GlobalStyles";
import {useEffect, useState} from "react";

type TextInputBlockType = React.ComponentProps<typeof TextInput> & {
    title?: string
    value: string
    setValue?: (value: string) => void
    height?: number
    disable?:boolean
    username?:string
    AdditionalInformation?:string
    lastPlaceholder?:string
    maxLength?:number
    numberInput?:boolean
}

const TextInputBlock = (props: TextInputBlockType) => {
    const [editablestatus,setEditablestatus] = useState(true)
    const {
        title,
        lastPlaceholder,
        value,
        setValue,
        height = 100,
        maxLength = 9999999999999,
        username,
        numberInput= false,
        disable,
        AdditionalInformation,
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
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title,styles.username,{display:username?'flex':'none'}]}>{username}</Text>
          <Text style={[styles.AdditionalInformation,{display:AdditionalInformation?'flex':'none'}]}>{AdditionalInformation}</Text>
          {
              lastPlaceholder &&
              <View style={{flex:1,justifyContent:'center'}}>
                  <TextInput
                      style={[styles.input, inputProps.multiline && {height: height,textAlignVertical: 'top'}]}
                      value={value}
                      onChangeText={setValue}
                      editable={editablestatus}
                      maxLength={maxLength?maxLength:99999999999999999999}
                      keyboardType={numberInput?'numeric':'default'}
                      {
                          ...inputProps
                      }
                  />
                  <View style={[styles.lastPlaceholder,{display:!value?'flex':'none'}]}>
                      <Text style={[styles.lastPlaceholderText,{color: Platform.OS === 'ios'?'#999':'gray',fontWeight:Platform.OS === 'ios'?'normal':'800'}]}>{lastPlaceholder}</Text>
                  </View>

              </View>
          }
          {
              !lastPlaceholder &&
              <TextInput
                  style={[styles.input, inputProps.multiline && {height: height,textAlignVertical: 'top'}]}
                  value={value}
                  onChangeText={setValue}
                  editable={editablestatus}
                  maxLength={maxLength?maxLength:99999999999999999999}
                  keyboardType={numberInput?'numeric':'default'}
                  {
                      ...inputProps
                  }
              />
          }
      </View>
    );
};
const styles = StyleSheet.create({
    AdditionalInformation:{
        fontSize:13,
        color:'#939393'
    },
    lastPlaceholderText:{
        fontSize:13,
        marginTop:10,
        width:'120%',
    },
    lastPlaceholder:{
        position:'absolute',
        right:10,
        height:"100%",
        justifyContent:"center",
    },
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
