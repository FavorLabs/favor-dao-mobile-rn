import React, {useState} from 'react';
import BottomSheetM from "./BottomSheet";
import SubscribeBlock from "./SubscribeBlock";
import InputPassword from "./InputPassword";
import {ScrollView} from "react-native";


export type Props = {
    show: boolean
} & React.ComponentProps<typeof SubscribeBlock> & React.ComponentProps<typeof InputPassword>
const SubscribeModal = ({show, daoCardInfo, fn}: Props) => {

    const [pwdModal, setPwdModal] = useState(false);

    const subFn = () => {
        setPwdModal(true);
    }

    return <>
        <BottomSheetM
          show={show}
          // showCancel
          snapPoints={['60%']}
        >
            <ScrollView style={{paddingHorizontal: 20}}>
                <SubscribeBlock daoCardInfo={daoCardInfo} subFn={subFn}/>
            </ScrollView>
        </BottomSheetM>

        <BottomSheetM
          show={show && pwdModal}
          showCancel
          snapPoints={['60%']}
        >
            <ScrollView style={{paddingHorizontal: 20}}>
                <InputPassword fn={fn}/>
            </ScrollView>
        </BottomSheetM>
    </>
};

export default SubscribeModal;
