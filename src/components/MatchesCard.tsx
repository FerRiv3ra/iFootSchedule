import {ActivityIndicator, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {matchStyles} from '../theme/matchStyles';
import globalStyles from '../theme/styles';
import MatchesDay from './MatchesDay';
import {MatchDBInterface} from '../types';
import ThemeContext from '../context/ThemeContext';

interface Props {
  title: string;
  matchData?: MatchDBInterface[];
  loading?: boolean;
}

export const MatchesCard = ({title, matchData, loading}: Props) => {
  const {mode} = useContext(ThemeContext);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={matchStyles.match}>
      <Text style={[matchStyles.titleMatch, globalStyles[`text-${mode}`]]}>
        {title}
      </Text>
      <MatchesDay matchData={matchData} />
    </View>
  );
};
