import * as React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import TextInputParsed from "./TextInputParsed";

type TextInputBlockType = React.ComponentProps<typeof TextInput> & {
  title: string
  value: string
  setValue: (value: string) => void
  height?: number
}

const TextInputParsedBlock = (props: TextInputBlockType) => {
  const {
    title,
    value,
    setValue,
    height = 100,
    ...inputProps
  } = props;

  return (
    <View style={styles.createWalletInner}>
      <Text style={styles.title}>{title}</Text>
      <TextInputParsed
        height={height}
        style={[styles.input, inputProps.multiline && {height: height,textAlignVertical: 'top'}]}
        value={value}
        onChangeText={setValue}
        { ...inputProps }
      />
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

export default TextInputParsedBlock;
