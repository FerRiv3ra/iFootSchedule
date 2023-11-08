import {View} from 'react-native';
import React from 'react';

import MatchDay from './MatchDay';
import {MatchDBInterface} from '../types/database';

interface Props {
  matchData: MatchDBInterface[];
  editing?: boolean;
}

const MatchesDay = ({matchData, editing = false}: Props) => {
  return (
    <View>
      <View>
        {matchData.map((match, index) => (
          <MatchDay key={index} match={match} editing={editing} />
        ))}
      </View>
    </View>
  );
};

export default MatchesDay;
