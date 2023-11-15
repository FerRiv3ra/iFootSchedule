import {useContext, useEffect, useState} from 'react';

import {MatchDBInterface} from '../types';
import ThemeContext from '../context/ThemeContext';
import useApp from './useApp';

export const useKnockoutSide = (match: MatchDBInterface) => {
  const [ko, setKo] = useState({local: false, visit: false});
  const [prevMatch, setPrevMatch] = useState<MatchDBInterface>();

  const {mode} = useContext(ThemeContext);
  const {matchPlayed, matches} = useApp();

  useEffect(() => {
    const previous = matches.filter(
      m => match.visit === m.local && m.played,
    )[0];

    setPrevMatch(previous);
    if (match.played && matchPlayed > 8) {
      if (
        previous &&
        match.goll + match.penl + previous.golv >
          match.golv + match.penv + previous.goll
      ) {
        setKo({
          local: false,
          visit: true,
        });
      } else {
        setKo({
          local: true,
          visit: false,
        });
      }
    }
  }, [match]);

  return {
    ko,
    prevMatch,
    mode,
  };
};
