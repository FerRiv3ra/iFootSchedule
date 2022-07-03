import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useApp from '../hooks/useApp';
import MatchDay from './MatchDay';

const MatchesDay = ({day, pending = false}) => {
  const [loading, setLoading] = useState(true);
  const {
    getMatchesToday_p,
    todayMatches_p,
    getPendingMatches_p,
    pendingMatches_p,
  } = useApp();
  useEffect(() => {
    setLoading(true);
    if (pending) {
      getPendingMatches_p(day);
    } else {
      getMatchesToday_p(day);
    }

    setLoading(false);
  }, []);
  return (
    <View>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : pending ? (
        <View>
          {pendingMatches_p.map((match, index) => (
            <MatchDay key={index} match={match} />
          ))}
        </View>
      ) : (
        <View>
          {todayMatches_p.map((match, index) => (
            <MatchDay key={index} match={match} />
          ))}
        </View>
      )}
    </View>
  );
};

export default MatchesDay;

const styles = StyleSheet.create({});
