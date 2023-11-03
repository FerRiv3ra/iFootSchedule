import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {heightScale} from '../helpers/scale';

const WaitingDraw = () => {
  return (
    <View style={styles.imgContainer}>
      <Image style={styles.img} source={require('../assets/waiting.png')} />
    </View>
  );
};

export default WaitingDraw;

const styles = StyleSheet.create({
  img: {
    height: heightScale(180),
    width: '100%',
    borderRadius: 10,
  },
  imgContainer: {
    marginVertical: 10,
  },
});
