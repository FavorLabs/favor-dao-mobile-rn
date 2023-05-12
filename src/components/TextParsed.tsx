import React from 'react';
import { Text } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import {Color} from "../GlobalStyles";
import {RegExps} from "./TextInputParsed";

export type Props = typeof Text & {
  content: string;
};
const TextParsed: React.FC<Props> = (props) => {
  const { content } = props;

  const parsePatterns = [
    { pattern: RegExps.tag, style: { color: Color.accentLight } },
    { pattern: RegExps.user, style: { color: Color.accentLight } },
  ];

  return (
    <ParsedText
      { ...props }
      parse={parsePatterns}
    >
      { content }
    </ParsedText>
  )
};

export default TextParsed;