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
        if (!WalletController.passwordVerify(password)) {
            console.error('Password Error')
            return;
        }
        fn(WalletController.getSignatureData(1));
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
