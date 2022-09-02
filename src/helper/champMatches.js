const champMatches = [
  // ** Match 1 **
  {
    local: 'DIN',
    goll: 0,
    penl: 0,
    visit: 'CHE',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T16:45:00+00:00',
  },
  {
    local: 'BVB',
    goll: 0,
    penl: 0,
    visit: 'COP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T16:45:00+00:00',
  },
  {
    local: 'BEN',
    goll: 0,
    penl: 0,
    visit: 'MAH',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'SEV',
    goll: 0,
    penl: 0,
    visit: 'MCI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'SAL',
    goll: 0,
    penl: 0,
    visit: 'ACM',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'CEL',
    goll: 0,
    penl: 0,
    visit: 'RMA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'LEI',
    goll: 0,
    penl: 0,
    visit: 'SHA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'PSG',
    goll: 0,
    penl: 0,
    visit: 'JUV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-06T19:00:00+00:00',
  },
  {
    local: 'AJX',
    goll: 0,
    penl: 0,
    visit: 'RAN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T16:45:00+00:00',
  },
  {
    local: 'FRA',
    goll: 0,
    penl: 0,
    visit: 'LIS',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T16:45:00+00:00',
  },
  {
    local: 'INT',
    goll: 0,
    penl: 0,
    visit: 'BMU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  {
    local: 'FCB',
    goll: 0,
    penl: 0,
    visit: 'PLZ',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  {
    local: 'NAP',
    goll: 0,
    penl: 0,
    visit: 'LIV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  {
    local: 'ATL',
    goll: 0,
    penl: 0,
    visit: 'POR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  {
    local: 'TOT',
    goll: 0,
    penl: 0,
    visit: 'MAR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  {
    local: 'BRU',
    goll: 0,
    penl: 0,
    visit: 'LEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-07T19:00:00+00:00',
  },
  // ** Match 2 **
  {
    local: 'PLZ',
    goll: 0,
    penl: 0,
    visit: 'INT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T16:45:00+00:00',
  },
  {
    local: 'LIS',
    goll: 0,
    penl: 0,
    visit: 'TOT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T16:45:00+00:00',
  },
  {
    local: 'RAN',
    goll: 0,
    penl: 0,
    visit: 'NAP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'LIV',
    goll: 0,
    penl: 0,
    visit: 'AJX',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'BMU',
    goll: 0,
    penl: 0,
    visit: 'FCB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'POR',
    goll: 0,
    penl: 0,
    visit: 'BRU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'MAR',
    goll: 0,
    penl: 0,
    visit: 'FRA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'LEV',
    goll: 0,
    penl: 0,
    visit: 'ATL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-13T19:00:00+00:00',
  },
  {
    local: 'SHA',
    goll: 0,
    penl: 0,
    visit: 'CEL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T16:45:00+00:00',
  },
  {
    local: 'ACM',
    goll: 0,
    penl: 0,
    visit: 'DIN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T16:45:00+00:00',
  },
  {
    local: 'CHE',
    goll: 0,
    penl: 0,
    visit: 'SAL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  {
    local: 'RMA',
    goll: 0,
    penl: 0,
    visit: 'LEI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  {
    local: 'COP',
    goll: 0,
    penl: 0,
    visit: 'SEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  {
    local: 'JUV',
    goll: 0,
    penl: 0,
    visit: 'BEN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  {
    local: 'MAH',
    goll: 0,
    penl: 0,
    visit: 'PSG',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  {
    local: 'MCI',
    goll: 0,
    penl: 0,
    visit: 'BVB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-09-14T19:00:00+00:00',
  },
  // ** Match 3 **
  {
    local: 'BMU',
    goll: 0,
    penl: 0,
    visit: 'PLZ',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T16:45:00+00:00',
  },
  {
    local: 'MAR',
    goll: 0,
    penl: 0,
    visit: 'LIS',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T16:45:00+00:00',
  },
  {
    local: 'POR',
    goll: 0,
    penl: 0,
    visit: 'LEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'BRU',
    goll: 0,
    penl: 0,
    visit: 'ATL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'AJX',
    goll: 0,
    penl: 0,
    visit: 'NAP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'FRA',
    goll: 0,
    penl: 0,
    visit: 'TOT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'INT',
    goll: 0,
    penl: 0,
    visit: 'FCB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'LIV',
    goll: 0,
    penl: 0,
    visit: 'RAN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-04T19:00:00+00:00',
  },
  {
    local: 'SAL',
    goll: 0,
    penl: 0,
    visit: 'DIN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T16:45:00+00:00',
  },
  {
    local: 'LEI',
    goll: 0,
    penl: 0,
    visit: 'CEL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T16:45:00+00:00',
  },
  {
    local: 'CHE',
    goll: 0,
    penl: 0,
    visit: 'ACM',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  {
    local: 'JUV',
    goll: 0,
    penl: 0,
    visit: 'MAH',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  {
    local: 'RMA',
    goll: 0,
    penl: 0,
    visit: 'SHA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  {
    local: 'SEV',
    goll: 0,
    penl: 0,
    visit: 'BVB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  {
    local: 'BEN',
    goll: 0,
    penl: 0,
    visit: 'PSG',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  {
    local: 'MCI',
    goll: 0,
    penl: 0,
    visit: 'COP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-05T19:00:00+00:00',
  },
  // ** Match 4 **
  {
    local: 'MAH',
    goll: 0,
    penl: 0,
    visit: 'JUV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T16:45:00+00:00',
  },
  {
    local: 'COP',
    goll: 0,
    penl: 0,
    visit: 'MCI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T16:45:00+00:00',
  },
  {
    local: 'PSG',
    goll: 0,
    penl: 0,
    visit: 'BEN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'DIN',
    goll: 0,
    penl: 0,
    visit: 'SAL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'BVB',
    goll: 0,
    penl: 0,
    visit: 'SEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'ACM',
    goll: 0,
    penl: 0,
    visit: 'CHE',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'SHA',
    goll: 0,
    penl: 0,
    visit: 'RMA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'CEL',
    goll: 0,
    penl: 0,
    visit: 'LEI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-11T19:00:00+00:00',
  },
  {
    local: 'NAP',
    goll: 0,
    penl: 0,
    visit: 'AJX',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T16:45:00+00:00',
  },
  {
    local: 'ATL',
    goll: 0,
    penl: 0,
    visit: 'BRU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T16:45:00+00:00',
  },
  {
    local: 'LEV',
    goll: 0,
    penl: 0,
    visit: 'POR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  {
    local: 'RAN',
    goll: 0,
    penl: 0,
    visit: 'LIV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  {
    local: 'FCB',
    goll: 0,
    penl: 0,
    visit: 'INT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  {
    local: 'PLZ',
    goll: 0,
    penl: 0,
    visit: 'BMU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  {
    local: 'TOT',
    goll: 0,
    penl: 0,
    visit: 'FRA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  {
    local: 'LIS',
    goll: 0,
    penl: 0,
    visit: 'MAR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-12T19:00:00+00:00',
  },
  // ** Match 5 **
  {
    local: 'SAL',
    goll: 0,
    penl: 0,
    visit: 'CHE',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T16:45:00+00:00',
  },
  {
    local: 'SEV',
    goll: 0,
    penl: 0,
    visit: 'COP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T16:45:00+00:00',
  },
  {
    local: 'PSG',
    goll: 0,
    penl: 0,
    visit: 'MAH',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'BVB',
    goll: 0,
    penl: 0,
    visit: 'MCI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'DIN',
    goll: 0,
    penl: 0,
    visit: 'ACM',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'BEN',
    goll: 0,
    penl: 0,
    visit: 'JUV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'CEL',
    goll: 0,
    penl: 0,
    visit: 'SHA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'LEI',
    goll: 0,
    penl: 0,
    visit: 'RMA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-25T19:00:00+00:00',
  },
  {
    local: 'INT',
    goll: 0,
    penl: 0,
    visit: 'PLZ',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T16:45:00+00:00',
  },
  {
    local: 'BRU',
    goll: 0,
    penl: 0,
    visit: 'POR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T16:45:00+00:00',
  },
  {
    local: 'FRA',
    goll: 0,
    penl: 0,
    visit: 'MAR',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  {
    local: 'FCB',
    goll: 0,
    penl: 0,
    visit: 'BMU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  {
    local: 'AJX',
    goll: 0,
    penl: 0,
    visit: 'LIV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  {
    local: 'ATL',
    goll: 0,
    penl: 0,
    visit: 'LEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  {
    local: 'TOT',
    goll: 0,
    penl: 0,
    visit: 'LIS',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  {
    local: 'NAP',
    goll: 0,
    penl: 0,
    visit: 'RAN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-10-26T19:00:00+00:00',
  },
  // ** Match 6 **
  {
    local: 'POR',
    goll: 0,
    penl: 0,
    visit: 'ATL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T17:45:00+00:00',
  },
  {
    local: 'LEV',
    goll: 0,
    penl: 0,
    visit: 'BRU',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T17:45:00+00:00',
  },
  {
    local: 'BMU',
    goll: 0,
    penl: 0,
    visit: 'INT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'LIV',
    goll: 0,
    penl: 0,
    visit: 'NAP',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'MAR',
    goll: 0,
    penl: 0,
    visit: 'TOT',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'RAN',
    goll: 0,
    penl: 0,
    visit: 'AJX',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'PLZ',
    goll: 0,
    penl: 0,
    visit: 'FCB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'LIS',
    goll: 0,
    penl: 0,
    visit: 'FRA',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-01T20:00:00+00:00',
  },
  {
    local: 'RMA',
    goll: 0,
    penl: 0,
    visit: 'CEL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T17:45:00+00:00',
  },
  {
    local: 'SHA',
    goll: 0,
    penl: 0,
    visit: 'LEI',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T17:45:00+00:00',
  },
  {
    local: 'ACM',
    goll: 0,
    penl: 0,
    visit: 'SAL',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
  {
    local: 'MAH',
    goll: 0,
    penl: 0,
    visit: 'BEN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
  {
    local: 'COP',
    goll: 0,
    penl: 0,
    visit: 'BVB',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
  {
    local: 'MCI',
    goll: 0,
    penl: 0,
    visit: 'SEV',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
  {
    local: 'JUV',
    goll: 0,
    penl: 0,
    visit: 'PSG',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
  {
    local: 'CHE',
    goll: 0,
    penl: 0,
    visit: 'DIN',
    golv: 0,
    penv: 0,
    played: false,
    date: '2022-11-02T20:00:00+00:00',
  },
];

export default champMatches;
