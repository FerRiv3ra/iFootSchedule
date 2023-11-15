import React, {useCallback, useContext, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import useApp from './useApp';
import ThemeContext from '../context/ThemeContext';
import {MatchMode, RootStackParams, MatchDBInterface} from '../types';
import NextMatch from '../components/NextMatch';
import Champion from '../components/Champion';
import WaitingDraw from '../screens/WaitingDraw';
import globalStyles from '../theme/styles';
import {matchStyles} from '../theme/matchStyles';

export const useMatches = () => {
  const [loading, setLoading] = useState(true);
  const [playedGames, setPlayedGames] = useState(0);

  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, 'Matches'>>();
  const {
    DBLoading,
    getMatchesToday,
    todayMatches,
    getPendingMatches,
    pendingMatches,
    getNextMatch,
    nextMatch,
    matchPlayed,
  } = useApp();
  const {mode} = useContext(ThemeContext);

  const totalMatches = mode === 'UCL' ? 125 : 64;

  const focusEffect = useCallback(() => {
    setLoading(true);
    getNextMatch();
    getPendingMatches();
    getMatchesToday();
    setPlayedGames(matchPlayed);

    setLoading(false);
  }, [DBLoading]);

  useFocusEffect(focusEffect);

  const handleMatchesPlayed = () => {
    navigation.navigate('PlayedMatches', {parent: 'Matches'});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getComponent = (
    mode: MatchMode,
    loading: boolean,
    nextMatch?: MatchDBInterface,
  ) => {
    if (!!nextMatch) {
      return (
        <View style={matchStyles.match}>
          <Text style={[matchStyles.titleMatch, globalStyles[`text-${mode}`]]}>
            {`${t('Match.nextMatch')}`}
          </Text>
          <NextMatch
            nextMatch={nextMatch}
            pendingMatches={pendingMatches}
            todayMatches={todayMatches}
          />
        </View>
      );
    } else if (mode === 'UCL' && loading) {
      return <ActivityIndicator animating={loading} />;
    } else if (mode === 'UCL' && !loading) {
      return (
        <View style={matchStyles.match}>
          <Text style={[matchStyles.waiting, globalStyles[`text-${mode}`]]}>
            {t('Match.waitingDraw')}
          </Text>
          <WaitingDraw />
        </View>
      );
    } else {
      return <Champion parent={mode} />;
    }
  };

  return {
    loading,
    playedGames,
    nextMatch,
    totalMatches,
    handleMatchesPlayed,
    goBack,
    pendingMatches,
    mode,
    todayMatches,
    getComponent,
  };
};
