import * as React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ImageSourcePropType, TouchableOpacity,
} from "react-native";
import {FontSize, FontFamily, Color} from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";

type FavorDaoNavBarType = {
    title?: string;
    vector?: ImageSourcePropType;
};

const FavorDaoNavBar = ({title, vector}: FavorDaoNavBarType) => {
    const navigation = useNavigation()
    const back = () => {
        navigation.goBack();
    }
    return (
        <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={[styles.frameWrapper, styles.frameParentFlexBox]}>
                <TouchableOpacity style={styles.frameParentFlexBox} onPress={back}>
                    <Image
                        style={styles.vectorIcon} resizeMode="cover"
                        source={vector || require("../assets/vector6.png")}
                    />
                    <Text style={[styles.back, styles.backFlexBox]}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, styles.backFlexBox]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    frameParentFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    backFlexBox: {
        textAlign: "center",
        // letterSpacing: 0,
    },
    vectorIcon: {
        width: 8,
        height: 14,
    },
    back: {
        fontSize: FontSize.bodyBody17_size,
        lineHeight: 23,
        fontFamily: FontFamily.paragraphP313,
        color: Color.royalblue_100,
        marginLeft: 5,
    },
    frameWrapper: {
        width: 48,
        justifyContent: "center",
    },
    title: {
        flex: 1,
        fontSize: FontSize.size_xl,
        lineHeight: 22,
        fontWeight: "600",
        fontFamily: FontFamily.capsCaps310SemiBold,
        color: Color.iOSSystemLabelsLightPrimary,
        marginLeft: -36,
    },
    frameParent: {
        alignSelf: "stretch",
        marginTop: 20,
        marginHorizontal: 4
    },
})

export default FavorDaoNavBar;
