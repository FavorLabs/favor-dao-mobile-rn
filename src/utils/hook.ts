import { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  AutumnDomainName,
  DaoDomainName,
} from '../config/constants';
import { BucketsPath } from '../declare/api/DAOApi';

export const useUrl = () => {
  let { api, config } = useSelector((state: any) => state.global);
  if (!config) return '';
  return api + '/group/http/' + config.proxyGroup + '/' + DaoDomainName + '/v1';
};

export const useResourceUrl = (type: BucketsPath) => {
  let { api, config, settings } = useSelector((state: any) => state.global);
  if (!config || !settings) return '';
  return (
    api +
    '/group/http/' +
    config.proxyGroup +
    '/' +
    AutumnDomainName +
    '/' +
    settings.Bucket +
    '/' +
    type
  );
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
