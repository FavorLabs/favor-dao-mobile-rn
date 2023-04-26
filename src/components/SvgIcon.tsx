import React, { ReactElement } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

type Props = {
  svg: ReactElement;
  width?: number;
  height?: number;
  clickFn?: () => void;
}

const SvgIcon: React.FC<Props> = (props) => {
  const { svg, width = 20, height = 20, clickFn } = props;

  const SvgElement = <View>
    { React.cloneElement(svg, {
      width,
      height,
    }) }
  </View>

  return (
    <>
      {
        clickFn ?
        <TouchableWithoutFeedback onPress={() => { clickFn() }}>
          { SvgElement }
        </TouchableWithoutFeedback> : SvgElement
      }
    </>
  )
}

export default SvgIcon;