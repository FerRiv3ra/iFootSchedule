import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {getUTC} from '../helpers';
import useApp from '../hooks/useApp';
import ThemeContext from '../context/ThemeContext';
import {MatchDBInterface, TeamDBInterface} from '../types';
import {getImage} from '../helpers';
import globalStyles from '../theme/styles';

interface Props {
  nextMatch: MatchDBInterface;
  pendingMatches: MatchDBInterface[];
  todayMatches: MatchDBInterface[];
}

const NextMatch = ({nextMatch, pendingMatches, todayMatches}: Props) => {
  const [date, setDate] = useState(moment(nextMatch.date));
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState<TeamDBInterface>();

  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const {teams} = useApp();
  const {mode} = useContext(ThemeContext);

  const matchSet = [...pendingMatches, ...todayMatches];

  useEffect(() => {
    setLoading(true);

    setLocal(teams.filter(team => team.short_name === nextMatch.local)[0]);

    getUTC().then(
      value => value && setDate(moment(nextMatch.date).utcOffset(value)),
    );
    setLoading(false);
  }, [nextMatch]);

  const handlePress = () => {
    if (matchSet.includes(nextMatch)) {
      navigation.navigate('Match' as never, {match: nextMatch, local});
    } else {
      Alert.alert(
        t('Alerts.info'),
        `${t('Alerts.infoMessage')} ${date.format('lll')}`,
      );
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View>
          <View style={{...styles.container, ...globalStyles.row}}>
            <Text style={styles.team}>{nextMatch.local}</Text>
            <Image
              style={styles.logoTeam}
              source={getImage(mode, nextMatch.local)}
            />
            <Text style={{color: '#111111'}}>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={getImage(mode, nextMatch.visit)}
            />
            <Text style={styles.team}>{nextMatch.visit}</Text>
          </View>
          <Text style={styles.stadium}>{local && local.stadium}</Text>

          <Text style={styles.date}>{date.format('lll')}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default NextMatch;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoTeam: {
    width: 40,
    height: 40,
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
  stadium: {
    textAlign: 'center',
    fontSize: 14,
    color: 'blue',
  },
});
