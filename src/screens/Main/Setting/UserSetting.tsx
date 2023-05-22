import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import FavorDaoNavBar from "../../../components/FavorDaoNavBar";
import {useNavigation} from "@react-navigation/native";
import Screens from "../../../navigation/RouteNames";
import UserSettingItem from "../../../components/UserSettingItem";

type Props = {};

const UserSetting: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const goToModifyName = () => {
    // @ts-ignore
    navigation.navigate(Screens.ModifyName);
  }

  const goToChangePassword = () => {
    // @ts-ignore
    navigation.navigate(Screens.AccountCancellation);
  }

  const goToAccountCancellation = () => {
    // @ts-ignore
    navigation.navigate(Screens.AccountCancellation);
  }

  const goToLogOut = () => {
    // @ts-ignore
    navigation.navigate(Screens.ModifyName);
  }


  return (
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
})

export default UserSetting;