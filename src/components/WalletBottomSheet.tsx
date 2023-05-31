import React, {useEffect, useRef} from 'react';
import WalletConnect from "./WalletConnect";
import BottomSheetModal from "./BottomSheetModal";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateState as controllersUpdateState} from "../store/controllers"
import Models from "../declare/storeTypes";
import InputPassword from "./InputPassword";
import {SignatureData} from "../declare/api/DAOApi";
import WalletController from "../libs/walletController";
import Favor from "../libs/favor";
import Toast from "react-native-toast-message";

const WalletBottomSheet = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const {globalBottomSheet} = useSelector((state: Models) => state.controllers)
    const {data} = useSelector((state: Models) => state.wallet)

    useEffect(() => {
        navigation.addListener('state', ()=>{
            close();
        })
    }, [])
    const login = async (signatureData: SignatureData) => {
        try {
            await WalletController.login(Favor.url, signatureData)
            close();
        } catch (e) {
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: e.message,
            });
        }
    }
    const close = () => {
        dispatch(controllersUpdateState({
            globalBottomSheet: false,
        }))
    }

    return <>
        <BottomSheetModal
          visible={globalBottomSheet}
          setVisible={close}
        >
            {
                data ?
                  <InputPassword type={0} fn={login} btnText={'Login'}/>
                  :
                  <WalletConnect/>
            }
        </BottomSheetModal>
    </>
};

export default WalletBottomSheet;
