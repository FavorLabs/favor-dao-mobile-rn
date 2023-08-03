import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {Color, FontSize} from "../GlobalStyles";

type Props = {
  title: string;
  onClick: () => void;
  language?: any;
};
const UserSettingItem: React.FC<Props> = (props) => {
  const { title, onClick, language } = props

  return (
    <TouchableOpacity style={styles.block} onPress={onClick}>
      <Text style={styles.text}>{title}</Text>

      <View style={styles.right}>
        {
          language &&
            <Text style={styles.language}>{language}</Text>
        }
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/setting-right-icon.png")}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  language: {
    fontWeight: '400',
    fontSize: FontSize.bodyBody17_size,
    color: Color.iOSSystemLabelsLightPrimary
  },
  icon: {
    width: 18,
    height: 18,
  },
})

export default UserSettingItem;
