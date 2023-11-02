import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import KnockoutSide from './KnockoutSide';
import globalStyles from '../theme/styles';

import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import useApp from '../hooks/useApp';
import {getUTC} from '../helper/getUTC';

const Knockouts = () => {
  const [utc, setUtc] = useState('+00:00');
  const [matchesP1, setMatchesP1] = useState([]);
  const [matchesP2, setMatchesP2] = useState([]);
  const [finalMatch, setFinalMatch] = useState({});
  const [final, setFinal] = useState(false);

  const {matchesC, matchesPlayedC} = useApp();

  useEffect(() => {
    getUTC().then(value => value && setUtc(value));
  }, []);

  useEffect(() => {
    const limit = matchesPlayedC < 8 ? 8 : 16;

    setMatchesP1(
      matchesC.filter((match, index) => {
        if (index >= limit - 8 && index < limit - 4) return match;
      }),
    );
    setMatchesP2(
      matchesC.filter((match, index) => {
        if (index >= limit - 4 && index < limit) return match;
      }),
    );
  }, [matchesPlayedC]);

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
              <KnockoutSide key={match._id} match={match} utc={utc} left />
            ))}
          </View>
          <View style={globalStyles.flex}>
            {matchesP2.map(match => (
              <KnockoutSide key={match._id} match={match} utc={utc} />
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
