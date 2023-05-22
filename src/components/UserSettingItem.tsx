import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";

type Props = {
  title: string;
  onClick: () => void;
};
const UserSettingItem: React.FC<Props> = (props) => {
  const { title, onClick } = props

  return (
    <TouchableOpacity style={styles.block} onPress={onClick}>
      <Text style={styles.text}>{title}</Text>

      <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../assets/setting-right-icon.png")}
      />
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

  },
  icon: {
    width: 18,
    height: 18,
  },
})

export default UserSettingItem;