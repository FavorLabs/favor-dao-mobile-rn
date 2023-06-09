import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {Border, Color, FontSize, Padding} from "../GlobalStyles";
import {getDebounce} from "../utils/util";
export type Props = {
    tittle:string;
    frameFnc?: (e: { preventDefault: () => void; })=>void;
    getSearchBlur: () => void;
    searchValue:string;
    setSearchValue: (a: string) => void;
    unFrameStatus?:boolean
};

const SearchHead:React.FC<Props>=(props)=>{
    const {tittle,frameFnc,getSearchBlur,searchValue,setSearchValue,unFrameStatus} = props;
    return(
                    <View style={[styles.titleParent, styles.selectionBg]}>
                        <Text style={styles.title}>{tittle}</Text>
                        <View style={styles.frameGroup}>
                            <View style={[styles.groupWrapper, styles.wrapperBg]}>
                                <View style={styles.searchParent}>
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder={'Search'}
                                        value={searchValue}
                                        onChangeText={text => setSearchValue(text)}
                                        onBlur={getDebounce(getSearchBlur)}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={frameFnc} >
                                <View style={[styles.frameWrapper, styles.wrapperBg,{display:unFrameStatus?'none':'flex'}]}>
                                    <Image
                                        style={styles.frameChild}
                                        resizeMode="cover"
                                        source={require("../assets/frame-50.png")}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            )
}
const styles = StyleSheet.create({

    searchInput: {
        flex: 1,
    },
    selectionBg: {
        backgroundColor: Color.whitesmoke_300,
        alignSelf: "stretch",
    },
    wrapperBg: {
        backgroundColor: Color.iOSSystemFillsLightTertiary,
        borderRadius: Border.br_3xs,
    },
    parentPosition: {
        left: 0,
        position: "absolute",
    },
    descriptionTypo: {
        fontWeight: '400',
        textAlign: "left",
        letterSpacing: 0,
    },
    title: {
        fontSize: FontSize.size_15xl,
        lineHeight: 41,
        fontWeight: "700",
        display: "flex",
        width: 343,
        alignItems: "center",
        color: Color.iOSSystemLabelsLightPrimary,
        letterSpacing: -1,
        textAlign: "left",
    },
    searchIcon: {
        width: 24,
        overflow: "hidden",
        top: 0,
        height: 24,
    },
    placeholderLabel: {
        marginTop: -11,
        top: "50%",
        width: 241,
        color: Color.iOSSystemLabelsLightSecondary,
        left: 26,
        lineHeight: 22,
        position: "absolute",
        fontSize: FontSize.bodyBody17_size,
    },
    searchParent: {
        width: 267,
        height: 24,
    },
    groupWrapper: {
        paddingLeft: Padding.p_5xs,
        paddingTop: Padding.p_7xs,
        paddingRight: Padding.p_lgi,
        paddingBottom: Padding.p_7xs,
        flex: 1,
    },
    frameChild: {
        height: 22,
        width: 22,
    },
    frameWrapper: {
        padding: Padding.p_5xs,
        marginLeft: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    frameGroup: {
        marginTop: 5,
        flexDirection: "row",
        alignSelf: "stretch",
    },
    titleParent: {
        paddingBottom: Padding.p_3xs,
        justifyContent: "flex-end",
        paddingHorizontal: Padding.p_base,
    }
});

export default SearchHead;