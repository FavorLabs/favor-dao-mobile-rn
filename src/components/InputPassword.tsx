import React, {useState} from 'react';
import TextInputBlock from "./TextInputBlock";
import FavorDaoButton from "./FavorDaoButton";
import {TouchableOpacity} from "react-native";
import WalletController from "../libs/walletController";
import UserApi from "../services/DAOApi/User";
import {SignatureData} from "../declare/api/DAOApi";
// import styles from "./index.less";

export type Props = {
    fn: (signatureData: SignatureData) => void
    btnText?: string
    type: number
}
const InputPassword = ({fn, btnText = 'Confirm', type}: Props) => {
    const [password, setPassword] = useState('')
    const confirm = () => {
        try {
            const privateKey = WalletController.exportPrivateKey(password);
            fn(WalletController.getSignatureData(privateKey, type));
        } catch (e) {
            console.error('Password Error')
        }
    }
    return <>
        <TextInputBlock title={'Password'} placeholder={'Please enter password here'} value={password}
                        setValue={setPassword}/>
        <TouchableOpacity onPress={confirm}>
            <FavorDaoButton
              textValue={btnText}
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
            />
        </TouchableOpacity>
    </>
};

export default InputPassword;
