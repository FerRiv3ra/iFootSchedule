import {Text, View} from 'react-native';
import React from 'react';

import {MatchDBInterface} from '../types';

interface Props {
  match: MatchDBInterface;
  prevMatch?: MatchDBInterface;
  left: boolean;
  local?: boolean;
}

export const KnockoutName = ({match, prevMatch, left, local}: Props) => {
  return (
    <View
      style={{
        flexDirection: left ? 'row' : 'row-reverse',
        alignItems: 'baseline',
      }}>
      <Text>{local ? match.local : match.visit}</Text>
      <Text style={{fontSize: 10}}>
        {' '}
        (
        {local
          ? match.goll + (prevMatch?.golv || 0)
          : match.golv + (prevMatch?.goll || 0)}
        ){' '}
      </Text>
    </View>
  );
};
