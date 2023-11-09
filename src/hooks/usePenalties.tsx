import {useContext, useState} from 'react';
import ThemeContext from '../context/ThemeContext';

export type RoundType = {
  round: number;
  local: 'p' | 0 | 1;
  visit: 'p' | 0 | 1;
};

export const usePenalties = (
  setPenl: (penal: number) => void,
  setPenv: (penal: number) => void,
) => {
  const [canSave, setCanSave] = useState(false);
  const [rounds, setRounds] = useState<RoundType[]>([
    {
      round: 1,
      local: 'p',
      visit: 'p',
    },
    {
      round: 2,
      local: 'p',
      visit: 'p',
    },
    {
      round: 3,
      local: 'p',
      visit: 'p',
    },
    {
      round: 4,
      local: 'p',
      visit: 'p',
    },
    {
      round: 5,
      local: 'p',
      visit: 'p',
    },
  ]);

  const {mode} = useContext(ThemeContext);

  const handleRounds = (
    round: RoundType,
    type: 'local' | 'visit',
    res: 0 | 1,
  ) => {
    setRounds(
      rounds.map(roundN => {
        if (roundN.round === round.round) {
          roundN[type] = res;
        }

        return roundN;
      }),
    );

    const total = rounds.reduce(
      (complete, roundM) => {
        if (roundM.local !== 'p' && roundM.visit !== 'p') {
          complete.total += 1;
          complete.goll += roundM.local;
          complete.golv += roundM.visit;
        }

        return complete;
      },
      {total: 0, goll: 0, golv: 0},
    );

    if (
      total.total >= 3 &&
      (total.goll - 3 >= total.golv || total.golv - 3 >= total.goll)
    ) {
      setCanSave(true);
    } else if (
      total.total >= 4 &&
      (total.goll - 2 >= total.golv || total.golv - 3 >= total.goll)
    ) {
      setCanSave(true);
    } else if (total.total >= 5 && total.goll !== total.golv) {
      setCanSave(true);

      if (rounds.length > 5) {
        setRounds(rounds.filter(roundM => roundM.round !== rounds.length));
      }
    } else {
      if (
        total.total >= 5 &&
        total.goll === total.golv &&
        round.local !== 'p' &&
        round.visit !== 'p'
      ) {
        setRounds([
          ...rounds,
          {
            round: rounds.length + 1,
            local: 'p',
            visit: 'p',
          },
        ]);
        setCanSave(false);
      }
    }

    setPenl(total.goll);
    setPenv(total.golv);
  };

  return {
    canSave,
    rounds,
    mode,
    handleRounds,
  };
};
