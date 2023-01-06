import {View} from 'react-native';
import React from 'react';

import MatchDay from './MatchDay';

const MatchesDay = ({matchData, today = false, editing = false}) => {
  return (
    <View>
      <View>
        {matchData.map((match, index) => (
          <MatchDay key={index} match={match} editing={editing} today={today} />
        ))}
      </View>
    </View>
  );
};

export default MatchesDay;
