import React, {useState} from 'react';
import TextInputBlock from "./TextInputBlock";
import FavorDaoButton from "./FavorDaoButton";
import {TouchableOpacity} from "react-native";
import WalletController from "../libs/walletController";
import UserApi from "../services/DAOApi/User";
// import styles from "./index.less";

export type Props = {
    fn: Function
}
const InputPassword = ({fn}: Props) => {
    const [password, setPassword] = useState('')
    const confirm = () => {
        try {
            const privateKey = WalletController.exportPrivateKey(password);
            fn(WalletController.getSignatureData(privateKey, 1));
        } catch (e) {
            console.error('Password Error')
        }
    }
    return <>
        <TextInputBlock title={'Password'} placeholder={'Please enter password here'} value={password}
                        setValue={setPassword}/>
        <TouchableOpacity onPress={confirm}>
            <FavorDaoButton
              textValue="Confirm"
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
            />
        </TouchableOpacity>
    </>
};

export default InputPassword;
