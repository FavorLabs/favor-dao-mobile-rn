import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity, Platform} from "react-native";
import {FontSize, Color, Border, Padding} from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {getDebounce} from "../utils/util";
import SvgIcon from "./SvgIcon";
import AddIcon from '../assets/svg/Setting/addIcon.svg';
import SettingIcon from '../assets/svg/Setting/settingIcon.svg';
import DaoLevel from '../assets/svg/Setting/daoLevel.svg';

type Props = {};

const DAOManagementContainer: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const {dao} = useSelector((state: Models) => state.global);

  const toCreateDaoOrSetting = () => {
    if(dao) {
      // @ts-ignore
      navigation.navigate(Screens.DAOSetting);
    } else {
      // @ts-ignore
      navigation.navigate(Screens.CreateDAO);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.daoManagement, styles.addTypo]}>DAO Management</Text>
      <View style={styles.daomnglist}>

        <View style={styles.addbtn}>
          <TouchableOpacity onPress={getDebounce(toCreateDaoOrSetting)}>
            <SvgIcon svg={dao ? <SettingIcon/> : <AddIcon/>} width={24} height={24}/>
          </TouchableOpacity>
          <Text style={[styles.add, styles.addTypo]}>{dao ? 'Setting' : 'Add'}</Text>
        </View>

        {/*<View style={styles.daoListChild}/>*/}

        {
          Platform.OS !== 'ios' &&
            <View style={styles.daosetting}>
                <SvgIcon svg={<DaoLevel/>} width={24} height={24}/>
                <Text style={[styles.add, styles.addTypo]}>DAO Level</Text>
            </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_3xs,
  },
  addTypo: {
    fontWeight: '500',
    letterSpacing: 0,
  },
  daoManagement: {
    fontSize: FontSize.size_mini,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
  },
  add: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    color: 'rgba(0,0,0,0.8)',
    textAlign: "center",
    marginTop: 5,
  },
  addbtn: {
    alignItems: "center",
  },
  daoListChild: {
    backgroundColor: Color.lightgray,
    width: 2,
    height: 24,
    marginLeft: 25,
    borderRadius: Border.br_3xs,
  },
  daosetting: {
    marginLeft: 43,
    alignItems: "center",
  },
  daomnglist: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
  },
});

export default DAOManagementContainer;
