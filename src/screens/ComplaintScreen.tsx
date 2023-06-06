import * as React from "react";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import TextInputBlock from "../components/TextInputBlock";
import FavorDaoButton from "../components/FavorDaoButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,Text
} from "react-native";
import {Color, Padding} from "../GlobalStyles";
import {useMemo, useState} from "react";
import {DaoInfo, PostInfo} from "../declare/api/DAOApi";
import PostApi from "../services/DAOApi/Post";
import Toast from "react-native-toast-message";
import {useIsLogin, useUrl} from '../utils/hook';
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
type Props = {
};

const ComplaintScreen: React.FC<Props> = (props:Props) => {
    const route = useRoute();
    const {daoInfo , postInfo} = route.params as { daoInfo:DaoInfo, postInfo:PostInfo;};
    const [loading, setLoading] = useState(false);
    const [complaint,setComplaint] = useState('');
    const [reason,setReason] = useState('');
    const navigation = useNavigation()
    const url = useUrl();
    const createDisable = useMemo(() => {
        return !(
             reason && reason.trim()!==''
        )
    }, [reason]);
    const contentText = useMemo(() => {
        if(postInfo.ref_id=='000000000000000000000000'){
            return postInfo.contents[0].content
        }else {
            return postInfo.orig_contents[0].content
        }
    }, [postInfo]);
    const toComplaint = async () => {
        try {
            if(!createDisable){
                const request =  () => PostApi.complaint(url,{
                    post_id:postInfo.id,
                    reason:reason
                })
                const {data}=await request()
                if(data.code==0){
                    Toast.show({
                        type: 'info',
                        text1: 'Complaint success!'
                    });
                    navigation.goBack();
                }
            }else {
                Toast.show({
                    type: 'error',
                    text1: 'Complaint failed ! Please check the input content'
                });
            }

        } catch (e) {
            if (e instanceof Error)
            {
                Toast.show({
                    type: 'error',
                    text1: e.message
                });
            }
        }
    }
    return (
        <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}} footerStyle={{backgroundColor: Color.color2}}>
        <KeyboardAwareScrollView contentContainerStyle={styles.createWallet}>
            <FavorDaoNavBar
                title="complaint"
                vector={require("../assets/vector6.png")}
            />
            <View style={styles.content}>
                <ScrollView>
                    <TextInputBlock
                        title={`Complaint about the content released by`}
                        placeholder={`${contentText}`}
                        username={`@${daoInfo.name}`}
                        value={complaint}
                        setValue={setComplaint}
                        multiline={true}
                        editable={false}
                    />
                    <TextInputBlock
                        title={'Reason'}
                        placeholder={`Please enter the reason for your complaint`}
                        value={reason}
                        setValue={setReason}
                        multiline={true}
                    />
                </ScrollView>
                <View>
                    <TouchableOpacity style={[{marginTop: 10},createDisable && { opacity: 0.5 }]} disabled={loading} onPress={toComplaint}>
                        <FavorDaoButton
                            isLoading={loading}
                            textValue="Confirm"
                            frame1171275771BackgroundColor="#ff8d1a"
                            cancelColor="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
        </BackgroundSafeAreaView>
    )
}
const styles = StyleSheet.create({
    createWallet: {
        backgroundColor: Color.color2,
        flex: 1,
        overflow: "hidden",
        paddingHorizontal: Padding.p_base,
    },
    complaintSpaceBlock: {
        paddingHorizontal: Padding.p_base,
        overflow: "hidden",
    },
    complaint: {
        backgroundColor: Color.color2,
        flex: 1,
        height: 812,
        paddingVertical: 0,
        alignItems: "center",
        width: "100%",
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    }
});
export default ComplaintScreen