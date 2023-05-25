import React from 'react';
import {Icon} from '@rneui/themed';
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/global";

export type Props = {
    value: boolean
    setValue: (value: boolean) => void
}
const AgreeCheckBox = ({value, setValue}: Props) => {
    const dispatch = useDispatch();
    const { userAgreement } = useSelector((state: Models) => state.global);
    const name = value ? 'check-circle-outline' : 'radio-button-unchecked'
    return <>
        <Icon
            size={16}
            name={name}
            onPress={() => {
                // setValue(!value);
                dispatch(globalUpdateState({
                    userAgreement: !userAgreement
                }));
            }}
        />
    </>
};

export default AgreeCheckBox;
