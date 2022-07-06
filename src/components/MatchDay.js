import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MatchDay = ({match}) => {
  const [utc, setUtc] = useState('+00:00');
  const {local, visit, dat} = match;

  useEffect(() => {
    const getUTC = async () => {
      const utcStg = await AsyncStorage.getItem('UTC');

      if (utcStg) {
        setUtc(utcStg);
      }
    };

    getUTC();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{local}</Text>
      <Image style={styles.logoTeam} source={SECTIONS[local]?.file} />
      <Text style={styles.hour}>
        {match.played === 'true'
          ? `${match.goll} - ${match.golv}`
          : `${moment(dat).utcOffset(utc).hours()}:00`}
      </Text>
      <Image style={styles.logoTeam} source={SECTIONS[visit]?.file} />
      <Text style={styles.text}>{visit}</Text>
    </View>
  );
};

export default MatchDay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  logoTeam: {
    width: 20,
    height: 20,
    margin: 5,
  },
  hour: {
    textAlign: 'center',
    width: 80,
  },
  text: {
    width: 40,
    marginHorizontal: 5,
  },
  icon: {
    color: '#000',
    position: 'absolute',
    right: 10,
  },
});
