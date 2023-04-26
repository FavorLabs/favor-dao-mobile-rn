import React from 'react';
import {Icon} from '@rneui/themed';

export type Props = {
    value: boolean
    setValue: (value: boolean) => void
}
const AgreeCheckBox = ({value, setValue}: Props) => {
    const name = value ? 'check-circle-outline' : 'radio-button-unchecked'
    return <>
        <Icon
            size={16}
            name={name}
            onPress={() => {
                setValue(!value);
            }}
        />
    </>
};

export default AgreeCheckBox;
