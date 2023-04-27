import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import {TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";
import ParsedText from 'react-native-parsed-text';
import {Padding} from "../GlobalStyles";

export type Props = TextInputProps & {
  height?: number;
};

const TextInputParsed: React.FC<Props> = (props) => {
  const { value, height } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleTopicPress = (topic: string) => {
    console.log(`Pressed on topic: ${topic}`);
  };
  const handleUserPress = (user: string) => {
    console.log(`Pressed on user: ${user}`);
  };

  const parsePatterns = [
    { pattern: /#(\w+)/, style: { color: 'red' }, onPress: handleTopicPress },
    { pattern: /@(\w+)/, style: { color: 'green' }, onPress: handleUserPress },
  ];

  return (
    <View style={styles.container}>
      { (!isFocused && value?.trim().length) ? <>
        <ScrollView style={[props.style, styles.scrollWrap]}>
          <ParsedText parse={parsePatterns} style={styles.ParsedText}>
            {value}
          </ParsedText>
        </ScrollView>
      </> : <>
        <TextInput { ...props } onFocus={handleFocus} onBlur={handleBlur} />
      </> }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    //
  },
  scrollWrap: {
    paddingTop: 0,
    paddingHorizontal: 0
  },
  ParsedText: {
    height: undefined,
    padding: Padding.p_smi,
  }
})

export default TextInputParsed;