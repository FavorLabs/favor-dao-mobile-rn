import 'react-native-get-random-values';

global.btoa = global.btoa || require('base-64').encode;
global.atob = global.atob || require('base-64').decode;
