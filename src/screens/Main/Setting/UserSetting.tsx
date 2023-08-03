import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation,CommonActions} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import UserSettingItem from "../../../components/UserSettingItem";
import {Color, FontSize} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import packageInfo from "../../../../package.json"
import I18n, {getLanguages, setLocale, strings} from "../../../locales/i18n";
import {Picker} from '@react-native-picker/picker';
import BottomSheetModal from "../../../components/BottomSheetModal";
import moment from 'moment';

const UserSetting = () => {
  const navigation = useNavigation();
  const [languageList, setLanguageList] = useState<any[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState(I18n.locale);
  const [selectedLabel, setSelectedLabel] = useState();
  const [popUpShow, setPopUpShow] = useState(false);
  const languages = getLanguages();
  const languageOptions = Object.keys(languages).map((key) => ({
    value: key,
    // @ts-ignore
    label: languages[key],
    key,
  }));

  useEffect(() => {
    setSelectedLabel(languageOptions.find(v => v.value === I18n.locale)?.label)
    setLanguageList(() => languageOptions);
    moment.locale(I18n.locale === 'zh' ? 'zh-cn' : 'en');
  }, [I18n.locale])

  const goToModifyName = () => {
    // @ts-ignore
    navigation.navigate(Screens.ModifyName);
  }

  const goToChangePassword = () => {
    // @ts-ignore
    navigation.navigate(Screens.ChangePassword);
  }

  const goToAccountCancellation = () => {
    // @ts-ignore
    navigation.navigate(Screens.AccountCancellation);
  }

  const goToLogOut = () => {
    // @ts-ignore
    navigation.navigate(Screens.LogOut);
  }

  const onChange = () => {
    setPopUpShow(true)
  }

  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar title={strings('SettingScreen.title')}/>
        <ScrollView>
          <UserSettingItem title={strings('SettingScreen.ModifyName')} onClick={goToModifyName}/>
          <UserSettingItem title={strings('SettingScreen.ChangePassword')} onClick={goToChangePassword}/>
          <UserSettingItem title={strings('SettingScreen.AccountCancellation')} onClick={goToAccountCancellation}/>
          <UserSettingItem title={strings('SettingScreen.LogOut')} onClick={goToLogOut}/>
          <UserSettingItem title={strings('SettingScreen.language')} onClick={onChange} language={selectedLabel}/>
          <View style={styles.version}>
            <Text style={styles.about}>{strings('SettingScreen.About')}</Text>
            <Text style={styles.versionText}>{strings('SettingScreen.version')} {packageInfo.version}.0801</Text>
          </View>
        </ScrollView>

        <BottomSheetModal visible={popUpShow} setVisible={setPopUpShow} height={'25%'}>
          <Picker
            mode={"dropdown"}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLanguage(itemValue)
              setLocale(itemValue)
              setPopUpShow(false)
              // @ts-ignore
              navigation.navigate(Screens.Main.Feeds);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: Screens.Main.Feeds}]
                })
              );
            }}>
            {
              languageList.map((item,key) => <Picker.Item label={item.label} value={item.value} key={key}/>)
            }
          </Picker>
        </BottomSheetModal>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  version: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
  },
  about: {
    fontWeight: '500',
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary
  },
  versionText: {
    fontWeight: '400',
    fontSize: FontSize.bodyBody17_size,
  },
})

export default UserSetting;
