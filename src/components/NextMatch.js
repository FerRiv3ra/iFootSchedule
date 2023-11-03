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

import {getUTC, SECTIONS, language} from '../helpers';
import useApp from '../hooks/useApp';
import ThemeContext from '../context/ThemeContext';

const NextMatch = ({nextMatch, pendingMatches, todayMatches}) => {
  const [date, setDate] = useState(moment(nextMatch.date));
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState({});

  const navigation = useNavigation();
  const {lang, teamsC, laLiga, premier} = useApp();
  const {mode} = useContext(ThemeContext);

  const matchSet = [...pendingMatches, ...todayMatches];

  useEffect(() => {
    setLoading(true);

    if (mode === 'UCL') {
      setLocal(teamsC.filter(team => team.short_name === nextMatch.local)[0]);
    } else if (mode === 'laLiga') {
      setLocal(laLiga.filter(team => team.short_name === nextMatch.local)[0]);
    } else {
      setLocal(premier.filter(team => team.short_name === nextMatch.local)[0]);
    }

    getUTC().then(
      value => value && setDate(moment(nextMatch.date).utcOffset(value)),
    );
    setLoading(false);
  }, [nextMatch]);

  const handlePress = () => {
    // navigation.navigate('Match', {match: nextMatch, local});
    if (matchSet.includes(nextMatch)) {
      navigation.navigate('Match', {match: nextMatch, local});
    } else {
      Alert.alert(
        language[lang].info,
        `${language[lang].infoMessage} ${date.format('lll')}`,
      );
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={styles.team}>{nextMatch.local}</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[mode][nextMatch.local]?.file}
            />
            <Text style={{color: '#111111'}}>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[mode][nextMatch.visit]?.file}
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
    flexDirection: 'row',
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
