import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkMultiple, requestMultiple } from 'react-native-permissions';
import {
  AutumnDomainName,
  DaoDomainName,
} from '../config/constants';
import { BucketsPath } from '../declare/api/DAOApi';
import {Permission} from "react-native-permissions/src/types";

export const useUrl = () => {
  // let { api, config } = useSelector((state: any) => state.global);
  // if (!config) return '';
  // return api + '/group/http/' + config.proxyGroup + '/' + DaoDomainName + '/v1';
  return 'http://192.168.100.250:1609/group/http/dao-backend-local/favordao/v1';
};

export const useResourceUrl = (type: BucketsPath) => {
  // let { api, config, settings } = useSelector((state: any) => state.global);
  // if (!config || !settings) return '';
  // return (
  //   api +
  //   '/group/http/' +
  //   config.proxyGroup +
  //   '/' +
  //   AutumnDomainName +
  //   '/' +
  //   settings.Bucket +
  //   '/' +
  //   type
  // );
  return 'http://192.168.100.250:1609/group/http/dao-backend-local/autumn/paopao19/' + type
};

export const useClick = (callback: any, doubleCallback: any) => {
  const clickRef = useRef({
    clickCount: 0,
    time: 0,
    timer: null,
  });
  return (...args: any[]) => {
    clickRef.current.clickCount += 1;
    clickRef.current.time = Date.now();
    // @ts-ignore
    clickRef.current.timer = setTimeout(() => {
      if (
        Date.now() - clickRef.current.time <= 200 &&
        clickRef.current.clickCount === 2
      ) {
        doubleCallback && doubleCallback.apply(null, args);
      }
      if (clickRef.current.clickCount === 1) {
        callback && callback.apply(null, args);
      }
      // @ts-ignore
      clearTimeout(clickRef.current.timer);
      clickRef.current.clickCount = 0;
    }, 200);
  };
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

  return { status, requestPermission };
};
