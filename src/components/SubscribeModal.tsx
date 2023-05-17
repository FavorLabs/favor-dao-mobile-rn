import React, {useImperativeHandle, useRef, useState} from 'react';
import BottomSheetM from "./BottomSheet";
import SubscribeBlock from "./SubscribeBlock";
import InputPassword from "./InputPassword";
import {ScrollView} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {SignatureData} from "../declare/api/DAOApi";


export type Props = {
    show: boolean
} & React.ComponentProps<typeof SubscribeBlock> & Partial<React.ComponentProps<typeof InputPassword>>
const SubscribeModal = ({show, daoCardInfo, fn}: Props, ref: React.Ref<any>) => {
    const bsRef = useRef<BottomSheetModal>()
    const pwdRef = useRef<BottomSheetModal>()

    useImperativeHandle(ref, () => bsRef.current)
    const subFn = () => {
        pwdRef.current?.present();
    }

    const success = (signatureData:SignatureData)=>{
        pwdRef.current?.dismiss();
        fn?.(signatureData)
    }

    return <>
        <BottomSheetM
          ref={bsRef}
          show={show}
          snapPoints={['60%']}
        >
            <ScrollView style={{paddingHorizontal: 20}}>
                <SubscribeBlock daoCardInfo={daoCardInfo} subFn={subFn}/>
            </ScrollView>
        </BottomSheetM>

        <BottomSheetM
          ref={pwdRef}
          snapPoints={['60%']}
        >
            <ScrollView style={{paddingHorizontal: 20}}>
                <InputPassword type={1} fn={success}/>
            </ScrollView>
        </BottomSheetM>
    </>
};

export default React.forwardRef(SubscribeModal);
