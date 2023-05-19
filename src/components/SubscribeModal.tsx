import React, {useState} from 'react';
import SubscribeBlock from "./SubscribeBlock";
import InputPassword from "./InputPassword";
import {ScrollView, View} from "react-native";
import {SignatureData} from "../declare/api/DAOApi";
import BottomSheetModal from "./BottomSheetModal";
import DaoApi from "../services/DAOApi/Dao";
import {useUrl} from "../utils/hook";


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

    const pwdSuccess = async (signatureData: SignatureData) => {
        setPasswordModalVisible(false);
        try {
            setLoading(true)
            const {data} = await DaoApi.subscribe(url, daoCardInfo.dao_id, signatureData);
            if (data.data?.status) {
                await subSuccess();
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }
    const subFn = () => {
        if (loading) return;
        setPasswordModalVisible(true);
    }

    return <>
        <BottomSheetModal
          visible={visible}
          setVisible={setVisible}
        >
            <ScrollView>
                <SubscribeBlock loading={loading} daoCardInfo={daoCardInfo} subFn={subFn}/>
                <BottomSheetModal
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
