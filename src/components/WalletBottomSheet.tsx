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
import {useUrl} from "../utils/hook";
import Toast from "react-native-toast-message";
import {getDAOInfo} from "../utils/util";
import {strings} from "../locales/i18n";

const WalletBottomSheet = () => {
    const url = useUrl();
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
            await WalletController.login(url, signatureData)
            await getDAOInfo(dispatch);
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
                  <InputPassword type={0} fn={login} btnText={strings('WalletBottomSheet.Login')}/>
                  :
                  <WalletConnect/>
            }
        </BottomSheetModal>
    </>
};

export default WalletBottomSheet;
