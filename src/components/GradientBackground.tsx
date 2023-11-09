import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import ThemeContext from '../context/ThemeContext';
import {useFade} from '../hooks/useFade';

const GradientBackground = ({children}: any) => {
  const {colors, prevColors, setPrevMainColors} = useContext(ThemeContext);

  const {opacity, fadeIn, fadeOut} = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevMainColors(colors);
      fadeOut(0);
    });
  }, [colors]);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={prevColors}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
        }}>
        <LinearGradient
          colors={colors}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBackground;
