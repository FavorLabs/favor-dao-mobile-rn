import React, {useEffect} from 'react';
import WalletConnect from "./WalletConnect";
import BottomSheet from "./BottomSheet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateState as controllersUpdateState} from "../store/controllers"

const WalletBottomSheet = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const {globalBottomSheet} = useSelector<any, any>(state => state.controllers)

    useEffect(() => {
        return navigation.addListener('state', () => {
            dispatch(controllersUpdateState({
                globalBottomSheet: false,
            }))
        })
    }, [])

    return <>
        <BottomSheet show={globalBottomSheet} showCancel={true}>
            <WalletConnect/>
        </BottomSheet>
    </>
};

export default WalletBottomSheet;
