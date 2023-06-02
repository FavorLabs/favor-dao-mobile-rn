import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType, TouchableOpacity,
} from "react-native";
import {FontSize, FontFamily, Color} from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";

type FavorDaoNavBarType = {
  title?: string;
  vector?: ImageSourcePropType;
  rightComponent?: React.ReactNode;
};

const FavorDaoNavBar = ({title, vector,rightComponent}: FavorDaoNavBarType) => {
  const navigation = useNavigation()
  const back = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.left} onPress={back}>
        <Image
          style={styles.vectorIcon} resizeMode="cover"
          source={vector || require("../assets/vector6.png")}
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>

      <View style={styles.right}>
        { rightComponent }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  left: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // bottom: 0,
    width: '20%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  vectorIcon: {
    width: 8,
    height: 14,
  },
  backText: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: '400',
    color: Color.royalblue_100,
    marginLeft: 5,
  },
  center: {
    maxWidth: '60%',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    fontWeight: "600",
    color: Color.iOSSystemLabelsLightPrimary,
  },
  right: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // bottom: 0,
    width: '20%',
    alignItems: 'flex-end',
  },
})

export default FavorDaoNavBar;
