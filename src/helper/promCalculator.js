export const promCalculator = (obj1, obj2, type = 'W') => {
  const tot1 = obj1.last.reduce((tot, res) => {
    if (res === type) {
      tot++;
    }

    return tot;
  }, 0);

  const tot2 = obj2.last.reduce((tot, res) => {
    if (type === 'W') {
      if (res === 'L') {
        tot++;
      }
    } else {
      if (res === type) {
        tot++;
      }
    }

    return tot;
  }, 0);

  const prom1 =
    ((tot1 * 100) / obj1.last.length + (tot2 * 100) / obj2.last.length) / 2;
  const prom2 =
    type === 'W'
      ? ((obj1.win * 100) / obj1.p + (obj2.lost * 100) / obj2.p) / 2
      : ((obj1.draw * 100) / obj1.p + (obj2.draw * 100) / obj2.p) / 2;

  const generalProm = (prom1 + prom2) / 2;

  return generalProm;
};
