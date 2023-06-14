import * as React from "react";
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from "react-native";
import ExpandedDAOHeader from "../../../components/ExpandedDAOHeader";
import {useRoute} from "@react-navigation/native";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import {useDispatch} from "react-redux";
import {DaoInfo} from "../../../declare/api/DAOApi";
import ChatLayout from "../../../components/RedPacket/ChatLayout";
import MessageInputer from "../../../components/RedPacket/MessageInputer";

type Props = {
};

const ChatInDAOScreen: React.FC<Props> = (props:Props) => {
    const route = useRoute();
    // @ts-ignore
    const {daoInfo} = route.params as { daoInfo: DaoInfo };
    return (
        <BackgroundSafeAreaView
            headerStyle={{paddingTop: 0}}
            headerComponent={<ExpandedDAOHeader daoInfo={daoInfo} isShowJoined={false}/>}
        >
            <ChatLayout />
            <MessageInputer/>
        </BackgroundSafeAreaView>
    );
}
const styles = StyleSheet.create({

});
export default ChatInDAOScreen