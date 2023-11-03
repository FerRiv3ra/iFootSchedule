export const teamsProperties = {
  _id: 'string',
  name: 'string',
  short_name: 'string',
  stadium: 'string',
  p: {
    type: 'int',
    default: 0,
  },
  win: {
    type: 'int',
    default: 0,
  },
  draw: {
    type: 'int',
    default: 0,
  },
  last: {
    type: 'string[]',
    default: [],
  },
  lost: {
    type: 'int',
    default: 0,
  },
  gf: {
    type: 'int',
    default: 0,
  },
  ga: {
    type: 'int',
    default: 0,
  },
  gd: {
    type: 'int',
    default: 0,
  },
  pts: {
    type: 'int',
    default: 0,
  },
};

export const teamsChampProps = {
  _id: 'string',
  name: 'string',
  group: 'string',
  short_name: 'string',
  stadium: 'string',
  p: {
    type: 'int',
    default: 0,
  },
  gf: {
    type: 'int',
    default: 0,
  },
  ga: {
    type: 'int',
    default: 0,
  },
  gd: {
    type: 'int',
    default: 0,
  },
  pts: {
    type: 'int',
    default: 0,
  },
};

export const matchesProps = {
  _id: 'string',
  local: 'string',
  goll: {
    type: 'int',
    default: 0,
  },
  penl: {
    type: 'int',
    default: 0,
  },
  visit: 'string',
  golv: {
    type: 'int',
    default: 0,
  },
  penv: {
    type: 'int',
    default: 0,
  },
  played: {
    type: 'bool',
    default: false,
  },
  date: 'string',
};
