import React, {useEffect, useRef} from 'react';
import WalletConnect from "./WalletConnect";
import BottomSheet from "./BottomSheet";
import {useSelector} from "react-redux";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {useNavigation} from "@react-navigation/native";

const WalletBottomSheet = () => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const {globalBottomSheet} = useSelector<any, any>(state => state.switch)

    useEffect(() => {
        globalBottomSheet ? bottomSheetRef.current?.present() : bottomSheetRef.current?.dismiss();
    }, [globalBottomSheet, bottomSheetRef.current])

    useEffect(() => {
        return navigation.addListener('state', () => {
            bottomSheetRef.current?.dismiss();
        })
    }, [])

    return <>
        <BottomSheet ref={bottomSheetRef} showCancel={true}>
            <WalletConnect/>
        </BottomSheet>
    </>
};

export default WalletBottomSheet;
