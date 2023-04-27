import React from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import {FontSize, FontFamily, Color, Border, Padding} from "../GlobalStyles";
import TextInputParsed from "./TextInputParsed";

type Props = {
  title: string;
  placeholder?: string;
  value: string,
  setValue: (value: string) => void
  multiline?: boolean
  height?: number,
  parsed?: boolean
};

const TextInputBlock: React.FC<Props> = (props) => {
  const defaultHeight = 100;
  const { title,
    placeholder,
    value,
    setValue,
    multiline = false,
    height = defaultHeight,
    parsed = false
  } = props;

  return (
    <View style={styles.createWalletInner}>
      <Text style={styles.title}>{title}</Text>
      { parsed ? <>
        <TextInputParsed
          multiline={multiline}
          height={height}
          style={[styles.input, multiline && {height: height}]}
          value={value}
          placeholder={placeholder}
          onChangeText={setValue}
        />
      </> : <>
        <TextInput
          multiline={multiline}
          style={[styles.input, multiline && {height: height}]}
          value={value}
          placeholder={placeholder}
          onChangeText={setValue}
        />
      </> }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0,
    fontSize: FontSize.bodyBody17_size,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
    color: Color.iOSSystemLabelsLightPrimary,
    display: "flex",
    width: 343,
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: Border.br_3xs,
    padding: Padding.p_smi,
    paddingTop: Padding.p_smi,
  },
  createWalletInner: {
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default TextInputBlock;
