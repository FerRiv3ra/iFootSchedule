import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import KnockoutLeft from './KnockoutLeft';
import globalStyles from '../styles/styles';
import KnockoutRight from './KnockoutRight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';

const Knockouts = ({data, matchesPlayed}) => {
  const [utc, setUtc] = useState('+00:00');
  const [matchesP1, setMatchesP1] = useState([]);
  const [matchesP2, setMatchesP2] = useState([]);
  const [finalMatch, setFinalMatch] = useState({});
  const [final, setFinal] = useState(false);
  const [maxG1, setMaxG1] = useState(0);
  const [maxG2, setMaxG2] = useState(0);
  const [minG1, setMinG1] = useState(0);
  const [minG2, setMinG2] = useState(0);

  useEffect(() => {
    const getUTC = async () => {
      const utcStg = await AsyncStorage.getItem('UTC');

      if (utcStg) {
        setUtc(utcStg);
      }
    };

    if (matchesPlayed < 56) {
      setMinG1(49);
      setMaxG1(52);
      setMinG2(53);
      setMaxG2(56);
    } else if (matchesPlayed < 60) {
      setMinG1(57);
      setMaxG1(58);
      setMinG2(59);
      setMaxG2(60);
    } else if (matchesPlayed < 62) {
      setMinG1(61);
      setMaxG1(61);
      setMinG2(62);
      setMaxG2(62);
    } else {
      setFinalMatch(data.filter(match => match.id === 64)[0]);
      setFinal(true);
    }

    getUTC();
  }, [matchesPlayed, data]);

  useEffect(() => {
    setMatchesP1(data.filter(match => match.id >= minG1 && match.id <= maxG1));
    setMatchesP2(data.filter(match => match.id >= minG2 && match.id <= maxG2));
  }, [maxG2, data]);

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
            <Text>VRS</Text>
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
              <KnockoutLeft key={match.id} match={match} utc={utc} />
            ))}
          </View>
          <View style={globalStyles.flex}>
            {matchesP2.map(match => (
              <KnockoutRight key={match.id} match={match} utc={utc} />
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
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
  },
});
