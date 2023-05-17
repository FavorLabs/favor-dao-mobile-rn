import React, {useEffect, useRef} from 'react';
import WalletConnect from "./WalletConnect";
import BottomSheet from "./BottomSheet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateState as controllersUpdateState} from "../store/controllers"
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import Models from "../declare/storeTypes";
import InputPassword from "./InputPassword";
import {SignatureData} from "../declare/api/DAOApi";
import WalletController from "../libs/walletController";
import {useUrl} from "../utils/hook";
import Favor from "../libs/favor";
import {View} from 'react-native';

const WalletBottomSheet = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const {globalBottomSheet} = useSelector((state: Models) => state.controllers)
    const {data} = useSelector((state: Models) => state.wallet)
    const bsRef = useRef<BottomSheetModal>();

    const close = () => {
        dispatch(controllersUpdateState({
            globalBottomSheet: false,
        }))
    }
    useEffect(() => {
        navigation.addListener('state', close)
    }, [])

    useEffect(() => {
        globalBottomSheet ? bsRef.current?.present() : bsRef.current?.dismiss();
    }, [globalBottomSheet])

    const login = async (signatureData: SignatureData) => {
        try {
            await WalletController.login(Favor.url, signatureData)
            close();
        } catch (e) {
            console.error(e)
        }
    }

    return <>
        <BottomSheet ref={bsRef} show={globalBottomSheet} showCancel={true} onChange={(index) => {
            if (index === -1) close();
        }}>
            {
                data ?
                  <View style={{padding: 20}}>
                      <InputPassword type={0} fn={login} btnText={'Login'}/>
                  </View> :
                  <WalletConnect/>
            }

        </BottomSheet>
    </>
};

export default WalletBottomSheet;
