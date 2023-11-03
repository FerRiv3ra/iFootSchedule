import {TeamDBInterface} from '../types/database';
import {promCalculator} from './promCalculator';

export const calculatePosibility = (
  local: TeamDBInterface,
  visit: TeamDBInterface,
) => {
  let posLocal = 0;
  let posVisit = 0;
  let posDraw = 0;

  if (!Object.entries(local).length) {
    posLocal = 33.33;
    posVisit = 33.33;
    posDraw = 33.33;
  } else {
    const {WL, LL, DL} = local.last.reduce(
      (tot, res) => {
        tot[`${res}L`] += 1;

        return tot;
      },
      {WL: 0, LL: 0, DL: 0},
    );

    const {WV, LV, DV} = visit.last.reduce(
      (tot, res) => {
        tot[`${res}V`] += 1;

        return tot;
      },
      {WV: 0, LV: 0, DV: 0},
    );

    posLocal = promCalculator(local, visit);
    posVisit = promCalculator(visit, local);
    posDraw = promCalculator(local, visit, 'D');

    if (posLocal === 0) {
      posLocal = posDraw / 2;
      posDraw = posLocal;
    }

    if (posVisit === 0) {
      posVisit = posDraw / 2;
      posDraw = posVisit;
    }

    if (WL === WV && DL === DV && LL === LV) {
      posLocal = 33.33;
      posVisit = 33.33;
      posDraw = 33.33;
    }
  }

  if (Math.round(posLocal) === Math.round(posVisit)) {
    posLocal = 33.33;
    posVisit = 33.33;
    posDraw = 33.33;
  }

  return {
    posLocal,
    posVisit,
    posDraw,
  };
};
