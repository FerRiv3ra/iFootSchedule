import {View} from 'react-native';
import React from 'react';

import MatchDay from './MatchDay';

const MatchesDay = ({matchData, parent, editing = false}) => {
  return (
    <View>
      <View>
        {matchData.map((match, index) => (
          <MatchDay
            key={index}
            match={match}
            parent={parent}
            editing={editing}
          />
        ))}
      </View>
    </View>
  );
};

export default MatchesDay;
