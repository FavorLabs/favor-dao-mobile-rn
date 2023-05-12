// import Web3 from 'web3';
import { Post } from '../declare/api/DAOApi';
// import { debounce } from 'lodash';
import EventEmitter from 'eventemitter3';
import moment from 'moment';
import { useRef } from 'react';

export const splitUrl = (url: string): [string, string, string] => {
  let i = new URL(url);
  return [i.protocol, i.hostname, i.port];
};

export const getEndPoint = (): boolean | string => {
  const params = new URLSearchParams(location.search);
  const endpoint = params.get('endpoint');
  if (endpoint) {
    return new URL(endpoint).origin;
  } else {
    return false;
  }
};

// export const appName = new URLSearchParams(location.search).get('name');

// export const getKeyByName = (type: 'token' | 'connectType') => {
//   const networkId = localStorage.getItem('network_id');
//   let arr = [];
//   if (type === 'token') {
//     arr = ['token', networkId, appName];
//   } else {
//     arr = ['connectType', networkId, appName];
//   }
//   return arr
//   .filter((item) => {
//     if (item) return item;
//   })
//   .join('-');
// };

// export const websocket = (host: string) => {
//   let ws = new Web3.providers.WebsocketProvider(host, {
//     reconnect: {
//       auto: true,
//     },
//   });
//   // @ts-ignore
//   ws.on(ws.DATA, (res) => {
//     // @ts-ignore
//     ws.emit(res.params.subscription, res.params.result);
//   });
//   return ws;
// };

export const isMobile = () => {
  return navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );
};

export const isFavorApp = (isJudgment?: boolean) => {
  if (isJudgment) {
    return !navigator.userAgent.match(/FavorDao/i);
  } else {
    return navigator.userAgent.match(/favor/i);
  }
};

export const getProgress = (b: string, len: number) => {
  const oneLen = b.match(/1/g)?.length || 0;
  return (oneLen / len) * 100;
};

export const stringToBinary = (b: string, len: number) => {
  let value = '';
  let uStr = window.atob(b);
  for (let i = 0; i < uStr.length; i++) {
    let char = uStr.charCodeAt(i).toString(2);
    char = char.split('').reverse().join('');
    value += char + '0'.repeat(8 - char.length);
  }
  if (len < value.length) {
    value = value.substr(0, len);
  }
  return value;
};

export const omitAddress = (
    str: string,
    start: number = 6,
    end: number = 4,
) => {
  return str.substring(0, start) + '...' + str.substring(str.length - end);
};

export const getSize = (size: number, level: number = 0): string => {
  let levelList: string[] = ['B', 'KB', 'M', 'G', 'T'];
  let n: number = 0;
  while (size >= Math.pow(1024, n + 1)) {
    n++;
  }
  return (
      parseFloat((size / Math.pow(1024, n)).toFixed(2)) +
      ' ' +
      levelList[level + n]
  );
};

export const sleep = async (time: number) => {
  await new Promise((s) => {
    setTimeout(s, time);
  });
};

export const eventEmitter = new EventEmitter();

// export const checkLogin = () => {
//   const token = localStorage.getItem(getKeyByName('token'));
//   const connectType = localStorage.getItem(getKeyByName('connectType'));
//   return !!(token && connectType);
// };

export const getContent = (contents: Post[]) => {
  if (!Array.isArray(contents)) return {};
  return contents?.reduce((prev, content) => {
    prev[content.type] = (prev[content.type] || []).concat(content);
    return prev;
  }, {} as Record<number, Post[]>);
};

export const getTime = (time: number) => {
  const t = time.toString().length === 10 ? time * 1000 : time;
  return moment(t).fromNow();
};

export const query = (params: any) => {
  let newParams = {
    page: JSON.stringify(params.page || {}),
    sort: JSON.stringify(params.sort || {}),
    filter: JSON.stringify(params.filter || []),
  };
  return (
      Object.keys(newParams)
          // @ts-ignore
          .map((key) => [key, newParams[key]].map(encodeURIComponent).join('='))
          .join('&')
  );
};

export const randomHex = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')}`;
};

export const getDownloadNumber = (b: string) => {
  return b.match(/1/g)?.length || 0;
};

export const getDebounce = (fn: Function, delay: number = 500) => {
  const refTimer = useRef<number>();

  return function f(...args: any) {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }
    // @ts-ignore
    refTimer.current = setTimeout(() => {
      fn(args);
    }, delay);
  };
};

export const getMatchedStrings = (str: string, regex: RegExp): string[] => {
  const matches = str.match(regex);
  if (!matches) return [];
  return matches.map(match => match.slice(1));
}
