import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Animated } from 'react-native';

const SPIN_DURATION = 1000;

type Props = {
  isLoading: boolean;
}
const LoadingSpinner: React.FC<Props> = (props) => {
  const { isLoading } = props;

  const [spinValue] = useState(new Animated.Value(0));
  const [animatedStyle, setAnimatedStyle] = useState({});

  useEffect(() => {
    if (isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: SPIN_DURATION,
          useNativeDriver: true,
        })
      );

      spinAnimation.start();

      return () => {
        spinAnimation.stop();
      };
    }
  }, [isLoading, spinValue]);

  useEffect(() => {
    setAnimatedStyle({
      transform: [
        {
          rotate: spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    });
  }, [spinValue]);

  return (
    <>
      {isLoading && (
        <Animated.Image
          style={[styles.iconLayout, animatedStyle]}
          resizeMode="cover"
          source={require("../assets/loading.png")}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: 20,
    height: 20,
  },
});

export default LoadingSpinner;
