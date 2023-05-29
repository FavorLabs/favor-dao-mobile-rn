import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import UserSettingItem from "../../../components/UserSettingItem";
import {Color, FontSize} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";

type Props = {};

const UserSetting: React.FC<Props> = (props) => {
  const navigation = useNavigation();
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


  return (
    <BackgroundSafeAreaView>
      <View style={styles.container}>
        <FavorDaoNavBar
          title="Setting"
          vector={require("../../../assets/vector6.png")}
        />
        <ScrollView>
          <UserSettingItem title={'Modify name'} onClick={goToModifyName}/>
          <UserSettingItem title={'Change password'} onClick={goToChangePassword}/>
          <UserSettingItem title={'Account cancellation'} onClick={goToAccountCancellation}/>
          <UserSettingItem title={'Log out'} onClick={goToLogOut}/>
          <View style={styles.version}>
            <Text style={styles.about}>About</Text>
            <Text style={styles.versionText}>version 1.0.2.0529</Text>
          </View>
        </ScrollView>
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