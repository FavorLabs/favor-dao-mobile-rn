import ReactNative from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';
import { LANGUAGE } from '../config/constants';
import { EventEmitter } from 'events';
import en from './languages/en-US';
import zh from './languages/zh-CN';
import moment from 'moment';

export const supportedTranslations = {
  en,
  zh,
};
export const I18nEvents = new EventEmitter();
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
I18n.translations = supportedTranslations;
// If language selected get locale
getUserPreferableLocale();

export const isRTL = false;

export async function setLocale(locale) {
  I18n.locale = locale;
  await AsyncStorage.setItem(LANGUAGE, locale);
  I18nEvents.emit('localeChanged', locale);
}

export function getLanguages() {
  if(I18n.locale === 'en') {
    return {
      en: 'English',
      zh: 'Chinese',
    };
  } else {
    return {
      en: '英文',
      zh: '中文',
    };
  }
}

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

async function getUserPreferableLocale() {
  const locale = await AsyncStorage.getItem(LANGUAGE);
  if (locale) {
    I18n.locale = locale;
    moment.locale(locale === 'zh' ? 'zh-cn' : 'en');
  }
}

export default I18n;
