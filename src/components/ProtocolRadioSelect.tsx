import * as React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Color, FontSize, FontFamily} from "../GlobalStyles";
import AgreeCheckBox from "./AgreeCheckbox";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";

type Props = {
    value: boolean
    setValue: (value: boolean) => void
}
const ProtocolRadioSelect = ({value, setValue}: Props) => {
    const navigation = useNavigation();
    const toUserAgreement = () => {
        // @ts-ignore
        navigation.navigate(Screens.UserAgreement);
    }

    return (
        <View style={styles.parent}>
            <AgreeCheckBox value={value} setValue={setValue}/>
            <View style={styles.description}>
                <Text style={styles.iHaveCarefully} numberOfLines={1}>{`I have carefully read and agree to `}</Text>
                <TouchableOpacity onPress={toUserAgreement}>
                    <Text style={styles.theUserAgreement}>the user agreement</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iHaveCarefully: {
        color: Color.iOSSystemLabelsLightPrimary,
        fontSize: FontSize.size_xs,
        fontWeight: '400',
        textAlign: "left",
        marginLeft: 10,
    },
    theUserAgreement: {
        color: Color.color,
        fontSize: FontSize.size_xs,
        fontWeight: '400',
        textAlign: "left",
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    parent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:5,
        paddingBottom:5
    },
});

export default ProtocolRadioSelect;
