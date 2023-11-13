import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import moment from 'moment';

import KnockoutSide from './KnockoutSide';
import globalStyles from '../theme/styles';
import useApp from '../hooks/useApp';
import {getUTC} from '../helpers';
import {MatchDBInterface} from '../types';
import {getImage} from '../helpers';

const Knockouts = () => {
  const [utc, setUtc] = useState('+00:00');
  const [matchesP1, setMatchesP1] = useState<MatchDBInterface[]>([]);
  const [matchesP2, setMatchesP2] = useState<MatchDBInterface[]>([]);
  const [finalMatch, setFinalMatch] = useState<MatchDBInterface>();
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
          <View style={{...styles.containerFinal, ...globalStyles.row}}>
            <Text style={styles.team}>{finalMatch?.local}</Text>
            <Image
              style={styles.logoTeam}
              source={getImage('UCL', finalMatch?.local!)}
            />
            <Text style={{color: '#111111'}}>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={getImage('UCL', finalMatch?.visit!)}
            />
            <Text style={styles.team}>{finalMatch?.visit}</Text>
          </View>
          <Text style={styles.date}>
            {moment(finalMatch?.date).format('lll')}
          </Text>
        </View>
      ) : (
        <View style={globalStyles.row}>
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
  containerFinal: {
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
