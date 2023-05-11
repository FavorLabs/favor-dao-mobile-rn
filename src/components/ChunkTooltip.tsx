import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorArr } from './ChunkSourceInfo';
import {Color} from "../GlobalStyles";

export type Props = {
  chunk: number[];
};
const ChunkTooltip: React.FC<Props> = (props) => {
  const chunkArr: number[] = props.chunk;
  return (
    <View style={styles.container}>
      { chunkArr.map((item, index) => {
        return (
          <View
            key={index}
            style={[styles.square, { backgroundColor: colorArr[item] }]}
          />
        )
      }) }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  square: {
    marginVertical: 1,
    marginHorizontal: 1,
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: Color.iOSSystemLabelsLightPrimary,
    borderStyle: 'solid'
  }
})

export default ChunkTooltip;