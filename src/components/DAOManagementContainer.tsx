import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity, Platform} from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import Screens from "../navigation/RouteNames";
import {getDebounce} from "../utils/util";

type Props = {};

const DAOManagementContainer: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const { dao } = useSelector((state: Models) => state.global);

  const toCreateDao = () => {
    // @ts-ignore
    navigation.navigate(Screens.CreateDAO);
  }

  const toDAOSetting = () => {
    // @ts-ignore
    navigation.navigate(Screens.DAOSetting);
  }

  return (
    <View style={styles.daomanagement}>
      <Text style={[styles.daoManagement, styles.addTypo]}>DAO Management</Text>
      <View style={styles.daomnglist}>
        {
          !dao ?
            <View style={styles.addbtn}>
              <TouchableOpacity onPress={getDebounce(toCreateDao)}>
              <Image
                style={styles.materialSymbolsaddBoxIcon}
                resizeMode="cover"
                source={require("../assets/daoManagement-add.png")}
              />
              </TouchableOpacity>
              <Text style={[styles.add, styles.addTypo]}>Add</Text>
            </View>
            :
            <View style={styles.addbtn}>
              <TouchableOpacity onPress={getDebounce(toDAOSetting)}>
              <Image
                style={styles.materialSymbolsaddBoxIcon}
                resizeMode="cover"
                source={require("../assets/daoManagement-setting.png")}
              />
              </TouchableOpacity>
              <Text style={[styles.add, styles.addTypo]}>Setting</Text>
            </View>
        }
        <View style={styles.daomnglistChild} />
        {
          Platform.OS !== 'ios' &&
            <View style={styles.daosetting}>
                <Image
                    style={styles.materialSymbolsaddBoxIcon}
                    resizeMode="cover"
                    source={require("../assets/daoManagement-daoLevel.png")}
                />
                <Text style={[styles.add, styles.addTypo]}>DAO Level</Text>
            </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addTypo: {
    fontWeight: '500',
    letterSpacing: 0,
  },
  daoManagement: {
    fontSize: FontSize.size_xs,
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    alignSelf: "stretch",
  },
  materialSymbolsaddBoxIcon: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  add: {
    fontSize: FontSize.capsCaps310SemiBold_size,
    color: Color.gray_300,
    textAlign: "center",
    marginTop: 5,
  },
  addbtn: {
    alignItems: "center",
  },
  daomnglistChild: {
    backgroundColor: Color.lightgray,
    width: 2,
    height: 24,
    marginLeft: 25,
    borderRadius: Border.br_3xs,
  },
  daosetting: {
    marginLeft: 25,
    alignItems: "center",
  },
  daomnglist: {
    width: 295,
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
  },
  daomanagement: {
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
});

export default DAOManagementContainer;
