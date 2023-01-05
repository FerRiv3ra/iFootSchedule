import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import KnockoutLeft from './KnockoutLeft';
import globalStyles from '../styles/styles';
import KnockoutRight from './KnockoutRight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import useApp from '../hooks/useApp';

const Knockouts = () => {
  const [utc, setUtc] = useState('+00:00');
  const [matchesP1, setMatchesP1] = useState([]);
  const [matchesP2, setMatchesP2] = useState([]);
  const [finalMatch, setFinalMatch] = useState({});
  const [final, setFinal] = useState(false);

  const {matchesC} = useApp();

  useEffect(() => {
    getUTC();
  }, []);

  useEffect(() => {
    setMatchesP1(
      matchesC.filter((match, index) => {
        if (index < 4) return match;
      }),
    );
    setMatchesP2(
      matchesC.filter((match, index) => {
        if (index >= 4 && index < 8) return match;
      }),
    );
  }, [matchesC]);

  const getUTC = async () => {
    const utcStg = await AsyncStorage.getItem('UTC');

    if (utcStg) {
      setUtc(utcStg);
    }
  };

  console.log(matchesP1);

  return (
    <View>
      {final ? (
        <View>
          <View style={styles.containerFinal}>
            <Text style={styles.team}>{finalMatch.local}</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[finalMatch.local]?.file}
            />
            <Text style={{color: '#111111'}}>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[finalMatch.visit]?.file}
            />
            <Text style={styles.team}>{finalMatch.visit}</Text>
          </View>
          <Text style={styles.date}>
            {moment(finalMatch.dat).format('lll')}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={globalStyles.flex}>
            {matchesP1.map(match => (
              <KnockoutLeft key={match._id} match={match} utc={utc} />
            ))}
          </View>
          <View style={globalStyles.flex}>
            {matchesP2.map(match => (
              <KnockoutRight key={match._id} match={match} utc={utc} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Knockouts;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerFinal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoTeam: {
    width: 50,
    height: 50,
    margin: 10,
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
    color: '#111111',
  },
});
