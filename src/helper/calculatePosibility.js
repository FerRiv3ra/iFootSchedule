export const calculatePosibility = (local = [], visit = []) => {
  let posLocal = 0;
  let posVisit = 0;
  let posDraw = 0;

  if (!local.length) {
    posLocal = 33.33;
    posVisit = 33.33;
    posDraw = 33.33;
  } else {
    const {WL, LL, DL} = local.reduce(
      (tot, res) => {
        tot[`${res}L`] += 1;

        return tot;
      },
      {WL: 0, LL: 0, DL: 0},
    );

    const {WV, LV, DV} = visit.reduce(
      (tot, res) => {
        tot[`${res}V`] += 1;

        return tot;
      },
      {WV: 0, LV: 0, DV: 0},
    );

    posLocal = ((WL * 100) / local.length + (LV * 100) / visit.length) / 2;
    posVisit = ((WV * 100) / visit.length + (LL * 100) / local.length) / 2;
    posDraw = ((DL * 100) / local.length + (DV * 100) / visit.length) / 2;

    if (posLocal + posVisit === 100) {
      posLocal = posLocal - posLocal * 0.16;
      posVisit = posVisit - posVisit * 0.16;

      posDraw = 100 - posLocal - posVisit;
    }
  }

  return {
    posLocal,
    posVisit,
    posDraw,
  };
};
