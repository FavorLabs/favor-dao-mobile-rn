import React, {useEffect, useState} from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Switch } from '@rneui/themed';
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import {strings} from "../locales/i18n";

export type Props = {
  mode: number;
  setMode: React.Dispatch<React.SetStateAction<number>>;
}

const SwitchButton: React.FC<Props> = (props) => {
  const { mode, setMode } = props;

  const [checked, setChecked] = useState(!!mode);

  useEffect(() => {
    switch (mode) {
      case 0:
        setChecked(false);
        break;
      case 1:
        setChecked(true);
        break;
      default:
        console.log('mode error');
    }
  }, [mode]);

  return (
    <View style={styles.container}>
      <Text style={styles.blockTitle}>{strings('SwitchButton.Default')}</Text>
      <View style={styles.switchWrap}>
        <Text style={styles.switchText}>{strings('SwitchButton.Public')}</Text>
        <Switch
          color={Color.orange}
          value={checked}
          onValueChange={(value) => {
            setMode(value ? 1 : 0);
          }}
        />
        <Text style={styles.switchText}>{strings('SwitchButton.Private')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  blockTitle: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: '600',
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
  },
  switchWrap: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
  },
});

export default SwitchButton;
