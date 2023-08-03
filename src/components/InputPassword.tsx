import React, {useState} from 'react';
import TextInputBlock from "./TextInputBlock";
import FavorDaoButton from "./FavorDaoButton";
import {Pressable} from "react-native";
import WalletController from "../libs/walletController";
import {SignatureData} from "../declare/api/DAOApi";
import Toast from "react-native-toast-message";
import {strings} from "../locales/i18n";

export type Props = {
    // fn?: <T=any>(data: T) => void
    fn?: (signatureData: SignatureData) => void
    btnText?: string
    // signType?: number
    // type: 'password' | 'm' | 'sign'
    type?: number
    psd?: () => void
}
const InputPassword = ({fn, btnText = strings('InputPassword.btnText'), type, psd}: Props) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const confirm = async () => {
        await setLoading(true);
        try {
            if(type !== undefined) {
                const privateKey = WalletController.exportPrivateKey(password);
                await fn?.(WalletController.getSignatureData(privateKey, type));
            } else {
                const m = WalletController.exportMnemonic(password);
                if(m) psd?.();
            }
        } catch (e) {
            Toast.show({
                type:'error',
                text1: strings('InputPassword.Toast.PasswordError')
            })
        } finally {
            setLoading(false);
        }
    }

    return <>
        <TextInputBlock title={strings('InputPassword.PasswordTitle')} placeholder={strings('InputPassword.PasswordPlaceholder')} value={password}
                        setValue={setPassword} secureTextEntry/>
        <Pressable disabled={loading} onPress={confirm} style={{marginTop: 20}}>
            <FavorDaoButton
              isLoading={loading}
              textValue={btnText}
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
            />
        </Pressable>
    </>
};

export default InputPassword;
