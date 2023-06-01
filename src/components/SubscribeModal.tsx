import React, {useState} from 'react';
import SubscribeBlock from "./SubscribeBlock";
import InputPassword from "./InputPassword";
import {ScrollView, View} from "react-native";
import {SignatureData} from "../declare/api/DAOApi";
import BottomSheetModal from "./BottomSheetModal";
import DaoApi from "../services/DAOApi/Dao";
import {useUrl} from "../utils/hook";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";


export type Props =
  {
      subSuccess: () => void
  } &
  React.ComponentProps<typeof BottomSheetModal> &
  React.ComponentProps<typeof SubscribeBlock>
const SubscribeModal = ({visible, setVisible, daoCardInfo, subSuccess}: Props) => {
    const url = useUrl();
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const pwdSuccess = async (signatureData: SignatureData) => {
        setPasswordModalVisible(false);
        try {
            setLoading(true)
            const {data} = await DaoApi.subscribe(url, daoCardInfo.dao_id, signatureData);
            if (data.data?.status) {
                await subSuccess();
            }
        } catch (e) {
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: e.message,
            });
            navigation.goBack();
        } finally {
            setLoading(false)
        }
    }
    const subFn = () => {
        setPasswordModalVisible(true);
    }

    return <>
        <BottomSheetModal
          height={'60%'}
          visible={visible}
          setVisible={setVisible}
        >
            <ScrollView>
                <SubscribeBlock loading={loading} daoCardInfo={daoCardInfo} subFn={subFn}/>
                <BottomSheetModal
                  height={'60%'}
                  visible={passwordModalVisible}
                  setVisible={setPasswordModalVisible}
                >
                    <InputPassword type={1} fn={pwdSuccess}/>
                </BottomSheetModal>
            </ScrollView>
        </BottomSheetModal>

    </>
};

export default SubscribeModal;
