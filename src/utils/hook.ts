import {useRef, useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkMultiple, requestMultiple} from 'react-native-permissions';
import {BucketsPath} from '../declare/api/DAOApi';
import { Dimensions, ScaledSize } from 'react-native';
import {
  AutumnDomainName,
  DaoDomainName,
} from '../config/constants';
import {Permission} from "react-native-permissions/src/types";
import Favor from "../libs/favor";
import WalletController from "../libs/walletController";
import {updateState as controllersUpdateState} from "../store/controllers";

interface ScreenData {
  screenWidth: number;
  screenHeight: number;
}

export const useUrl = () => {
    return Favor.url;
};

export const useResourceUrl = (type: BucketsPath) => {
    return Favor.resourceUrl + type
};

export const usePermissions = (permissionType: Permission) => {
    const [status, setStatus] = useState('undetermined');

    useEffect(() => {
        const getPermissionStatus = async () => {
            let permissionStatus: any = 'undetermined';
            try {
                permissionStatus = await checkMultiple([permissionType]);
            } catch (error) {
                console.log(error);
            }
            setStatus(permissionStatus[permissionType]);
        };
        getPermissionStatus();
    }, [permissionType]);

    const requestPermission = async () => {
        try {
            const result = await requestMultiple([permissionType]);
            setStatus(result[permissionType]);
            console.log(`Request ${permissionType}: ${result[permissionType]}`);
        } catch (error) {
            console.log(error);
        }
    };

    return {status, requestPermission};
};


export const useIsLogin = (): [boolean, Function] => {
    const dispatch = useDispatch();
    const {token} = useSelector<any, any>(state => state.wallet)
    const isLogin = useMemo(() => !!(token?.[Favor.networkName]), [token,Favor.networkName]);
    const gotoLogin = () => {
        dispatch(controllersUpdateState({
            globalBottomSheet: true
        }))
    }
    return [isLogin, gotoLogin];
};

export const useScreenDimensions = (): ScreenData => {
    const [screenData, setScreenData] = useState<ScreenData>({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
    });

    // useEffect(() => {
    //   const handler = ({ window }: { window: ScaledSize }) =>
    //     setScreenData({ screenWidth: window.width, screenHeight: window.height });
    //
    //   Dimensions.addEventListener('change', handler);
    //   // @ts-ignore
    //   return () => Dimensions.removeEventListener('change', handler);
    // }, []);

    return screenData;
};
