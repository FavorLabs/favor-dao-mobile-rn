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
const SubscribeModal = ({visible, setVisible, daoCardInfo, subSuccess}: Props, ref: React.Ref<any>) => {
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
                {
                  passwordModalVisible &&
                    <InputPassword type={1} fn={pwdSuccess}/>
                }
                <View style={[passwordModalVisible && {display: 'none'}]}>
                    <SubscribeBlock loading={loading} daoCardInfo={daoCardInfo} subFn={subFn}/>
                </View>
            </ScrollView>
        </BottomSheetModal>
        {/*<BottomSheetModal visible={passwordModalVisible} setVisible={setPasswordModalVisible}>*/}
        {/*    <InputPassword type={1} fn={success}/>*/}
        {/*</BottomSheetModal>*/}
        {/*<BottomSheetM*/}
        {/*  ref={bsRef}*/}
        {/*  show={show}*/}
        {/*  snapPoints={['60%']}*/}
        {/*>*/}
        {/*    <ScrollView style={{paddingHorizontal: 20}}>*/}
        {/*        <SubscribeBlock daoCardInfo={daoCardInfo} subFn={subFn}/>*/}
        {/*    </ScrollView>*/}
        {/*</BottomSheetM>*/}

        {/*<BottomSheetM*/}
        {/*  ref={pwdRef}*/}
        {/*  snapPoints={['60%']}*/}
        {/*>*/}
        {/*    <ScrollView style={{paddingHorizontal: 20}}>*/}
        {/*        <InputPassword type={1} fn={success}/>*/}
        {/*    </ScrollView>*/}
        {/*</BottomSheetM>*/}
    </>
};

export default React.forwardRef(SubscribeModal);
