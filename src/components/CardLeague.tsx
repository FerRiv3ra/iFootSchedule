import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {LeaguesDataInterface} from '../types/matches';

interface Props {
  item: LeaguesDataInterface;
}

const CardLeague = ({item}: Props) => {
  return (
    <View style={styles.card}>
      <Image source={item.img} style={{...styles.img}} />
    </View>
  );
};

export default CardLeague;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 60,
    maxWidth: 500,
    maxHeight: 500,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 250,
    height: 250,
  },
});
