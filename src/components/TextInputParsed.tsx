import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";
import ParsedText from 'react-native-parsed-text';
import {Padding} from "../GlobalStyles";

export type Props = TextInputProps & {
  height?: number;
};

const TextInputParsed: React.FC<Props> = (props) => {
  const { value, height } = props;

  const inputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    // console.log('handleFocus');
    setIsFocused(true);
  };
  const handleBlur = () => {
    // console.log('handleBlur');
    setIsFocused(false);
  };
  const handleTopicPress = (topic: string) => {
    // console.log(`Pressed on topic: ${topic}`);
  };
  const handleUserPress = (user: string) => {
    // console.log(`Pressed on user: ${user}`);
  };

  const parsePatterns = [
    { pattern: /#(\w+)/, style: { color: 'red' }, onPress: handleTopicPress },
    { pattern: /@(\w+)/, style: { color: 'green' }, onPress: handleUserPress },
  ];

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused, inputRef.current]);

  return (
    <View style={styles.container}>
      { (!isFocused && value?.trim().length) ? <>
        <TouchableOpacity activeOpacity={1} onPress={() => { setIsFocused(true) }}>
          <ScrollView style={[props.style, styles.scrollWrap]}>
            <ParsedText parse={parsePatterns} style={styles.ParsedText}>
              {value}
            </ParsedText>
          </ScrollView>
        </TouchableOpacity>
      </> : <>
        <TextInput { ...props } onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} />
      </> }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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