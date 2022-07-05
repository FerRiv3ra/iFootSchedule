import {View} from 'react-native';
import React from 'react';

import MatchDay from './MatchDay';

const MatchesDay = ({
  todayMatches_p = [],
  pendingMatches_p = [],
  parent,
  pending = false,
}) => {
  return (
    <View>
      {pending ? (
        <View>
          {pendingMatches_p.map((match, index) => (
            <MatchDay key={index} match={match} parent={parent} />
          ))}
        </View>
      ) : (
        <View>
          {todayMatches_p.map((match, index) => (
            <MatchDay key={index} match={match} parent={parent} />
          ))}
        </View>
      )}
    </View>
  );
};

export default MatchesDay;
